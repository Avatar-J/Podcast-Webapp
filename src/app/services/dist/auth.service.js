"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var api_service_1 = require("./api.service");
var error_service_1 = require("./error.service");
var router_1 = require("@angular/router");
var AuthService = /** @class */ (function () {
    function AuthService() {
        this.http = core_1.inject(http_1.HttpClient);
        this.api = core_1.inject(api_service_1.ApiService);
        this.errorHandler = core_1.inject(error_service_1.ErrorService);
        this.router = core_1.inject(router_1.Router);
        this.tokenKey = 'auth_token';
        this.isLoggedInSubject = new rxjs_1.BehaviorSubject(this.hasToken());
        this.isloggedIn$ = this.isLoggedInSubject.asObservable();
    }
    AuthService.prototype.hasToken = function () {
        return !!localStorage.getItem(this.tokenKey);
    };
    AuthService.prototype.getToken = function () {
        return localStorage.getItem(this.tokenKey);
    };
    AuthService.prototype.register = function (credentials) {
        return this.api.register(credentials).pipe(rxjs_1.retry(3));
    };
    AuthService.prototype.login = function (credentials) {
        var _this = this;
        return this.api.login(credentials).pipe(rxjs_1.tap(function (response) {
            var _a;
            var token = (_a = response.data) === null || _a === void 0 ? void 0 : _a.token;
            if (token) {
                localStorage.setItem(_this.tokenKey, token);
                _this.isLoggedInSubject.next(true);
                _this.router.navigate(['/admin/confessions']);
            }
        }), rxjs_1.catchError(function (error) {
            _this.isLoggedInSubject.next(false);
            var errorMessage = 'Login failed. Please try again.';
            if (error.status === 401) {
                errorMessage = 'Invalid email or password.';
            }
            return rxjs_1.throwError(function () { return new Error(errorMessage); });
        }));
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem(this.tokenKey);
        this.isLoggedInSubject.next(false);
        this.router.navigate(['/admin/login']);
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
