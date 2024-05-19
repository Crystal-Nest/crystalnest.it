import {HttpClientModule} from '@angular/common/http';
import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideRouter} from '@angular/router';
import {provideStore} from '@ngrx/store';
import {MARKED_OPTIONS, provideMarkdown} from 'ngx-markdown';

import {ROOT_ROUTES} from './app.routes';

/**
 * Application configuration.
 *
 * @type {ApplicationConfig}
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(ROOT_ROUTES),
    provideStore(),
    importProvidersFrom(HttpClientModule),
    provideAnimationsAsync(),
    provideMarkdown({
      markedOptions: {
        provide: MARKED_OPTIONS,
        useValue: {
          gfm: true,
          breaks: false
        }
      }
    })
  ]
};
