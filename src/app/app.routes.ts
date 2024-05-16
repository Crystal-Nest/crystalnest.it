import {Routes} from '@angular/router';

import {ROUTE} from './core/model/route.enum';

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
    loadComponent: () => import('~cn/feature/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: '**',
    loadComponent: () => import('~cn/feature/home/home.component').then(m => m.HomeComponent)
    // TODO: Create 404 page.
  }
];
