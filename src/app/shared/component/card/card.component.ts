import {Component, Input, OnChanges} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MarkdownComponent} from 'ngx-markdown';

import {LinkButtonComponent} from '../button/link-button/link-button.component';
import {LabelComponent} from '../label/label.component';

import {ModLoader, formatLoader} from '~cn/core/model/mod-loader.type';
import {TypedChanges} from '~cn/core/model/typed-changes.type';
import {Mod} from '~cn/feature/mods/model/mod.interface';

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
  imports: [
    MatCardModule,
    MarkdownComponent,
    LabelComponent,
    LinkButtonComponent
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnChanges {
  @Input({required: true})
  public mod!: Mod;

  public side = '';

  public sideIcon = '';

  public get picture(): string {
    return `https://raw.githubusercontent.com/crystal-nest/mod-fancy-assets/main/${this.mod.name}/${this.mod.name}.png`;
  }

  public get preview(): string {
    return `https://raw.githubusercontent.com/crystal-nest/mod-fancy-assets/main/${this.mod.name}/social-preview.png`;
  }

  public get github(): string {
    return `https://github.com/crystal-nest/${this.mod.name}`;
  }

  public get modrinth(): string {
    return `https://modrinth.com/mod/${this.mod.name}`;
  }

  public get curseforge(): string {
    return `https://www.curseforge.com/minecraft/mc-mods/${this.mod.name}`;
  }

  public get wiki(): string {
    return `https://github.com/crystal-nest/${this.mod.name}/wiki`;
  }

  public get api(): string {
    return `https://github.com/crystal-nest/${this.mod.name}/wiki/Setup#add-as-a-dependency`;
  }

  public get template(): string {
    return `https://github.com/new?template_name=${this.mod.name}&template_owner=Crystal-Nest`;
  }

  public ngOnChanges(changes: TypedChanges<CardComponent>): void {
    if (changes.mod) {
      this.side = Object.entries(this.mod).filter(([key, value]) => ['client', 'server'].includes(key) && value).map(([key]) => key.charAt(0).toUpperCase() + key.slice(1)).join(' & ');
      this.sideIcon = this.side.replace(' & ', '-').toLowerCase();
    }
  }

  public formatLoaders(loaders: Lowercase<ModLoader>[]): ModLoader[] {
    return loaders.map(formatLoader);
  }
}
