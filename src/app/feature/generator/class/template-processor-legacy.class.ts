import {Store} from '@ngrx/store';
import {JSZipObject} from '@progress/jszip-esm';

import {TemplateProcessor} from './template-processor.class';
import {Change} from '../model/change.type';
import {Platform} from '../model/platform.type';
import {SkeletonForm} from '../model/skeleton-form.interface';
import {State} from '../redux/feature';

import {ModLoader} from '~cn/core/model/mod-loader.type';

/**
 * Retains the configuration and metadata conventions of templates before 26.x.
 */
export abstract class TemplateProcessorLegacy extends TemplateProcessor {
  /**
   * Whether the optional configuration example is excluded.
   */
  protected readonly noConfig: boolean;

  /**
   * Removal of the optional configuration dependency.
   */
  protected readonly fcapChange: Change;

  /**
   * Legacy loader-specific text replacements.
   */
  protected readonly loaderChanges: Change[];

  /**
   * @constructor
   * @param {Store<State>} store$ progress dispatcher.
   * @param {string} licenseText selected license text.
   * @param {SkeletonForm} form project settings.
   */
  public constructor(store$: Store<State>, licenseText: string, form: SkeletonForm) {
    super(store$, licenseText, form);
    this.noConfig = !form.includeConfig;
    this.fcapChange = [/.*f(orge-)?c(onfig-)?a(pi-)?p(ort)?.*\n/g, '', this.noConfig];
    this.loaderChanges = this.loadersChanges(this.excludedLoaders);
  }

  /**
   * @inheritdoc
   */
  protected override includeFile(path: string): boolean {
    return super.includeFile(path) && !(this.noConfig && path.includes('config'));
  }

  /**
   * @inheritdoc
   */
  protected override handle(entry: JSZipObject, path: string): boolean {
    if (this.handleVersion(entry, path)) {
      return true;
    }
    switch (true) {
      case path === `${this.root}/common/build.gradle`:
        // Common build.gradle: update configuration dependency and platform publishing tasks.
        this.writeText(
          this.process(path, this.rootChange),
          this.alter(entry, this.fcapChange, ...this.excludedPlatforms.map(platform => [new RegExp(`.*publish${platform}.*\\n`, 'i'), ''] as Change))
        );
        break;
      case path.endsWith('gradle.properties'):
        // File gradle.properties: replace Gradle properties.
        this.writeText(
          this.process(path, this.rootChange),
          entry.async('string').then(text => this.process(
            this.processProperties(text),
            this.fcapChange,
            [/.*curse.*\n/, '', this.excludedPlatforms.includes('curseforge')],
            ...this.loaderChanges
          ))
        );
        break;
      case path.endsWith('README.md'):
        // File README.md: replace link references.
        this.writeText(
          this.process(path, this.rootChange),
          entry.async('string').then(text => this.processReadme(text))
        );
        break;
      case path.endsWith('settings.gradle'):
        // File settings.gradle: update project name and loaders.
        this.writeText(this.process(path, this.rootChange), this.alter(entry, this.modIdKebabChange, ...this.loaderChanges));
        break;
      case path.endsWith('CommonModLoader.java'):
        // File CommonModLoader.java: replace mod properties and optionally remove configuration references.
        this.writeText(
          this.process(path, this.rootChange, this.groupPathChange, this.modIdChange),
          this.alter(entry, [/\n.*config.*\n */gi, '', this.noConfig], this.groupChange, this.modIdChange)
        );
        break;
      case path.endsWith('fabric.mod.json'):
        // File fabric.mod.json: optionally remove FCAP dependency and change homepage link.
        this.writeText(
          this.process(path, this.rootChange),
          // eslint-disable-next-line no-template-curly-in-string
          this.alter(entry, [/,\n.*fcap.*/, '', this.noConfig], [/"homepage":\s*"[^"]*"/, `"homepage": ${JSON.stringify(this.homepage())}`])
        );
        break;
      case path.endsWith('mods.toml'):
        // Files mods.toml: optionally remove FCAP dependency and change updateJSON link.
        this.writeText(
          this.process(path, this.rootChange),
          this.alter(
            entry,
            [/.*(\n.*){3}fcap(.*\n){3}/, '', this.noConfig],
            [/forge_updates\.json(?:\?neoforge=(?:only|include))?/, path.startsWith(`${this.root}/neoforge/`) ? 'forge_updates.json?neoforge=only' : 'forge_updates.json'],
            ['https://docs.neoforged.net/docs/misc/updatechecker/', 'https://docs.minecraftforge.net/en/latest/misc/updatechecker/', path.startsWith(`${this.root}/forge/`)],
            ['updateJSONURL', '#updateJSONURL', this.excludedPlatforms.includes('modrinth')]
          )
        );
        break;
      default:
        return false;
    }
    return true;
  }

  /**
   * Transforms the README layout shared by the older template families.
   *
   * @param {string} text original README.
   * @returns {string} project README.
   */
  protected override processReadme(text: string): string {
    return this.process(super.processReadme(text), [/-.*configuration.*\n/, '', this.noConfig], ...this.loaderChanges);
  }

  /**
   * Handles files whose layout differs between the legacy families.
   *
   * @param {JSZipObject} entry source entry.
   * @param {string} path source path.
   * @returns {boolean} whether the entry was handled.
   */
  protected abstract handleVersion(entry: JSZipObject, path: string): boolean;

  /**
   * Removes unsupported loaders and publishing destinations from legacy Gradle code.
   *
   * @param {string} content original convention.
   * @param {Lowercase<ModLoader>[]} loaders excluded loaders.
   * @param {Lowercase<Platform>[]} platforms excluded destinations.
   * @returns {string} transformed convention.
   */
  protected abstract processBuildGradle(content: string, loaders: Lowercase<ModLoader>[], platforms: Lowercase<Platform>[]): string;

  /**
   * Supplies replacements for an excluded legacy loader.
   *
   * @param {Lowercase<ModLoader>[]} loaders excluded loaders.
   * @returns {Change[]} file-format replacements.
   */
  protected abstract loadersChanges(loaders: Lowercase<ModLoader>[]): Change[];
}
