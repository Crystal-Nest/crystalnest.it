import {ProgressBarMode} from '@angular/material/progress-bar';
import {createFeature, createReducer, createSelector, on} from '@ngrx/store';

import {decrementCallCounter, incrementCallCounter, saveLoadingType, saveProgress} from './actions';

/**
 * Core store.
 *
 * @export
 * @interface State
 * @typedef {State}
 */
export interface State {
  callCounter: number;
  loadingType: ProgressBarMode;
  progress: number;
}

/**
 * Core store initial state.
 *
 * @type {State}
 */
export const INITIAL_STATE: State = {
  callCounter: 0,
  loadingType: 'query',
  progress: -1
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
      const callCounter = state.callCounter - 1;
      if (callCounter > 0) {
        return {
          ...state,
          callCounter
        };
      }
      return {
        ...state,
        callCounter,
        progress: -1,
        loadingType: 'query' as ProgressBarMode
      };
    }),
    on(saveLoadingType, (state, {loadingType}) => ({
      ...state,
      loadingType: state.callCounter > 0 && state.loadingType === 'determinate' ? 'determinate' : loadingType
    })),
    on(saveProgress, (state, {progress}) => ({
      ...state,
      progress
    }))
  ),
  extraSelectors: ({selectCallCounter}) => ({
    selectLoading: createSelector(selectCallCounter, state => state > 0)
  })
});
