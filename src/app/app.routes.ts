import { Routes } from '@angular/router';
import { PublicComponent } from './pages/publicLayout/public/public.component';
import { HomepageComponent } from './pages/publicLayout/homepage/homepage.component';
import { PlaylistsComponent } from './pages/publicLayout/playlists/playlists.component';
import { EpisodesComponent } from './pages/publicLayout/episodes/episodes.component';
import { ConfessionsComponent } from './pages/publicLayout/confessions/confessions.component';
import { PageNotFoundComponent } from './pages/publicLayout/page-not-found/page-not-found.component';
import { EpisodeViewComponent } from './pages/publicLayout/episode-view/episode-view.component';
import { authGuard } from './guards/auth.guard';
import { PlaylistViewComponent } from './pages/publicLayout/playlist-view/playlist-view.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full',
  },
  {
    path: 'public',
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
  {
    path: 'public/playlists',
    component: PlaylistsComponent,
    pathMatch: 'full',
  },
  {
    path: 'public/playlist/:id',
    component: PlaylistViewComponent,
    pathMatch: 'full',
  },
  {
    path: 'public/episodes',
    component: EpisodesComponent,
  },
  {
    path: 'public/confessions',
    component: ConfessionsComponent,
  },
  {
    path: 'public/episode/:id',
    component: EpisodeViewComponent,
  },
  {
    path: 'admin/login',
    loadComponent: () =>
      import('../app/components/Admin/login/login.component').then(
        (module) => module.LoginComponent
      ),
  },
  {
    path: 'admin/register',
    loadComponent: () =>
      import('../app/components/Admin/register/register.component').then(
        (module) => module.RegisterComponent
      ),
  },
  {
    path: 'admin/confessions',
    loadComponent: () =>
      import(
        '../app/pages/Admin/confessions-list/confessions-list.component'
      ).then((module) => module.ConfessionsListComponent),
    canActivate: [authGuard],
  },
  {
    path: 'admin/confessions/:id',
    loadComponent: () =>
      import(
        '../app/pages/Admin/confession-details/confession-details.component'
      ).then((module) => module.ConfessionDetailsComponent),
    canActivate: [authGuard],
  },
  {
    path: 'admin/playlists',
    loadComponent: () =>
      import('../app/pages/Admin/playlists/playlists.component').then(
        (module) => module.PlaylistsComponent
      ),
    canActivate: [authGuard],
  },

  {
    path: 'admin/playlists/:id',
    loadComponent: () =>
      import(
        '../app/components/Admin/playlistdetails/playlistdetails.component'
      ).then((module) => module.PlaylistdetailsComponent),
    canActivate: [authGuard],
  },

  {
    path: 'admin/team',
    loadComponent: () =>
      import('../app/components/Admin/team-list/team-list.component').then(
        (module) => module.TeamListComponent
      ),
    canActivate: [authGuard],
  },

  {
    path: 'admin/team/new',
    loadComponent: () =>
      import('../app/components/Admin/team-form/team-form.component').then(
        (module) => module.TeamFormComponent
      ),
  },

  {
    path: 'admin/team/:id/edit',
    loadComponent: () =>
      import('../app/components/Admin/team-form/team-form.component').then(
        (module) => module.TeamFormComponent
      ),
    canActivate: [authGuard],
  },

  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
