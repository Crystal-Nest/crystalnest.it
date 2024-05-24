import {ProgressBarMode} from '@angular/material/progress-bar';
import {createAction, props} from '@ngrx/store';

/**
 * Increments the counter for pending HTTP calls.
 */
export const incrementCallCounter = createAction('[Core] Increment call counter');

/**
 * Decrements the counter for pending HTTP calls.
 */
export const decrementCallCounter = createAction('[Core] Decrement call counter');

/**
 * Saves the loading type.
 */
export const saveLoadingType = createAction('[Core] Save loading type', props<{loadingType: ProgressBarMode; force?: boolean}>());

/**
 * Saves the progress.
 */
export const saveProgress = createAction('[Core] Save progress', props<{progress: number}>());

/**
 * Increments the progress.
 */
export const incrementProgress = createAction('[Core] Increment progress', props<{increment: number}>());