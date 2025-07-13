"use strict";
exports.__esModule = true;
exports.appConfig = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var token_interceptor_1 = require("./interceptors/token.interceptor");
var app_routes_1 = require("./app.routes");
var form_field_1 = require("@angular/material/form-field");
exports.appConfig = {
    providers: [
        core_1.provideZoneChangeDetection({ eventCoalescing: true }),
        router_1.provideRouter(app_routes_1.routes),
        http_1.provideHttpClient(http_1.withInterceptors([token_interceptor_1.tokenInterceptor])),
        {
            provide: http_1.HTTP_INTERCEPTORS,
            useFactory: token_interceptor_1.tokenInterceptor,
            multi: true
        },
        {
            provide: form_field_1.MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline', subscriptSizing: 'dynamic' }
        },
    ]
};
