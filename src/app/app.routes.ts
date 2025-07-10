import { Routes } from '@angular/router';
import { PublicComponent } from './pages/publicLayout/public/public.component';
import { HomepageComponent } from './pages/publicLayout/homepage/homepage.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    pathMatch: 'full',
    children: [
      {
        path: '',
        component: HomepageComponent,
        pathMatch: 'full',
      },
    ],
  },
];
