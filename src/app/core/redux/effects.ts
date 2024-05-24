import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {Store} from '@ngrx/store';

import {State} from './feature';

/**
 * Core effects.
 *
 * @export
 * @class CoreEffects
 * @typedef {CoreEffects}
 */
@Injectable()
export class CoreEffects {
  /**
   * @constructor
   * @public
   * @param {Actions} actions$
   * @param {Store<State>} store$
   */
  public constructor(private readonly actions$: Actions, private readonly store$: Store<State>) {}
}
