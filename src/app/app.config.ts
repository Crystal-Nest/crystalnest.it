import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideRouter} from '@angular/router';
import {provideEffects} from '@ngrx/effects';
import {provideState, provideStore} from '@ngrx/store';
import {MARKED_OPTIONS, provideMarkdown} from 'ngx-markdown';

import {ROOT_ROUTES} from './app.routes';
import {CoreEffects} from './core/redux/effects';
import {coreFeature} from './core/redux/feature';
import {Interceptor} from './core/service/interceptor.service';
import {SCROLL_TO_TOP_OPTIONS} from './shared/component/scroll-to-top/model/scroll-to-top-options.const';

/**
 * Application configuration.
 *
 * @type {ApplicationConfig}
 */
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideStore(),
    provideState(coreFeature),
    provideEffects(CoreEffects),
    provideRouter(ROOT_ROUTES),
    provideAnimationsAsync(),
    provideMarkdown({
      markedOptions: {
        provide: MARKED_OPTIONS,
        useValue: {
          gfm: true,
          breaks: false
        }
      }
    }),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic'
      }
    },
    {
      provide: SCROLL_TO_TOP_OPTIONS,
      useValue: {
        minPageHeight: 2048,
        minScrollHeight: 384
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ]
};
