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
   * @param {SkeletonForm} event
   * @param {SkeletonForm} event.minecraftVersion
   * @param {SkeletonForm} event.group
   * @param {SkeletonForm} event.authors
   * @param {SkeletonForm} event.modTitle
   * @param {SkeletonForm} event.modId
   * @param {SkeletonForm} event.modIdKebab
   * @param {SkeletonForm} event.githubUser
   * @param {SkeletonForm} event.description
   * @param {SkeletonForm} event.crystalNestMod
   */
  public buildSkeleton({minecraftVersion, group, authors, modTitle, modId, modIdKebab, githubUser, description, crystalNestMod}: SkeletonForm) {
    this.templateService.getTemplate(minecraftVersion).subscribe(templateZip => {
      const zip = new JSZip();
      new JSZip().loadAsync(templateZip).then(template => {
        const root = `${TEMPLATE_MOD_ID_KEBAB}-${minecraftVersion}`;
        template.forEach((path, entry) => {
          switch (true) {
            case entry.dir:
              // Directory: replace the name of the root dir, group, and modid.
              zip.folder(path.replace(root, modIdKebab).replaceAll(TEMPLATE_GROUP, group).replaceAll(TEMPLATE_MOD_ID, modId));
              break;
            case path.endsWith('gradle.properties'):
              // File gradle.properties: replace all Gradle properties.
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
                  .replace(TEMPLATE_BANNER_LINK, crystalNestMod ? `https://raw.githubusercontent.com/${group}/mod-fancy-assets/main/${modId}/banner.png` : 'Banner link here...')
                  .replaceAll(`github.com/${TEMPLATE_GROUP}`, `github.com/${group}`)
                  .replaceAll(TEMPLATE_MOD_TITLE, modTitle)
                  .replaceAll(TEMPLATE_MOD_ID_KEBAB, modIdKebab)
                  .replaceAll(TEMPLATE_MOD_ID, modId)
                  .replace(TEMPLATE_SUPPORT_SECTION, `**Support us**\n\n${crystalNestMod ? content.split('**Support us**\n\n')[1] : 'Social links here...\n'}`))
              );
              break;
            case crystalNestMod || !path.includes('.github'):
              // Handle all files and, if needed, do not include Crystal Nest specific .github directory content.
              zip.file(
                path.replace(root, modIdKebab).replaceAll(TEMPLATE_GROUP, group).replaceAll(TEMPLATE_MOD_ID, modId),
                entry.async('string').then(content => content.replaceAll(TEMPLATE_GROUP, group).replaceAll(TEMPLATE_MOD_ID_KEBAB, modIdKebab).replaceAll(TEMPLATE_MOD_ID, modId))
              );
              break;
          }
        });
        zip.generateAsync({type: 'blob'}).then(file => this.download(file, modIdKebab));
      });
    });
  }

  /**
   * Downloads the given `file`.
   *
   * @private
   * @param {Blob} file
   * @param {string} modId
   */
  private download(file: Blob, modId: string) {
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = URL.createObjectURL(file);
    anchor.download = `cobweb-mod-skeleton (${modId})`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }
}
