import {AsyncPipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {filter, first} from 'rxjs';

import {ModsFormComponent} from './component/mods-form/mods-form.component';
import {Mod} from './model/mod.interface';
import {ModsForm} from './model/mods-form.interface';
import {filterMods, retrieveMods} from './redux/actions';
import {State, modsFeature} from './redux/feature';
import {ModsService} from './service/mods.service';

import {MinecraftVersion} from '~cn/core/model/minecraft-version.type';
import {CardComponent} from '~cn/shared/component/card/card.component';
import {ScrollToTopComponent} from '~cn/shared/component/scroll-to-top/scroll-to-top.component';

/**
 * Mods showcase.
 *
 * @export
 * @class ModsComponent
 * @typedef {ModsComponent}
 */
@Component({
  selector: 'cn-mods',
  standalone: true,
  imports: [
    AsyncPipe,
    HttpClientModule,
    ModsFormComponent,
    CardComponent,
    ScrollToTopComponent
  ],
  providers: [ModsService],
  templateUrl: './mods.component.html',
  styleUrl: './mods.component.scss'
})
export class ModsComponent {
  /**
   * List of mods.
   *
   * @public
   * @readonly
   * @type {Observable<Mod[] | null>}
   */
  public readonly mods$ = this.store$.select(modsFeature.selectFilteredMods);

  /**
   * Available Minecraft versions.
   *
   * @public
   * @type {Record<MinecraftVersion, MinecraftVersion>}
   */
  public minecraftVersions: Record<MinecraftVersion, MinecraftVersion> = {};

  /**
   * @constructor
   * @public
   * @param {Store<State>} store$
   */
  public constructor(private readonly store$: Store<State>) {
    this.store$.dispatch(retrieveMods());
    this.mods$.pipe(filter(mods => !!mods), first()).subscribe(mods => (this.minecraftVersions = this.extractMinecraftVersions(mods)));
  }

  /**
   * Starts the flow to filter the list of mods.
   *
   * @public
   * @param {ModsForm} form
   */
  public filter(form: ModsForm) {
    this.store$.dispatch(filterMods(form));
  }

  /**
   * Extracts the record of all Minecraft versions supported by at least 1 mod.
   *
   * @public
   * @param {Mod[] | null} mods
   * @returns {Record<MinecraftVersion, MinecraftVersion>}
   */
  public extractMinecraftVersions(mods: Mod[] | null) {
    const minecraftVersions: Record<MinecraftVersion, MinecraftVersion> = {};
    for (const {versions} of mods || []) {
      for (const version of versions) {
        if (!(version in minecraftVersions)) {
          minecraftVersions[version] = version;
        }
      }
    }
    return Object.keys(minecraftVersions).sort().reverse().reduce((prev, curr) => ({
      ...prev,
      [curr]: minecraftVersions[curr as MinecraftVersion]
    }), {});
  }
}
