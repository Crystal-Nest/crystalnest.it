import {createAction, props} from '@ngrx/store';

import {SkeletonForm} from '../model/skeleton-form.interface';

import {MinecraftVersion} from '~cn/core/model/minecraft-version.type';

/**
 * Retrieves the available Minecraft version for the mod template.
 */
export const retrieveTemplateMinecraftVersions = createAction('[Generator] Retrieve template Minecraft versions');

/**
 * Saves the available Minecraft version for the mod template.
 */
export const saveTemplateMinecraftVersions = createAction('[Generator] Save template Minecraft versions', props<{minecraftVersions: Record<MinecraftVersion, MinecraftVersion>}>());

/**
 * Generates and downloads a mod.
 */
export const generateMod = createAction('[Generator] Generate mod', props<SkeletonForm>());

/**
 * Saves the mod template and the form data.
 */
export const saveTemplateAndForm = createAction('[Generator] Save template and form', props<{template: ArrayBuffer; form: SkeletonForm}>());

/**
 * Saves the form data.
 */
export const saveForm = createAction('[Generator] Save form', props<{form: SkeletonForm}>());

/**
 * Generates and downloads a mod, effects internal use.
 */
export const buildMod = createAction('[Generator] Build mod', props<{template: ArrayBuffer; form: SkeletonForm}>());
