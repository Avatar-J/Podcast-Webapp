import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin/confessions/:id',
    loadComponent: () =>
      import(
        '../app/pages/Admin/confession-details/confession-details.component'
      ).then((module) => module.ConfessionDetailsComponent),
  },
  {
    path: 'admin/confessions',
    loadComponent: () =>
      import(
        '../app/pages/Admin/confessions-list/confessions-list.component'
      ).then((module) => module.ConfessionsListComponent),
  },
];
