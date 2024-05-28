import {HttpErrorResponse} from '@angular/common/http';
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

/**
 * Starts the download flow for the given `file`.
 */
export const download = createAction('[Core] Download', props<{file: Blob; id: string}>());

/**
 * Saves the HTTP error.
 */
export const saveError = createAction('[Core] Save error', props<{error: HttpErrorResponse | null}>());

/**
 * Opens a new tab with a precompiled issue.
 */
export const openIssue = createAction('[Core] Open issue', props<{title: string; body: string}>());
