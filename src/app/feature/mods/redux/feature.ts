import {createFeature, createReducer, on} from '@ngrx/store';

import {saveFilteredMods, saveMods} from './actions';
import {Mod} from '../model/mod.interface';

export interface State {
  mods: Mod[] | null;
  filteredMods: Mod[] | null;
}

export const INITIAL_STATE: State = {
  mods: null,
  filteredMods: null
};

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
