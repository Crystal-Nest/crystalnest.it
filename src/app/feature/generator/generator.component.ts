import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import JSZip from '@progress/jszip-esm';

import {CnGeneratorFormComponent} from './component/cn-generator-form/cn-generator-form.component';
import {SkeletonForm} from './model/skeleton-form.interface';
import {TEMPLATE_AUTHORS, TEMPLATE_BANNER_LINK, TEMPLATE_GITHUB_USER, TEMPLATE_GROUP, TEMPLATE_MOD_ID, TEMPLATE_MOD_ID_KEBAB, TEMPLATE_MOD_TITLE, TEMPLATE_SUPPORT_SECTION} from './model/template.constants';
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
    RouterModule,
    HttpClientModule,
    HttpClientJsonpModule,
    CnGeneratorFormComponent
  ],
  providers: [TemplateService],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.scss'
})
export class GeneratorComponent {
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
   * @param {SkeletonForm} skeletonForm
   */
  public buildSkeleton(skeletonForm: SkeletonForm) {
    this.templateService.getTemplate(skeletonForm.minecraftVersion).subscribe(
      templateZip => new JSZip().loadAsync(templateZip).then(
        template => this[`processTemplate${skeletonForm.crystalNestMod ? 'Nest' : 'Others'}`](template, skeletonForm).generateAsync({type: 'blob'}).then(file => this.download(file, skeletonForm.modIdKebab))
      )
    );
  }

  /**
   * Processes the given zip template according to the provided properties.  
   * Crystal Nest mods only.
   *
   * @private
   * @param {JSZip} template
   * @param {SkeletonForm} skeletonForm
   * @param {SkeletonForm} skeletonForm.minecraftVersion
   * @param {SkeletonForm} skeletonForm.modId
   * @param {SkeletonForm} skeletonForm.modIdKebab
   * @param {SkeletonForm} skeletonForm.modTitle
   * @param {SkeletonForm} skeletonForm.description
   * @returns {JSZip}
   */
  private processTemplateNest(template: JSZip, {minecraftVersion, modId, modIdKebab, modTitle, description}: SkeletonForm) {
    const zip = new JSZip();
    const root = `${TEMPLATE_MOD_ID_KEBAB}-${minecraftVersion}`;
    template.forEach((path, entry) => {
      switch (true) {
        case entry.dir:
          // Directory: replace the name of the root dir and modid.
          zip.folder(path.replace(root, modIdKebab).replaceAll(TEMPLATE_MOD_ID, modId));
          break;
        case path.endsWith('gradle.properties'):
          // File gradle.properties: replace Gradle properties.
          zip.file(
            path.replace(root, modIdKebab),
            entry.async('string').then(content => content
              .replace(TEMPLATE_MOD_TITLE, modTitle)
              .replace(TEMPLATE_MOD_ID_KEBAB, modIdKebab)
              .replace(TEMPLATE_MOD_ID, modId)
              .replace(/^description = .*$/m, `description = ${description.trim().replaceAll('\n', '\\n')}`))
          );
          break;
        case path.endsWith('README.md'):
          // File README.md: replace link references.
          zip.file(
            path.replace(root, modIdKebab),
            entry.async('string').then(content => content.replaceAll(TEMPLATE_MOD_TITLE, modTitle).replaceAll(TEMPLATE_MOD_ID_KEBAB, modIdKebab).replaceAll(TEMPLATE_MOD_ID, modId))
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
    });
    return zip;
  }

  /**
   * Processes the given zip template according to the provided properties.  
   * Not Crystal Nest mods only.
   *
   * @private
   * @param {JSZip} template
   * @param {SkeletonForm} skeletonForm
   * @param {SkeletonForm} skeletonForm.minecraftVersion
   * @param {SkeletonForm} skeletonForm.group
   * @param {SkeletonForm} skeletonForm.modId
   * @param {SkeletonForm} skeletonForm.modIdKebab
   * @param {SkeletonForm} skeletonForm.modTitle
   * @param {SkeletonForm} skeletonForm.authors
   * @param {SkeletonForm} skeletonForm.description
   * @param {SkeletonForm} skeletonForm.githubUser
   * @returns {JSZip}
   */
  private processTemplateOthers(template: JSZip, {minecraftVersion, group, modId, modIdKebab, modTitle, authors, description, githubUser}: SkeletonForm) {
    const zip = new JSZip();
    const root = `${TEMPLATE_MOD_ID_KEBAB}-${minecraftVersion}`;
    template.forEach((path, entry) => {
      switch (true) {
        case entry.dir && !path.includes('.github'):
          // Directory: replace the name of the root dir, group, and modid.
          zip.folder(path.replace(root, modIdKebab).replaceAll(TEMPLATE_GROUP, group).replaceAll(TEMPLATE_MOD_ID, modId));
          break;
        case path === `${root}/build.gradle`:
          // Handle build.gradle when it's not a Crystal Nest mod.
          zip.file(
            path.replace(root, modIdKebab),
            entry.async('string').then(content => content.replace(/sonar {[^]+subprojects/, 'subprojects').replace(/plugins(.*\r?\n){2}/, 'plugins {\n'))
          );
          break;
        case path.endsWith('gradle.properties'):
          // File gradle.properties: replace Gradle properties.
          zip.file(
            path.replace(root, modIdKebab),
            entry.async('string').then(content => content
              .replace(TEMPLATE_GROUP, group)
              .replace(TEMPLATE_AUTHORS.join(', '), authors)
              .replace(TEMPLATE_MOD_TITLE, modTitle)
              .replace(TEMPLATE_MOD_ID_KEBAB, modIdKebab)
              .replace(TEMPLATE_MOD_ID, modId)
              .replace(/^description = .*$/m, `description = ${description.trim().replaceAll('\n', '\\n')}`)
              .replace(TEMPLATE_GITHUB_USER, githubUser))
          );
          break;
        case path.endsWith('README.md'):
          // File README.md: replace link references.
          zip.file(
            path.replace(root, modIdKebab),
            entry.async('string').then(content => content
              .replace(TEMPLATE_BANNER_LINK, 'Banner link here...')
              .replaceAll(`github.com/${TEMPLATE_GROUP}`, `github.com/${group}`)
              .replaceAll(TEMPLATE_MOD_TITLE, modTitle)
              .replaceAll(TEMPLATE_MOD_ID_KEBAB, modIdKebab)
              .replaceAll(TEMPLATE_MOD_ID, modId)
              .replace(TEMPLATE_SUPPORT_SECTION, '**Support us**\n\nSocial links here...\n'))
          );
          break;
        case !path.includes('.github'):
          // Handle all files without including Crystal Nest specific stuff.
          zip.file(
            path.replace(root, modIdKebab).replaceAll(TEMPLATE_GROUP, group).replaceAll(TEMPLATE_MOD_ID, modId),
            entry.async('string').then(content => content.replaceAll(TEMPLATE_GROUP, group).replaceAll(TEMPLATE_MOD_ID_KEBAB, modIdKebab).replaceAll(TEMPLATE_MOD_ID, modId))
          );
          break;
      }
    });
    return zip;
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
  }
}
