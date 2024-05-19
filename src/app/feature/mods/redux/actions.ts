import {createAction, props} from '@ngrx/store';

import {Mod} from '../model/mod.interface';
import {ModsForm} from '../model/mods-form.interface';

/**
 * Retrieves Crystal Nest mods.
 */
export const retrieveMods = createAction('[Mods] Retrieve mods');

/**
 * Saves the given mods in the store.
 */
export const saveMods = createAction('[Mods] Save mods', props<{mods: Mod[]}>());

/**
 * Filters the mods.
 */
export const filterMods = createAction('[Mods] Filter mods', props<ModsForm>());

/**
 * Saves the filtered mods.
 */
export const saveFilteredMods = createAction('[Mods] Save filtered mods', props<{filteredMods: Mod[]}>());
