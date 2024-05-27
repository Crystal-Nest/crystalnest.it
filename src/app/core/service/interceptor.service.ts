import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, catchError, filter, of, tap} from 'rxjs';

import {decrementCallCounter, incrementCallCounter, saveError, saveLoadingType, saveProgress} from '../redux/actions';
import {State} from '../redux/feature';

/**
 * HTTP interceptor.
 *
 * @export
 * @class Interceptor
 * @typedef {Interceptor}
 * @implements {HttpInterceptor}
 */
@Injectable()
export class Interceptor implements HttpInterceptor {
  /**
   * @constructor
   * @public
   * @param {Store<State>} store$
   */
  public constructor(private readonly store$: Store<State>) {}

  /**
   * Intercepts any HTTP call and handles loading and errors.
   *
   * @public
   * @param {HttpRequest<unknown>} request
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<unknown>>}
   */
  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.store$.dispatch(incrementCallCounter());
    return next.handle(request).pipe(
      tap<HttpEvent<unknown>>(event => {
        switch (event.type) {
          case HttpEventType.Sent:
            this.store$.dispatch(saveLoadingType({loadingType: 'indeterminate'}));
            break;
          case HttpEventType.UploadProgress:
          case HttpEventType.DownloadProgress:
            this.store$.dispatch(saveLoadingType({loadingType: event.total ? 'determinate' : 'indeterminate'}));
            this.store$.dispatch(saveProgress({progress: event.total ? event.loaded / event.total * 100 : -1}));
            break;
        }
      }),
      filter(event => event.type === HttpEventType.Response),
      tap<HttpEvent<unknown>>(() => this.store$.dispatch(decrementCallCounter())),
      catchError(error => {
        this.store$.dispatch(decrementCallCounter());
        this.store$.dispatch(saveError({error}));
        return of();
      })
    );
  }
}
