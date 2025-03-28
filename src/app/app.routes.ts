import {Routes} from '@angular/router';
import {provideEffects} from '@ngrx/effects';
import {provideState} from '@ngrx/store';

import {ROUTE} from './core/model/route.enum';
import {GeneratorEffects} from './feature/generator/redux/effects';
import {generatorFeature} from './feature/generator/redux/feature';
import {LicenseService} from './feature/generator/service/license.service';
import {TemplateService} from './feature/generator/service/template.service';
import {ModsEffects} from './feature/mods/redux/effects';
import {modsFeature} from './feature/mods/redux/feature';
import {ModsService} from './feature/mods/service/mods.service';

/**
 * Application routes.
 *
 * @type {Routes}
 */
export const ROOT_ROUTES: Routes = [
  {
    path: ROUTE.HOME,
    loadComponent: () => import('~cn/feature/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: ROUTE.GENERATOR,
    loadComponent: () => import('~cn/feature/generator/generator.component').then(m => m.GeneratorComponent),
    providers: [
      provideState(generatorFeature),
      TemplateService,
      LicenseService,
      provideEffects(GeneratorEffects)
    ]
  },
  {
    path: ROUTE.VERSIONING,
    loadComponent: () => import('~cn/feature/versioning/versioning.component').then(m => m.VersioningComponent)
  },
  {
    path: ROUTE.MODS,
    loadComponent: () => import('~cn/feature/mods/mods.component').then(m => m.ModsComponent),
    providers: [provideState(modsFeature), ModsService, provideEffects(ModsEffects)]
  },
  {
    path: '**',
    loadComponent: () => import('~cn/feature/error/error.component').then(m => m.ErrorComponent)
  }
];
