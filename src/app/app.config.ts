import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideRouter} from '@angular/router';

import {ROOT_ROUTES} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(ROOT_ROUTES),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(HttpClientJsonpModule),
    provideAnimationsAsync()
  ]
};
