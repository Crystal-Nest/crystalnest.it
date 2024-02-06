/* eslint-disable jsdoc/match-description */
/* eslint-disable capitalized-comments */
import {HttpClientModule} from '@angular/common/http';
import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import JSZip from '@progress/jszip-esm';

import {TEMPLATE_MOD_ID, TEMPLATE_MOD_ID_KEBAB, TEMPLATE_MOD_TITLE} from './model/template.constants';
import {TemplateService} from './service/template.service';

@Component({
  selector: 'cn-generator',
  standalone: true,
  imports: [RouterModule, HttpClientModule],
  providers: [TemplateService],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.scss'
})
export class GeneratorComponent {
  /**
   * minecraft_version (select)
   *
   * group = crystalnest (input)
   * authors = Crystal Spider, Moonstone Webber (input)
   * mod_title = Cobweb Mod Template (input)
   * mod_id = mod_title, lowercase, replace blanks with _ (input)
   * mod_id_kebab = mod_id, replace _ with - (input)
   * github_user = crystal-nest (input)
   *
   * mod_version = 1.0.0.0 (input)
   * description = Multiloader template for Minecraft mods! (textarea)
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

  public createSkeleton() {
    const modId = 'cobweb_mod_skeleton', modIdKebab = 'cobweb_mod_skeleton', modTitle = 'Cobweb Mod Skeleton';
    if (this.template) {
      const zip = new JSZip();
      new JSZip().loadAsync(this.template).then(template => {
        template.forEach((path, entry) => {
          console.log(path, entry.name, entry.dir);
          if (entry.dir) {
            zip.folder(entry.name.replaceAll(TEMPLATE_MOD_ID, modId));
          } else {
            zip.file(
              entry.name.replaceAll(TEMPLATE_MOD_ID, modId),
              entry.async('string').then(content => content.replaceAll(TEMPLATE_MOD_ID, modId).replaceAll(TEMPLATE_MOD_ID_KEBAB, modIdKebab).replaceAll(TEMPLATE_MOD_TITLE, modTitle))
            );
          }
        });
        zip.generateAsync({type: 'blob'}).then(this.download);
      });
    }
  }

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
