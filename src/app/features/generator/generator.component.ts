/* eslint-disable jsdoc/match-description */
/* eslint-disable capitalized-comments */
import {HttpClientModule} from '@angular/common/http';
import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import JSZip from '@progress/jszip-esm';

import {TemplateService} from './template.service';

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

  private readonly zip = new JSZip();

  /**
   * @constructor
   * @public
   * @param {TemplateService} templateService
   */
  public constructor(private readonly templateService: TemplateService) {
    this.templateService.getTemplate().subscribe(template => (this.template = template));
  }

  public download() {
    if (this.template) {
      this.zip.loadAsync(this.template).then(template => template.generateAsync({type: 'blob'}).then(zip => {
        const anchor = document.createElement('a');
        anchor.style.display = 'none';
        anchor.href = URL.createObjectURL(zip);
        anchor.download = 'cobweb-mod-skeleton';
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
      }));
    }
    // const mod = this.zip.folder('cobweb-mod-template');
    // const idea = mod?.folder('.idea');
    // const scopes = idea?.folder('scopes');
    // scopes?.file('Fabric_sources.xml');
    // scopes?.file('Forge_sources.xml');
    // mod?.file('.gitattributes', '');
    // mod?.file('.gitignore', '');
    // mod?.file('.api-keys.properties', '');
    // mod?.file('.build.gradle', '');
    // mod?.file('CHANGELOG.md', '');
    // mod?.file('gradle.properties', '');
    // mod?.file('gradlew', '');
    // mod?.file('gradlew.bat', '');
    // mod?.file('LICENSE', '');
    // mod?.file('README.md', '');
    // mod?.file('settings.gradle', '');
    // this.zip.generateAsync({type: 'blob'}).then(content => {
    // const anchor = document.createElement('a');
    // anchor.style.display = 'none';
    // anchor.href = URL.createObjectURL(content);
    // anchor.download = 'cobweb-mod-template';
    // document.body.appendChild(anchor);
    // anchor.click();
    // anchor.remove();
    // });
  }
}
