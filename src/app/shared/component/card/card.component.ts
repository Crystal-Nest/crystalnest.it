import {Component, Input, OnChanges, ViewChild, AfterContentChecked} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MarkdownComponent, MarkdownModule} from 'ngx-markdown';

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
    MarkdownModule,
    LabelComponent,
    LinkButtonComponent
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnChanges, AfterContentChecked {
  /**
   * Markdown component used to display the mod description.
   *
   * @public
   * @type {!MarkdownComponent}
   */
  @ViewChild(MarkdownComponent, {static: true})
  public markdownComponent!: MarkdownComponent;

  /**
   * Mod to display.
   *
   * @public
   * @type {!Mod}
   */
  @Input({required: true})
  public mod!: Mod;

  /**
   * Mod side.
   *
   * @public
   * @type {string}
   */
  public side = '';

  /**
   * Icon for the {@link side mod side}.
   *
   * @public
   * @type {string}
   */
  public sideIcon = '';

  /**
   * Link to the mod picture asset.
   *
   * @public
   * @type {string}
   */
  public picture = '';

  /**
   * Link to the mod social preview asset.
   *
   * @public
   * @type {string}
   */
  public preview = '';

  /**
   * Link to the mod GitHub page.
   *
   * @public
   * @type {string}
   */
  public github = '';

  /**
   * Link to the mod Modrinth page.
   *
   * @public
   * @type {string}
   */
  public modrinth = '';

  /**
   * Link to the mod CurseForge page.
   *
   * @public
   * @type {string}
   */
  public curseforge = '';

  /**
   * Link to the mod wiki.
   *
   * @public
   * @type {string}
   */
  public wiki = '';

  /**
   * Link to the mod wiki page where how to add it as a dependency is explained.
   *
   * @public
   * @type {string}
   */
  public api = '';

  /**
   * Link to create a new mod using this mod as a template on GitHub.
   *
   * @public
   * @type {string}
   */
  public template = '';

  /**
   * Whether the description block is scrollable above.
   *
   * @public
   * @type {boolean}
   */
  public scrollableTop = false;

  /**
   * Whether the description block is scrollable below.
   *
   * @public
   * @type {boolean}
   */
  public scrollableBottom = false;

  /**
   * @inheritdoc
   *
   * @public
   * @param {TypedChanges<CardComponent>} changes
   */
  public ngOnChanges(changes: TypedChanges<CardComponent>): void {
    if (changes.mod) {
      this.side = Object.entries(this.mod).filter(([key, value]) => ['client', 'server'].includes(key) && value).map(([key]) => key.charAt(0).toUpperCase() + key.slice(1)).join(' & ');
      this.sideIcon = this.side.replace(' & ', '-').toLowerCase();
      this.picture = `https://raw.githubusercontent.com/crystal-nest/mod-fancy-assets/main/${this.mod.name}/${this.mod.name}.png`;
      this.preview = `https://raw.githubusercontent.com/crystal-nest/mod-fancy-assets/main/${this.mod.name}/social-preview.png`;
      this.github = `https://github.com/crystal-nest/${this.mod.name}`;
      this.modrinth = `https://modrinth.com/mod/${this.mod.name}`;
      this.curseforge = `https://www.curseforge.com/minecraft/mc-mods/${this.mod.name}`;
      this.wiki = `https://github.com/crystal-nest/${this.mod.name}/wiki`;
      this.api = `https://github.com/crystal-nest/${this.mod.name}/wiki/Setup#add-as-a-dependency`;
      this.template = `https://github.com/new?template_name=${this.mod.name}&template_owner=Crystal-Nest`;
    }
  }

  /**
   * @inheritdoc
   *
   * @public
   */
  public ngAfterContentChecked() {
    if (!this.scrollableTop || !this.scrollableBottom) {
      const {offsetHeight, scrollHeight, scrollTop} = this.markdownComponent.element.nativeElement;
      this.scrollableTop = scrollTop > 0;
      this.scrollableBottom = offsetHeight < scrollHeight && scrollTop !== (scrollHeight - offsetHeight);
    }
  }

  /**
   * Checks whether the target element has been scrolled to the bottom and is thus no longer scrollable.
   *
   * @public
   * @param {Event} event
   */
  public checkScrolledToBottom(event: Event) {
    if (event.type === 'scroll' && event.target instanceof HTMLElement) {
      if (event.target.scrollTop === 0) {
        this.scrollableTop = false;
      } else if (event.target.scrollTop === (event.target.scrollHeight - event.target.offsetHeight)) {
        this.scrollableBottom = false;
      }
    }
  }

  /**
   * Formats the given loaders with proper capitalization.
   *
   * @public
   * @param {Lowercase<ModLoader>[]} loaders
   * @returns {ModLoader[]}
   */
  public formatLoaders(loaders: Lowercase<ModLoader>[]): ModLoader[] {
    return loaders.map(formatLoader);
  }
}
