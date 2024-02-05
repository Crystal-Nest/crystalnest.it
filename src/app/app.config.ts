import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {ROOT_ROUTES} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(ROOT_ROUTES)]
};
