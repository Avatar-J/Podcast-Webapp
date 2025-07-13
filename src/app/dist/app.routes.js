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
        path: 'admin/confessions',
        loadComponent: function () {
            return Promise.resolve().then(function () { return require('../app/pages/Admin/confessions-list/confessions-list.component'); }).then(function (module) { return module.ConfessionsListComponent; });
        }
    },
    {
        path: 'admin/confessions/:id',
        loadComponent: function () {
            return Promise.resolve().then(function () { return require('../app/pages/Admin/confession-details/confession-details.component'); }).then(function (module) { return module.ConfessionDetailsComponent; });
        }
    },
    {
        path: 'admin/playlists',
        loadComponent: function () {
            return Promise.resolve().then(function () { return require('../app/pages/Admin/playlists/playlists.component'); }).then(function (module) { return module.PlaylistsComponent; });
        }
    },
    {
        path: 'admin/playlists/:id',
        loadComponent: function () {
            return Promise.resolve().then(function () { return require('../app/components/Admin/playlistdetails/playlistdetails.component'); }).then(function (module) { return module.PlaylistdetailsComponent; });
        }
    },
    {
        path: '**',
        component: page_not_found_component_1.PageNotFoundComponent
    },
];
