import { Routes } from '@angular/router';

export const ROOT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./feature/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'generator',
    loadComponent: () => import('./feature/generator/generator.component').then((m) => m.GeneratorComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./feature/home/home.component').then((m) => m.HomeComponent),
    // TODO: Create 404 page.
  },
];
