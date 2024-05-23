import {createFeature, createReducer, on} from '@ngrx/store';

import {filterMods, saveFilteredMods, saveMods} from './actions';
import {Mod} from '../model/mod.interface';
import {ModsForm} from '../model/mods-form.interface';

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
  /**
   * Form persistance data.
   *
   * @type {ModsForm | null}
   */
  form: ModsForm | null;
}

/**
 * Mods store initial state.
 *
 * @type {State}
 */
export const INITIAL_STATE: State = {
  mods: null,
  filteredMods: null,
  form: null
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
    })),
    on(filterMods, (state, form) => ({
      ...state,
      form
    }))
  )
});
