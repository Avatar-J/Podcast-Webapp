import { Routes } from '@angular/router';
import { PublicComponent } from './pages/public/public.component';
import { HomepageComponent } from './pages/homepage/homepage.component';

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
