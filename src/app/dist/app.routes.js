"use strict";
exports.__esModule = true;
exports.routes = void 0;
var public_component_1 = require("./pages/publicLayout/public/public.component");
var homepage_component_1 = require("./pages/publicLayout/homepage/homepage.component");
var playlists_component_1 = require("./pages/publicLayout/playlists/playlists.component");
var episodes_component_1 = require("./pages/publicLayout/episodes/episodes.component");
var confessions_component_1 = require("./pages/publicLayout/confessions/confessions.component");
var page_not_found_component_1 = require("./pages/publicLayout/page-not-found/page-not-found.component");
var episode_view_component_1 = require("./pages/publicLayout/episode-view/episode-view.component");
var auth_guard_1 = require("./guards/auth.guard");
exports.routes = [
    {
        path: '',
        redirectTo: 'public',
        pathMatch: 'full'
    },
    {
        path: 'public',
        component: public_component_1.PublicComponent,
        pathMatch: 'full',
        children: [
            {
                path: '',
                component: homepage_component_1.HomepageComponent,
                pathMatch: 'full'
            },
        ]
    },
    {
        path: 'public/playlists',
        component: playlists_component_1.PlaylistsComponent,
        pathMatch: 'full'
    },
    {
        path: 'public/episodes',
        component: episodes_component_1.EpisodesComponent
    },
    {
        path: 'public/confessions',
        component: confessions_component_1.ConfessionsComponent
    },
    {
        path: 'public/episode/:id',
        component: episode_view_component_1.EpisodeViewComponent
    },
    {
        path: 'admin/login',
        loadComponent: function () {
            return Promise.resolve().then(function () { return require('../app/components/Admin/login/login.component'); }).then(function (module) { return module.LoginComponent; });
        }
    },
    {
        path: 'admin/register',
        loadComponent: function () {
            return Promise.resolve().then(function () { return require('../app/components/Admin/register/register.component'); }).then(function (module) { return module.RegisterComponent; });
        }
    },
    {
        path: 'admin/confessions',
        loadComponent: function () {
            return Promise.resolve().then(function () { return require('../app/pages/Admin/confessions-list/confessions-list.component'); }).then(function (module) { return module.ConfessionsListComponent; });
        },
        canActivate: [auth_guard_1.authGuard]
    },
    {
        path: 'admin/confessions/:id',
        loadComponent: function () {
            return Promise.resolve().then(function () { return require('../app/pages/Admin/confession-details/confession-details.component'); }).then(function (module) { return module.ConfessionDetailsComponent; });
        },
        canActivate: [auth_guard_1.authGuard]
    },
    {
        path: 'admin/playlists',
        loadComponent: function () {
            return Promise.resolve().then(function () { return require('../app/pages/Admin/playlists/playlists.component'); }).then(function (module) { return module.PlaylistsComponent; });
        },
        canActivate: [auth_guard_1.authGuard]
    },
    {
        path: 'admin/playlists/:id',
        loadComponent: function () {
            return Promise.resolve().then(function () { return require('../app/components/Admin/playlistdetails/playlistdetails.component'); }).then(function (module) { return module.PlaylistdetailsComponent; });
        },
        canActivate: [auth_guard_1.authGuard]
    },
    {
        path: 'admin/team',
        loadComponent: function () {
            return Promise.resolve().then(function () { return require('../app/components/Admin/team-list/team-list.component'); }).then(function (module) { return module.TeamListComponent; });
        },
        canActivate: [auth_guard_1.authGuard]
    },
    {
        path: 'admin/team/new',
        loadComponent: function () {
            return Promise.resolve().then(function () { return require('../app/components/Admin/team-form/team-form.component'); }).then(function (module) { return module.TeamFormComponent; });
        }
    },
    {
        path: 'admin/team/:id/edit',
        loadComponent: function () {
            return Promise.resolve().then(function () { return require('../app/components/Admin/team-form/team-form.component'); }).then(function (module) { return module.TeamFormComponent; });
        },
        canActivate: [auth_guard_1.authGuard]
    },
    {
        path: '**',
        component: page_not_found_component_1.PageNotFoundComponent
    },
];
