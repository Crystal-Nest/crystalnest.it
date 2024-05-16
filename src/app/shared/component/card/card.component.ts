import {Component, Input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';

import {LinkButtonComponent} from '../button/link-button/link-button.component';

import {Loader} from '~cn/feature/generator/model/loader.type';
import {MinecraftVersion} from '~cn/feature/generator/model/minecraft-version.type';

/**
 * Card component.
 *
 * @export
 * @class CardComponent
 * @typedef {CardComponent}
 */
@Component({
  selector: 'cn-card',
  standalone: true,
  imports: [MatCardModule, LinkButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input({required: true})
  public title!: string;

  @Input({required: true})
  public subtitle!: string;

  @Input({required: true})
  public description!: string;

  @Input({required: true})
  public minecraftVersions!: MinecraftVersion[];

  @Input({required: true})
  public loaders!: Lowercase<Loader>[];

  @Input({required: true})
  public hasWiki!: boolean;

  @Input({required: true})
  public isApi!: boolean;

  @Input({required: true})
  public isTemplate!: boolean;

  public get picture(): string {
    return `https://raw.githubusercontent.com/crystal-nest/mod-fancy-assets/main/${this.title}/${this.title}.png`;
  }

  public get preview(): string {
    return `https://raw.githubusercontent.com/crystal-nest/mod-fancy-assets/main/${this.title}/social-preview.png`;
  }

  public get github(): string {
    return `https://github.com/crystal-nest/${this.title}`;
  }

  public get modrinth(): string {
    return `https://modrinth.com/mod/${this.title}`;
  }

  public get curseforge(): string {
    return `https://www.curseforge.com/minecraft/mc-mods/${this.title}`;
  }

  public get wiki(): string {
    return `https://github.com/crystal-nest/${this.title}/wiki`;
  }
}
