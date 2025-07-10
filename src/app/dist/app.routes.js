"use strict";
exports.__esModule = true;
exports.routes = void 0;
exports.routes = [
    {
        path: 'admin/confessions/:id',
        loadComponent: function () {
            return Promise.resolve().then(function () { return require('../app/pages/Admin/confession-details/confession-details.component'); }).then(function (module) { return module.ConfessionDetailsComponent; });
        }
    },
    {
        path: 'admin/confessions',
        loadComponent: function () {
            return Promise.resolve().then(function () { return require('../app/pages/Admin/confessions-list/confessions-list.component'); }).then(function (module) { return module.ConfessionsListComponent; });
        }
    },
];
