import {Routes} from '@angular/router';

export const ROOT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'generator',
    loadComponent: () => import('./features/generator/generator.component').then(m => m.GeneratorComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
    // TODO: Create 404 page.
  }
];
