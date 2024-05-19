import {Routes} from '@angular/router';
import {provideEffects} from '@ngrx/effects';
import {provideState} from '@ngrx/store';

import {ROUTE} from './core/model/route.enum';
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
    loadComponent: () => import('~cn/feature/generator/generator.component').then(m => m.GeneratorComponent)
  },
  // TODO: Create versioning page.
  {
    path: ROUTE.VERSIONING,
    loadComponent: () => import('~cn/feature/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: ROUTE.MODS,
    loadComponent: () => import('~cn/feature/mods/mods.component').then(m => m.ModsComponent),
    providers: [provideState(modsFeature), ModsService, provideEffects(ModsEffects)]
  },
  {
    path: '**',
    loadComponent: () => import('~cn/feature/home/home.component').then(m => m.HomeComponent)
    // TODO: Create 404 page.
  }
];
