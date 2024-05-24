import {createFeature, createReducer, on} from '@ngrx/store';

import {saveForm, saveTemplateAndForm, saveTemplateMinecraftVersions} from './actions';
import {SkeletonForm} from '../model/skeleton-form.interface';

import {MinecraftVersion} from '~cn/core/model/minecraft-version.type';

/**
 * Generator store.
 *
 * @export
 * @interface State
 * @typedef {State}
 */
export interface State {
  minecraftVersions: Record<MinecraftVersion, MinecraftVersion>;
  template: ArrayBuffer | null;
  form: SkeletonForm | null;
}

/**
 * Generator store initial state.
 *
 * @type {State}
 */
export const INITIAL_STATE: State = {
  minecraftVersions: {},
  template: null,
  form: null
};

/**
 * Generator store feature.
 */
export const generatorFeature = createFeature({
  name: 'generator',
  reducer: createReducer(
    INITIAL_STATE,
    on(saveTemplateMinecraftVersions, (state, {minecraftVersions}) => ({
      ...state,
      minecraftVersions
    })),
    on(saveTemplateAndForm, (state, {template, form}) => ({
      ...state,
      template,
      form
    })),
    on(saveForm, (state, {form}) => ({
      ...state,
      form
    }))
  )
});
