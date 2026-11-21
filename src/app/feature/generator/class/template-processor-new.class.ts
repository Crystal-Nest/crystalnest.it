import {JSZipObject} from '@progress/jszip-esm';

import {TemplateProcessorLegacy} from './template-processor-legacy.class';
import {Change} from '../model/change.type';
import {Platform} from '../model/platform.type';

import {ModLoader} from '~cn/core/model/mod-loader.type';

/**
 * Template processor for Minecraft 1.21.x templates.
 *
 * @export
 * @class TemplateProcessorNew
 * @typedef {TemplateProcessorNew}
 * @extends {TemplateProcessorLegacy}
 */
export class TemplateProcessorNew extends TemplateProcessorLegacy {
  /**
   * @inheritdoc
   *
   * @protected
   * @param {JSZipObject} entry file entry.
   * @param {string} path entry path.
   * @returns {boolean} whether the entry had been handled and no further processing should be done on it.
   */
  protected override handleVersion(entry: JSZipObject, path: string): boolean {
    switch (true) {
      case path === `${this.root}/build.gradle`:
        // Handle build.gradle.
        this.writeText(
          this.process(path, this.rootChange),
          this.alter(entry, [/.*sonar.*\n(.*({|})\n){0,2}\n?/gi, '', this.othersMod], [/.+fabric.+\n/g, '', this.excludedLoaders.includes('fabric')], [/.+publisher.+\n/, '', this.platforms.length === 1 && this.platforms.includes('maven')])
        );
        return true;
      case path === `${this.root}/fabric/build.gradle`:
        // Fabric build.gradle: update configuration dependency and platform publishing tasks.
        this.writeText(
          this.process(path, this.rootChange),
          this.alter(entry, this.fcapChange, [/\npublisher.+\n.+\n.+\n/, '', this.platforms.length === 1 && this.platforms.includes('maven')])
        );
        return true;
      case path.endsWith('multiloader-common.gradle'):
        this.writeText(
          this.process(path, this.rootChange),
          entry.async('string').then(content => this.processBuildGradle(
            this.process(content, this.fcapChange, [/\s*maven.*\n(.*Fuzs.*\n){2}\s*}/, '', this.noConfig], this.licenseChange),
            this.excludedLoaders,
            this.excludedPlatforms
          ))
        );
        return true;
    }
    return false;
  }

  /**
   * @inheritdoc
   *
   * @protected
   * @param {string} content
   * @param {Lowercase<ModLoader>[]} loaders loaders to exclude.
   * @param {Lowercase<Platform>[]} platforms platforms to exclude.
   * @returns {string}
   */
  protected override processBuildGradle(content: string, loaders: Lowercase<ModLoader>[], platforms: Lowercase<Platform>[]): string {
    let value = content;
    if (loaders.length) {
      if (loaders.includes('fabric')) {
        value = value.replace(/, "fabric\.mod\.json"/, '');
      }
      if (loaders.includes('neoforge')) {
        value = value.replace(/, "META-INF\/neoforge.mods.toml"/, '');
      }
      value = value.replace(new RegExp(`^\\s+"(${loaders.join('|')}).*\\n|(.*\\b(${loaders.join('|')})".+)+(\\n.+)*?(\\s*break)\\n?`, 'gim'), '');
    }
    if (platforms.length) {
      platforms.forEach(platform => {
        switch (platform) {
          case 'maven':
            value = value.replace(/^\n?([ \t]*)publishing\b[^{\n]*\{[\s\S]*?^\1\}\n/gm, '').replace(/.*\bpublish\b.*\n/g, '');
            break;
          case 'github':
            value = value.replace(/.*github.* {(\n.*?)+?^  }\n/gim, '').replace(/^ +github.*\n/gim, '');
            break;
          case 'modrinth':
            value = value.replace(/.*modrinth.* {(\n.*?)+?^  }\n/gim, '').replace(/.*modrinth.*\n/gi, '');
            break;
          case 'curseforge':
            value = value.replace(/.*curse.* {(\n.*?)+?^  }\n/gim, '').replace(/.*curse.*\n/gi, '');
            break;
        }
      });
      if (platforms.includes('github') && platforms.includes('modrinth') && platforms.includes('curseforge')) {
        value = value.replace(/publisher {(\n.*?)+?^}\n\n/m, '').replace(/.*publishMod.*\n/, '');
      }
    }
    return value;
  }

  /**
   * @inheritdoc
   *
   * @protected
   * @param {Lowercase<ModLoader>[]} loaders
   * @returns {Change[]}
   */
  protected override loadersChanges(loaders: Lowercase<ModLoader>[]): Change[] {
    return loaders.flatMap(loader => [
      // For settings.gradle
      [new RegExp(`\\s+exclusiveContent.+\\n(.+\\n)*.+${loader}.+(\\n.*)*    }`, 'i'), ''],
      [new RegExp(`include\\("${loader}"\\)\\n`, 'i'), ''],
      // For gradle.properties
      [new RegExp(`# ${loader}\\n.*\\n.*\\n\\n`, 'i'), ''],
      // For readme
      [new RegExp(`\\[!\\[${loader}.+l=${loader}\\)(!.{95})?`, 'i'), '']
    ]);
  }
}
