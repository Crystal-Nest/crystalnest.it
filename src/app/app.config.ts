import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideRouter} from '@angular/router';
import {NG_SCROLLBAR_OPTIONS} from 'ngx-scrollbar';

import {ROOT_ROUTES} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(ROOT_ROUTES),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(HttpClientJsonpModule),
    provideAnimationsAsync(),
    {
      provide: NG_SCROLLBAR_OPTIONS,
      useValue: {
        track: 'vertical',
        trackClass: 'cn-scrollbar-track',
        thumbClass: 'cn-scrollbar-thumb'
      }
    }
  ]
};
