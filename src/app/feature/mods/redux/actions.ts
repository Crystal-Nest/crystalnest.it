import {createAction, props} from '@ngrx/store';

import {Mod} from '../model/mod.interface';
import {ModsForm} from '../model/mods-form.interface';

export const retrieveMods = createAction('[Mods] Retrieve mods');

export const saveMods = createAction('[Mods] Save mods', props<{mods: Mod[]}>());

export const filterMods = createAction('[Mods] Filter mods', props<ModsForm>());

export const saveFilteredMods = createAction('[Mods] Save filtered mods', props<{filteredMods: Mod[]}>());
