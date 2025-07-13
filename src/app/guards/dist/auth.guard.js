"use strict";
exports.__esModule = true;
exports.authGuard = void 0;
var auth_service_1 = require("../services/auth.service");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
exports.authGuard = function (route, state) {
    var authService = core_1.inject(auth_service_1.AuthService);
    var router = core_1.inject(router_1.Router);
    return authService.isloggedIn$.pipe(rxjs_1.take(1), rxjs_1.map(function (isAuthenticated) {
        if (!isAuthenticated) {
            router.navigate(['/admin/login']);
            return false;
        }
        return true;
    }));
};
