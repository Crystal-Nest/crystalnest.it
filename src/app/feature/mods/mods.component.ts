import {AsyncPipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {Component} from '@angular/core';
import {Store} from '@ngrx/store';

import {ModsFormComponent} from './component/mods-form/mods-form.component';
import {ModsForm} from './model/mods-form.interface';
import {filterMods, retrieveMods} from './redux/actions';
import {State, modsFeature} from './redux/feature';
import {ModsService} from './service/mods.service';

import {CardComponent} from '~cn/shared/component/card/card.component';

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
    CardComponent
  ],
  providers: [ModsService],
  templateUrl: './mods.component.html',
  styleUrl: './mods.component.scss'
})
export class ModsComponent {
  public readonly mods$ = this.store$.select(modsFeature.selectFilteredMods);

  /**
   * @constructor
   * @public
   * @param {Store<State>} store$
   */
  public constructor(private readonly store$: Store<State>) {
    this.store$.dispatch(retrieveMods());
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
}
