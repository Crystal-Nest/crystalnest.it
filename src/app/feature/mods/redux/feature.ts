import {createFeature, createReducer, on} from '@ngrx/store';

import {saveFilteredMods, saveMods} from './actions';
import {Mod} from '../model/mod.interface';

/**
 * Mods store.
 *
 * @export
 * @interface State
 * @typedef {State}
 */
export interface State {
  /**
   * List of all mods.
   *
   * @type {Mod[] | null}
   */
  mods: Mod[] | null;
  /**
   * List of filtered mods.
   *
   * @type {Mod[] | null}
   */
  filteredMods: Mod[] | null;
}

/**
 * Mods store initial state.
 *
 * @type {State}
 */
export const INITIAL_STATE: State = {
  mods: null,
  filteredMods: null
};

/**
 * Mods store feature.
 */
export const modsFeature = createFeature({
  name: 'mods',
  reducer: createReducer(
    INITIAL_STATE,
    on(saveMods, (state, {mods}) => ({
      ...state,
      mods,
      filteredMods: mods
    })),
    on(saveFilteredMods, (state, {filteredMods}) => ({
      ...state,
      filteredMods
    }))
  )
});
