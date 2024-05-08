import {CommonModule} from '@angular/common';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {Component} from '@angular/core';
import {MatProgressBarModule, ProgressBarMode} from '@angular/material/progress-bar';
import {RouterModule} from '@angular/router';
import JSZip, {JSZipObject} from '@progress/jszip-esm';

import {GeneratorFormComponent} from './component/generator-form/generator-form.component';
import {Loader} from './model/loader.type';
import {Platform} from './model/platform.type';
import {SkeletonForm} from './model/skeleton-form.interface';
import {TEMPLATE_AUTHORS, TEMPLATE_BANNER_LINK, TEMPLATE_GITHUB_USER, TEMPLATE_GROUP, TEMPLATE_GROUP_PATH, TEMPLATE_LOADERS, TEMPLATE_MOD_ID, TEMPLATE_MOD_ID_KEBAB, TEMPLATE_MOD_TITLE, TEMPLATE_PLATFORMS, TEMPLATE_SUPPORT_SECTION} from './model/template.const';
import {TemplateService} from './service/template.service';

/**
 * Change to apply to a file, replacing the first value with the second one, only if the third one is true or absent.
 */
type Change = [(string | RegExp), string] | [(string | RegExp), string, boolean];

/**
 * MultiLoader Skeleton Generator.
 *
 * @export
 * @class GeneratorComponent
 * @typedef {GeneratorComponent}
 */
@Component({
  selector: 'cn-generator',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    HttpClientJsonpModule,
    GeneratorFormComponent,
    MatProgressBarModule
  ],
  providers: [TemplateService],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.scss'
})
export class GeneratorComponent {
  /**
   * Available Minecraft versions.
   *
   * @public
   * @readonly
   * @type {Record<MinecraftVersion, MinecraftVersion>}
   */
  public readonly versions$ = this.templateService.getMinecraftVersions();

  /**
   * Progress mode.  
   * Used to differentiate between retrieving the template and processing it.
   *
   * @public
   * @type {ProgressBarMode}
   */
  public progressMode: ProgressBarMode = 'query';

  /**
   * Template processing progress.
   *
   * @public
   * @type {number}
   */
  public progress = -1;

  /**
   * @constructor
   * @public
   * @param {TemplateService} templateService
   */
  public constructor(private readonly templateService: TemplateService) {}

  /**
   * Builds the mod skeleton with the specified properties.
   *
   * @public
   * @param {SkeletonForm} form
   */
  public buildSkeleton(form: SkeletonForm) {
    this.progress = 0;
    this.templateService.getTemplate(form.minecraftVersion).subscribe(zip => new JSZip().loadAsync(zip).then(template => this.processTemplate(template, form).generateAsync({type: 'blob'}).then(file => this.download(file, form.modIdKebab))));
  }

  /**
   * Processes the given zip template according to the provided properties.  
   * 
   * @private
   * @param {JSZip} template
   * @param {SkeletonForm} form
   * @param {MinecraftVersion} form.minecraftVersion
   * @param {Lowercase<Loader>[]} form.loaders
   * @param {Lowercase<Platform>[]} form.platforms
   * @param {string} form.group
   * @param {string} form.modId
   * @param {string} form.modIdKebab
   * @param {string} form.modTitle
   * @param {string} form.authors
   * @param {string} form.description
   * @param {string} form.githubUser
   * @param {boolean} form.includeConfig
   * @param {boolean} form.crystalNestMod
   * @returns {JSZip}
   */
  private processTemplate(template: JSZip, {minecraftVersion, loaders, platforms, group, modId, modIdKebab, modTitle, authors, description, githubUser, includeConfig, crystalNestMod}: SkeletonForm): JSZip {
    this.progressMode = 'determinate';
    const zip = new JSZip();
    // Constants.
    const othersMod = !crystalNestMod;
    const noConfig = !includeConfig;
    const root = `${TEMPLATE_MOD_ID_KEBAB}-${minecraftVersion}`;
    const excludedLoaders = TEMPLATE_LOADERS.filter(loader => !loaders.includes(loader));
    const excludedPlatforms = TEMPLATE_PLATFORMS.filter(platform => !platforms.includes(platform));
    const step = 100 / Object.keys(template.files).length;
    // Common changes.
    const rootChange: Change = [root, modIdKebab];
    const modIdChange: Change = [TEMPLATE_MOD_ID, modId];
    const modIdKebabChange: Change = [TEMPLATE_MOD_ID_KEBAB, modIdKebab];
    const modTitleChange: Change = [TEMPLATE_MOD_TITLE, modTitle];
    const groupChange: Change = [TEMPLATE_GROUP, group, othersMod];
    const groupPathChange: Change = [TEMPLATE_GROUP_PATH, group.replaceAll('.', '/'), othersMod];
    const fcapChange: Change = [/.*fcap.*\n/, '', noConfig];
    const loaderChanges = this.loadersChanges(excludedLoaders);
    // eslint-disable-next-line complexity
    template.forEach((path, entry) => {
      if (!((othersMod && path.includes('.github')) || (noConfig && path.includes('config')) || excludedLoaders.some(loader => path.startsWith(`${root}/${loader}`)))) {
        switch (true) {
          case entry.dir:
            // Directory: replace the name of the root dir, group, and modid.
            zip.folder(this.process(path, [rootChange, groupPathChange, modIdChange]));
            break;
          case path === `${root}/build.gradle`:
            // Handle build.gradle.
            zip.file(
              this.process(path, [rootChange]),
              entry.async('string').then(content => this.processBuildGradle(
                this.process(content, [[/.*sonar.*\n(.*({|})\n){0,2}\n?/gi, '', othersMod], fcapChange, [/\s*maven.*\n(.*Fuzs.*\n){2}\s*}/, '', noConfig]]),
                excludedLoaders,
                excludedPlatforms
              ))
            );
            break;
          case path.endsWith('build.gradle'):
            // Subprojects build.gradle: update configuration dependency.
            zip.file(
              this.process(path, [rootChange]),
              this.alter(entry, [fcapChange])
            );
            break;
          case path.endsWith('gradle.properties'):
            // File gradle.properties: replace Gradle properties.
            zip.file(
              this.process(path, [rootChange]),
              this.alter(entry, [
                groupChange,
                [TEMPLATE_AUTHORS.join(', '), authors, othersMod],
                modTitleChange,
                modIdKebabChange,
                modIdChange,
                [/^description = .*$/m, `description = ${description.trim().replaceAll('\n', '\\n')}`],
                [TEMPLATE_GITHUB_USER, githubUser, othersMod],
                fcapChange,
                ...loaderChanges
              ])
            );
            break;
          case path.endsWith('README.md'):
            // File README.md: replace link references.
            zip.file(
              this.process(path, [rootChange]),
              this.alter(entry, [
                [TEMPLATE_BANNER_LINK, 'Banner link here...', othersMod],
                [`github.com/${TEMPLATE_GITHUB_USER}`, `github.com/${githubUser}`, othersMod],
                modTitleChange,
                modIdKebabChange,
                modIdChange,
                [TEMPLATE_SUPPORT_SECTION, '**Support us**\n\nSocial links here...\n', othersMod],
                [/-.*configuration.*\n/, '', includeConfig],
                ...loaderChanges
              ])
            );
            break;
          case path.endsWith('settings.gradle'):
            // File settings.gradle: update project name and loaders.
            zip.file(this.process(path, [rootChange]), this.alter(entry, [modIdKebabChange, ...loaderChanges]));
            break;
          case path.endsWith('.jar') || path.endsWith('.png'):
            // Data files: parse them as arraybuffer rather than string.
            zip.file(this.process(path, [rootChange, modIdChange]), entry.async('arraybuffer'));
            break;
          case path.endsWith('CommonModLoader.java'):
            // File CommonModLoader.java: replace mod properties and optionally remove configuration references.
            zip.file(
              this.process(path, [rootChange, groupPathChange, modIdChange]),
              this.alter(entry, [[/\n.*config.*\n */gi, '', noConfig], groupChange, modIdChange])
            );
            break;
          case path.endsWith('fabric.mod.json'):
            // File fabric.mod.json: optionally remove FCAP dependency and change homepage link.
            zip.file(
              this.process(path, [rootChange]),
              // eslint-disable-next-line no-template-curly-in-string
              this.alter(entry, [[/,\n.*fcap.*/, '', noConfig], [/https.*modrinth.*mod\//, platforms.includes('curseforge') ? 'www.curseforge.com/minecraft/mc-mods/' : 'github.com/${github_user}/', excludedPlatforms.includes('modrinth')]])
            );
            break;
          case path.endsWith('mods.toml'):
            // Files mods.toml: optionally remove FCAP dependency and change updateJSON link.
            zip.file(
              this.process(path, [rootChange]),
              this.alter(entry, [[/.*(\n.*){3}fcap(.*\n){3}/, '', noConfig], ['updateJSONURL', '#updateJSONURL', excludedPlatforms.includes('modrinth')]])
            );
            break;
          default:
            // All other files: replace mod properties.
            zip.file(
              this.process(path, [
                rootChange,
                groupPathChange,
                groupChange,
                modIdChange
              ]),
              this.alter(entry, [groupChange, modIdKebabChange, modIdChange])
            );
            break;
        }
      }
      this.progress += step;
    });
    this.progress = 100;
    return zip;
  }

  /**
   * Processes the content of the root build.gradle file excluding the given loaders and platforms.
   *
   * @private
   * @param {string} content
   * @param {Lowercase<Loader>[]} loaders loaders to exclude.
   * @param {Lowercase<Platform>[]} platforms platforms to exclude.
   * @returns {string}
   */
  private processBuildGradle(content: string, loaders: Lowercase<Loader>[], platforms: Lowercase<Platform>[]): string {
    let value = content;
    if (loaders.length) {
      if (loaders.includes('fabric')) {
        value = value
          .replace(/'isFabric \\? remapJar : jar/gi, 'jar')
          .replace(/', "fabric\\.mod\\.json"/gi, '')
          .replace(/'if.+fabric.+\\n.+\\n\\s+}\n/gi, '')
          .replace(/'isFabric/gi, 'false');
      }
      value = value.replace(new RegExp(`(.*\\b(${loaders.join('|')})(\\b|_).+)+(\\s*break)?\\n?`, 'gi'), '');
    }
    platforms.forEach(platform => {
      switch (platform) {
        case 'maven':
          value = value.replace(/\n  publishing(.*\n)+(\s+}){4,}\n/gi, '').replace(/.*\bpublish\b.*\n/g, '');
          break;
        case 'github':
          value = value.replace(/\n  githubRelease(.*\n){1,32}.+noPublish\n  }\n/gi, '').replace(/.*github-?release.*\n/gi, '');
          break;
        case 'modrinth':
          value = value.replace(/\n  modrinth(.*\n){1,32}.+noPublish\n  }\n/gi, '').replace(/.*modrinth.*\n/gi, '');
          break;
        case 'curseforge':
          value = value.replace(/\n  curseforge(.*\n){1,32}.+noPublish\n    }\n  }\n/gi, '').replace(/.*curse.*\n/gi, '');
          break;
      }
    });
    return value;
  }

  /**
   * Returns the {@link Change changes} needed to exclude the given loaders from files.
   *
   * @private
   * @param {Lowercase<Loader>[]} loaders
   * @returns {Change[]}
   */
  private loadersChanges(loaders: Lowercase<Loader>[]): Change[] {
    return loaders.flatMap(loader => [
      // For settings.gradle
      [new RegExp(`maven.+\\n.+"${loader}"\\n.+\\n.+\\s+`, 'i'), ''],
      [new RegExp(`include\\("${loader}"\\)\\n`, 'i'), ''],
      // For gradle.properties
      [new RegExp(`# ${loader}\\n.*\\n.*\\n\\n`, 'i'), ''],
      // For readme
      [new RegExp(`\\[!\\[${loader}.+l=${loader}\\)(!.{95})?`, 'i'), '']
    ]);
  }

  /**
   * Alters the promise content with the given changes.
   *
   * @private
   * @async
   * @param {JSZipObject} value
   * @param {Change[]} changes
   * @returns {Promise<string>}
   */
  private async alter(value: JSZipObject, changes: Change[]): Promise<string> {
    return this.process(await value.async('string'), changes);
  }

  /**
   * Applies the given changes to the value.
   *
   * @private
   * @param {string} value
   * @param {Change[]} changes
   * @returns {string}
   */
  private process(value: string, changes: Change[]): string {
    return changes.reduce((content, [search, replace, flag]) => flag ?? true ? content[typeof search === 'string' ? 'replaceAll' : 'replace'](search, replace) : content, value);
  }

  /**
   * Downloads the given `file`.
   *
   * @private
   * @param {Blob} file
   * @param {string} id
   */
  private download(file: Blob, id: string) {
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = URL.createObjectURL(file);
    anchor.download = `cobweb-mod-skeleton (${id})`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    this.progress = -1;
    this.progressMode = 'indeterminate';
  }
}
