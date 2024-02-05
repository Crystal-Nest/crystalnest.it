/* eslint-disable jsdoc/match-description */
/* eslint-disable capitalized-comments */
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'cn-generator',
  standalone: true,
  imports: [RouterOutlet],
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
}
