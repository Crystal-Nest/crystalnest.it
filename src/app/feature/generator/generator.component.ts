import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
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
  public buildSkeleton({minecraftVersion, group, authors, modTitle, modId, modIdKebab, githubUser, description, crystalNestMod}: SkeletonFormData) {
    this.templateService.getTemplate(minecraftVersion).subscribe(templateZip => {
      console.log(templateZip);
      const zip = new JSZip();
      new JSZip().loadAsync(templateZip as any).then(template => {
        template.forEach((path, entry) => {
          switch (true) {
            case entry.dir:
              zip.folder(path.replace(`${TEMPLATE_MOD_ID}-${minecraftVersion}`, modId).replaceAll(TEMPLATE_GROUP, group).replaceAll(TEMPLATE_MOD_ID, modId));
              break;
            case path.endsWith('gradle.properties'):
              zip.file(
                path.replace(`${TEMPLATE_MOD_ID}-${minecraftVersion}`, modId).replaceAll(TEMPLATE_MOD_ID, modId),
                entry.async('string').then(content => content
                  .replace(TEMPLATE_GROUP, group)
                  .replace(TEMPLATE_AUTHORS.join(', '), authors)
                  .replace(TEMPLATE_MOD_TITLE, modTitle)
                  .replace(TEMPLATE_MOD_ID_KEBAB, modIdKebab)
                  .replace(TEMPLATE_MOD_ID, modId)
                  .replace(/^description = .*$/m, `description = ${description.trim().replaceAll('\n', '\\n')}`)
                  // TODO: Replace credits (credits maybe with Patreon API?).
                  .replace(TEMPLATE_GITHUB_USER, githubUser))
              );
              break;
            case path.endsWith('README.md'):
              zip.file(path.replace(`${TEMPLATE_MOD_ID}-${minecraftVersion}`, modId).replaceAll(TEMPLATE_MOD_ID, modId), entry.async('string').then(content => content
                .replace('bannerlink', crystalNestMod ? `https://raw.githubusercontent.com/${group}/mod-fancy-assets/main/${modId}/banner.png` : 'Insert your banner link here...')
                .replaceAll(`github.com/${TEMPLATE_GROUP}`, `github.com/${group}`)
                .replaceAll(TEMPLATE_MOD_TITLE, modTitle)
                .replaceAll(TEMPLATE_MOD_ID_KEBAB, modIdKebab)
                .replaceAll(TEMPLATE_MOD_ID, modId)));
              break;
            case crystalNestMod || !path.includes('.github'):
              zip.file(
                path.replace(`${TEMPLATE_MOD_ID}-${minecraftVersion}`, modId).replaceAll(TEMPLATE_GROUP, group).replaceAll(TEMPLATE_MOD_ID, modId),
                entry.async('string').then(content => content.replaceAll(TEMPLATE_MOD_ID_KEBAB, modIdKebab).replaceAll(TEMPLATE_MOD_ID, modId))
              );
              break;
          }
        });
        zip.generateAsync({type: 'blob'}).then(this.download);
      });
    });
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
