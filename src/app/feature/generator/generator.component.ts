import {CommonModule} from '@angular/common';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {Component} from '@angular/core';
import {MatProgressBarModule, ProgressBarMode} from '@angular/material/progress-bar';
import {RouterModule} from '@angular/router';
import JSZip from '@progress/jszip-esm';

import {GeneratorFormComponent} from './component/generator-form/generator-form.component';
import {Loader} from './model/loader.type';
import {Platform} from './model/platform.type';
import {SkeletonForm} from './model/skeleton-form.interface';
import {TEMPLATE_AUTHORS, TEMPLATE_BANNER_LINK, TEMPLATE_GITHUB_USER, TEMPLATE_GROUP, TEMPLATE_GROUP_PATH, TEMPLATE_LOADERS, TEMPLATE_MOD_ID, TEMPLATE_MOD_ID_KEBAB, TEMPLATE_MOD_TITLE, TEMPLATE_PLATFORMS, TEMPLATE_SUPPORT_SECTION} from './model/template.const';
import {TemplateService} from './service/template.service';

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
   * @returns {JSZip}
   */
  private processTemplate(template: JSZip, form: SkeletonForm): JSZip {
    this.progressMode = 'determinate';
    console.log(this.progressMode);
    return this[`processTemplate${form.crystalNestMod ? 'Nest' : 'Others'}`](
      template,
      form,
      `${TEMPLATE_MOD_ID_KEBAB}-${form.minecraftVersion}`,
      TEMPLATE_LOADERS.filter(loader => !form.loaders.includes(loader)),
      TEMPLATE_PLATFORMS.filter(platform => !form.platforms.includes(platform)),
      100 / Object.keys(template.files).length
    );
  }

  /**
   * Processes the given zip template according to the provided properties.  
   * Crystal Nest mods only.
   *
   * @private
   * @param {JSZip} template
   * @param {SkeletonForm} param0
   * @param {SkeletonForm} param0.modId
   * @param {SkeletonForm} param0.modIdKebab
   * @param {SkeletonForm} param0.modTitle
   * @param {SkeletonForm} param0.description
   * @param {string} root
   * @param {Lowercase<Loader>[]} excludedLoaders
   * @param {Lowercase<Platform>[]} excludedPlatforms
   * @param {number} step
   * @returns {JSZip}
   */
  private processTemplateNest(template: JSZip, {modId, modIdKebab, modTitle, description}: SkeletonForm, root: string, excludedLoaders: Lowercase<Loader>[], excludedPlatforms: Lowercase<Platform>[], step: number): JSZip {
    const zip = new JSZip();
    template.forEach((path, entry) => {
      if (!excludedLoaders.some(loader => path.startsWith(`${root}/${loader}`))) {
        switch (true) {
          case entry.dir:
            // Directory: replace the name of the root dir and modid.
            zip.folder(path.replace(root, modIdKebab).replaceAll(TEMPLATE_MOD_ID, modId));
            break;
          case path === `${root}/build.gradle`:
            // Handle build.gradle when it's a Crystal Nest mod.
            zip.file(
              path.replace(root, modIdKebab),
              entry.async('string').then(content => this.processBuildGradle(content, excludedLoaders, excludedPlatforms))
            );
            break;
          case path.endsWith('gradle.properties'):
            // File gradle.properties: replace Gradle properties.
            zip.file(
              path.replace(root, modIdKebab),
              entry.async('string').then(content => this.excludeLoaders(
                content
                  .replace(TEMPLATE_MOD_TITLE, modTitle)
                  .replace(TEMPLATE_MOD_ID_KEBAB, modIdKebab)
                  .replace(TEMPLATE_MOD_ID, modId)
                  .replace(/^description = .*$/m, `description = ${description.trim().replaceAll('\n', '\\n')}`),
                excludedLoaders
              ))
            );
            break;
          case path.endsWith('README.md'):
            // File README.md: replace link references.
            zip.file(
              path.replace(root, modIdKebab),
              entry.async('string').then(content => this.excludeLoaders(content.replaceAll(TEMPLATE_MOD_TITLE, modTitle).replaceAll(TEMPLATE_MOD_ID_KEBAB, modIdKebab).replaceAll(TEMPLATE_MOD_ID, modId), excludedLoaders))
            );
            break;
          case path.endsWith('settings.gradle'):
            zip.file(path.replace(root, modIdKebab), entry.async('string').then(content => this.excludeLoaders(content.replaceAll(TEMPLATE_MOD_ID_KEBAB, modIdKebab), excludedLoaders)));
            break;
          case path.endsWith('.jar') || path.endsWith('.png'):
            zip.file(
              path.replace(root, modIdKebab).replaceAll(TEMPLATE_MOD_ID, modId),
              entry.async('arraybuffer')
            );
            break;
          default:
            // Handle all files.
            zip.file(
              path.replace(root, modIdKebab).replaceAll(TEMPLATE_MOD_ID, modId),
              entry.async('string').then(content => content.replaceAll(TEMPLATE_MOD_ID_KEBAB, modIdKebab).replaceAll(TEMPLATE_MOD_ID, modId))
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
   * Processes the given zip template according to the provided properties.  
   * Not Crystal Nest mods only.
   *
   * @private
   * @param {JSZip} template
   * @param {SkeletonForm} param0
   * @param {SkeletonForm} param0.group
   * @param {SkeletonForm} param0.modId
   * @param {SkeletonForm} param0.modIdKebab
   * @param {SkeletonForm} param0.modTitle
   * @param {SkeletonForm} param0.authors
   * @param {SkeletonForm} param0.description
   * @param {SkeletonForm} param0.githubUser
   * @param {string} root
   * @param {Lowercase<Loader>[]} excludedLoaders
   * @param {Lowercase<Platform>[]} excludedPlatforms
   * @param {number} step
   * @returns {JSZip}
   */
  private processTemplateOthers(template: JSZip, {group, modId, modIdKebab, modTitle, authors, description, githubUser}: SkeletonForm, root: string, excludedLoaders: Lowercase<Loader>[], excludedPlatforms: Lowercase<Platform>[], step: number): JSZip {
    const zip = new JSZip();
    const groupPath = group.replaceAll('.', '/');
    // eslint-disable-next-line complexity
    template.forEach((path, entry) => {
      if (!(path.includes('.github') || excludedLoaders.some(loader => path.startsWith(`${root}/${loader}`)))) {
        switch (true) {
          case entry.dir && groupPath.startsWith(entry.name):
            // Directory: replace the name of the root dir, group, and modid.
            zip.folder(path.replace(root, modIdKebab).replaceAll(TEMPLATE_GROUP_PATH, groupPath).replaceAll(TEMPLATE_MOD_ID, modId));
            break;
          case path === `${root}/build.gradle`:
            // Handle build.gradle when it's not a Crystal Nest mod.
            zip.file(
              path.replace(root, modIdKebab),
              entry.async('string').then(content => this.processBuildGradle(content.replace(/.*sonar.*\n(.*({|})\n){0,2}\n?/gi, ''), excludedLoaders, excludedPlatforms))
            );
            break;
          case path.endsWith('gradle.properties'):
            // File gradle.properties: replace Gradle properties.
            zip.file(
              path.replace(root, modIdKebab),
              entry.async('string').then(content => this.excludeLoaders(
                content
                  .replace(TEMPLATE_GROUP, group)
                  .replace(TEMPLATE_AUTHORS.join(', '), authors)
                  .replace(TEMPLATE_MOD_TITLE, modTitle)
                  .replace(TEMPLATE_MOD_ID_KEBAB, modIdKebab)
                  .replace(TEMPLATE_MOD_ID, modId)
                  .replace(/^description = .*$/m, `description = ${description.trim().replaceAll('\n', '\\n')}`)
                  .replace(TEMPLATE_GITHUB_USER, githubUser),
                excludedLoaders
              ))
            );
            break;
          case path.endsWith('README.md'):
            // File README.md: replace link references.
            zip.file(
              path.replace(root, modIdKebab),
              entry.async('string').then(content => this.excludeLoaders(
                content
                  .replace(TEMPLATE_BANNER_LINK, 'Banner link here...')
                  .replaceAll(`github.com/${TEMPLATE_GITHUB_USER}`, `github.com/${githubUser}`)
                  .replaceAll(TEMPLATE_MOD_TITLE, modTitle)
                  .replaceAll(TEMPLATE_MOD_ID_KEBAB, modIdKebab)
                  .replaceAll(TEMPLATE_MOD_ID, modId)
                  .replace(TEMPLATE_SUPPORT_SECTION, '**Support us**\n\nSocial links here...\n'),
                excludedLoaders
              ))
            );
            break;
          case path.endsWith('settings.gradle'):
            zip.file(path.replace(root, modIdKebab), entry.async('string').then(content => this.excludeLoaders(content.replaceAll(TEMPLATE_MOD_ID_KEBAB, modIdKebab), excludedLoaders)));
            break;
          case path.endsWith('.jar') || path.endsWith('.png'):
            zip.file(
              path.replace(root, modIdKebab).replaceAll(TEMPLATE_MOD_ID, modId),
              entry.async('arraybuffer')
            );
            break;
          case !entry.dir:
            // Handle all files without including Crystal Nest specific stuff.
            zip.file(
              path.replace(root, modIdKebab).replaceAll(TEMPLATE_GROUP_PATH, groupPath).replaceAll(TEMPLATE_GROUP, group).replaceAll(TEMPLATE_MOD_ID, modId),
              entry.async('string').then(content => content.replaceAll(TEMPLATE_GROUP, group).replaceAll(TEMPLATE_MOD_ID_KEBAB, modIdKebab).replaceAll(TEMPLATE_MOD_ID, modId))
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
   * Exclude the given loaders from the given file content.
   *
   * @private
   * @param {string} content
   * @param {Lowercase<Loader>[]} loaders
   * @returns {string} file content without the specified loaders.
   */
  private excludeLoaders(content: string, loaders: Lowercase<Loader>[]): string {
    return loaders.reduce(
      (prev, curr) => prev
        // For settings.gradle
        .replace(new RegExp(`maven.+\\n.+"${curr}"\\n.+\\n.+\\s+`, 'i'), '')
        .replace(new RegExp(`include\\("${curr}"\\)\\n`, 'i'), '')
        // For gradle.properties
        .replace(new RegExp(`# ${curr}\\n.*\\n.*\\n\\n`, 'i'), '')
        // For readme
        .replace(new RegExp(`\\[!\\[${curr}.+l=${curr}\\)(!.{95})?`, 'i'), ''),
      content
    );
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
