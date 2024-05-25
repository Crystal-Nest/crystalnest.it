import {createFeature, createReducer, createSelector, on} from '@ngrx/store';

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
  /**
   * Available mod template Minecraft versions.
   *
   * @type {Record<MinecraftVersion, MinecraftVersion>}
   */
  minecraftVersions: Record<MinecraftVersion, MinecraftVersion>;
  /**
   * Template cache.
   *
   * @type {Record<MinecraftVersion, ArrayBuffer>}
   */
  templates: Record<MinecraftVersion, ArrayBuffer>;
  /**
   * Latest submitted form for persistance.
   *
   * @type {SkeletonForm | null}
   */
  form: SkeletonForm | null;
}

/**
 * Generator store initial state.
 *
 * @type {State}
 */
export const INITIAL_STATE: State = {
  minecraftVersions: {},
  templates: {},
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
      templates: {
        ...state.templates,
        [form.minecraftVersion]: template
      },
      form
    })),
    on(saveForm, (state, {form}) => ({
      ...state,
      form
    }))
  ),
  extraSelectors: ({selectTemplates}) => ({
    selectTemplate: (version: MinecraftVersion) => createSelector(selectTemplates, state => state[version])
  })
});
