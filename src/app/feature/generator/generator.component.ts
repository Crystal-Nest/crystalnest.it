import {HttpClientModule} from '@angular/common/http';
import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import JSZip from '@progress/jszip-esm';

import {CnGeneratorFormComponent} from './component/cn-generator-form/cn-generator-form.component';
import {SkeletonFormData} from './model/skeleton-form-data.interface';
import {TEMPLATE_AUTHORS, TEMPLATE_GITHUB_USER, TEMPLATE_GROUP, TEMPLATE_MOD_ID, TEMPLATE_MOD_ID_KEBAB, TEMPLATE_MOD_TITLE} from './model/template.constants';
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
  imports: [RouterModule, HttpClientModule, CnGeneratorFormComponent],
  providers: [TemplateService],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.scss'
})
export class GeneratorComponent {
  /**
   * Mod template zip file.
   *
   * @private
   * @type {?ArrayBuffer}
   */
  private template?: ArrayBuffer;

  /**
   * @constructor
   * @public
   * @param {TemplateService} templateService
   */
  public constructor(private readonly templateService: TemplateService) {
    this.templateService.getTemplate().subscribe(template => (this.template = template));
  }

  /**
   * Builds the mod skeleton with the specified properties.
   *
   * @public
   * @param {SkeletonFormData} event
   * @param {SkeletonFormData} event.minecraftVersion
   * @param {SkeletonFormData} event.group
   * @param {SkeletonFormData} event.authors
   * @param {SkeletonFormData} event.modTitle
   * @param {SkeletonFormData} event.modId
   * @param {SkeletonFormData} event.modIdKebab
   * @param {SkeletonFormData} event.githubUser
   * @param {SkeletonFormData} event.description
   * @param {SkeletonFormData} event.crystalNestMod
   */
  public buildSkeleton({minecraftVersion, group, authors, modTitle, modId, modIdKebab, githubOwner, description, crystalNestMod}: SkeletonFormData) {
    if (this.template) {
      const zip = new JSZip();
      new JSZip().loadAsync(this.template).then(template => {
        template.forEach((path, entry) => {
          switch (true) {
            case entry.dir:
              zip.folder(entry.name.replaceAll(TEMPLATE_GROUP, group).replaceAll(TEMPLATE_MOD_ID, modId));
              break;
            case path.endsWith('gradle.properties'):
              zip.file(
                entry.name.replaceAll(TEMPLATE_MOD_ID, modId),
                entry.async('string').then(content => content
                  .replace(TEMPLATE_GROUP, group)
                  .replace(TEMPLATE_AUTHORS.join(', '), authors)
                  .replace(TEMPLATE_MOD_TITLE, modTitle)
                  .replace(TEMPLATE_MOD_ID_KEBAB, modIdKebab)
                  .replace(TEMPLATE_MOD_ID, modId)
                  .replace(/^description = .*$/m, `description = ${description}`)
                  // TODO: Replace credits (credits maybe with Patreon API?).
                  // TODO: Replace Minecraft version and loaders versions.
                  .replace(TEMPLATE_GITHUB_USER, githubOwner))
              );
              break;
            case path.endsWith('README.md'):
              zip.file(entry.name, entry.async('string').then(content => content
                .replace('bannerlink', crystalNestMod ? `https://raw.githubusercontent.com/${group}/mod-fancy-assets/main/${modId}/banner.png` : 'Insert your banner link here...')
                .replaceAll(`github.com/${TEMPLATE_GROUP}`, `github.com/${group}`)
                .replaceAll(TEMPLATE_MOD_TITLE, modTitle)
                .replaceAll(TEMPLATE_MOD_ID_KEBAB, modIdKebab)
                .replaceAll(TEMPLATE_MOD_ID, modId)));
              break;
            case crystalNestMod || !path.startsWith('.github'):
              zip.file(
                entry.name.replaceAll(TEMPLATE_GROUP, group).replaceAll(TEMPLATE_MOD_ID, modId),
                entry.async('string').then(content => content.replaceAll(TEMPLATE_MOD_ID_KEBAB, modIdKebab).replaceAll(TEMPLATE_MOD_ID, modId))
              );
              break;
          }
        });
        zip.generateAsync({type: 'blob'}).then(this.download);
      });
    }
  }

  /**
   * Downloads the given `file`.
   *
   * @private
   * @param {Blob} file
   */
  private download(file: Blob) {
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = URL.createObjectURL(file);
    anchor.download = 'cobweb-mod-skeleton';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }
}
