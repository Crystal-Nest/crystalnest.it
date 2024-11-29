import {HttpErrorResponse} from '@angular/common/http';
import {ProgressBarMode} from '@angular/material/progress-bar';
import {createFeature, createReducer, createSelector, on} from '@ngrx/store';

import {decrementCallCounter, incrementCallCounter, incrementProgress, saveError, saveLoadingType, saveProgress} from './actions';

/**
 * Core store.
 *
 * @export
 * @interface State
 * @typedef {State}
 */
export interface State {
  /**
   * Current amount of pending HTTP calls.
   *
   * @type {number}
   */
  callCounter: number;
  /**
   * Loading type.
   *
   * @type {ProgressBarMode}
   */
  loadingType: ProgressBarMode;
  /**
   * Ignored if {@link loadingType} is different from `determinate`, controls how much of the loading bar to fill.
   *
   * @type {number}
   */
  progress: number;
  error: HttpErrorResponse | null;
}

/**
 * Core store initial state.
 *
 * @type {State}
 */
export const INITIAL_STATE: State = {
  callCounter: 0,
  loadingType: 'query',
  progress: -1,
  error: null
};

/**
 * Core store feature.
 */
export const coreFeature = createFeature({
  name: 'core',
  reducer: createReducer(
    INITIAL_STATE,
    on(incrementCallCounter, state => ({
      ...state,
      callCounter: state.callCounter + 1
    })),
    on(decrementCallCounter, state => {
      if (state.callCounter > 0) {
        return {
          ...state,
          callCounter: state.callCounter - 1
        };
      }
      return {
        ...state,
        progress: -1,
        loadingType: 'query' as ProgressBarMode
      };
    }),
    on(saveLoadingType, (state, {loadingType, force}) => ({
      ...state,
      loadingType: !force && state.callCounter > 0 && state.loadingType === 'determinate' ? 'determinate' : loadingType
    })),
    on(saveProgress, (state, {progress}) => ({
      ...state,
      progress
    })),
    on(incrementProgress, (state, {increment}) => ({
      ...state,
      progress: state.progress + increment
    })),
    on(saveError, (state, {error}) => ({
      ...state,
      error
    }))
  ),
  extraSelectors: ({selectCallCounter}) => ({
    selectLoading: createSelector(selectCallCounter, state => state > 0)
  })
});
