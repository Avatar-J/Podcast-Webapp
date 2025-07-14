"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApiService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var error_service_1 = require("./error.service");
var rxjs_2 = require("rxjs");
var ApiService = /** @class */ (function () {
    function ApiService() {
        this.http = core_1.inject(http_1.HttpClient);
        this.errorHandler = core_1.inject(error_service_1.ErrorService);
        this.episodesSubject = new rxjs_2.BehaviorSubject([]);
        this.episodes$ = this.episodesSubject.asObservable();
        this.baseUrl = 'https://api.rantsnconfess.com/v1';
    }
    ApiService.prototype.register = function (credentials) {
        return this.http.post(this.baseUrl + "/register", credentials).pipe(rxjs_1.retry(3), rxjs_1.catchError(function (error) {
            console.error('API Error:', error); // Debug log
            return rxjs_1.throwError(function () { return error; });
        }));
    };
    ApiService.prototype.login = function (credentials) {
        return this.http
            .post(this.baseUrl + "/login", credentials)
            .pipe(rxjs_1.retry(3));
    };
    ApiService.prototype.logout = function (token) {
        var _this = this;
        return this.http.post(this.baseUrl + "/logout", token).pipe(rxjs_1.retry(3), rxjs_1.catchError(function (err) {
            _this.errorHandler.handle(err);
            return rxjs_1.throwError(function () { return err; });
        }));
    };
    //confessions
    ApiService.prototype.getConfessions = function () {
        var _this = this;
        return this.http
            .get(this.baseUrl + "/confessions")
            .pipe(rxjs_1.retry(3), rxjs_1.catchError(function (err) {
            _this.errorHandler.handle(err);
            return rxjs_1.throwError(function () { return err; });
        }));
    };
    ApiService.prototype.postConfession = function (Confession) {
        var _this = this;
        return this.http.post(this.baseUrl + "/confessions", Confession).pipe(rxjs_1.retry(3), rxjs_1.catchError(function (err) {
            _this.errorHandler.handle(err);
            return rxjs_1.throwError(function () { return err; });
        }));
    };
    ApiService.prototype.getSingleConfession = function (id) {
        var _this = this;
        return this.http
            .get(this.baseUrl + "/confessions/" + id)
            .pipe(rxjs_1.retry(3), rxjs_1.catchError(function (err) {
            _this.errorHandler.handle(err);
            return rxjs_1.throwError(function () { return err; });
        }));
    };
    ApiService.prototype.deleteConfession = function (id) {
        var _this = this;
        return this.http["delete"](this.baseUrl + "/confessions/" + id).pipe(rxjs_1.retry(3), rxjs_1.catchError(function (err) {
            _this.errorHandler.handle(err);
            return rxjs_1.throwError(function () { return err; });
        }));
    };
    ApiService.prototype.patchConfession = function (id, confession) {
        var _this = this;
        return this.http
            .patch(this.baseUrl + "/confessions/" + id, confession)
            .pipe(rxjs_1.retry(3), rxjs_1.catchError(function (err) {
            _this.errorHandler.handle(err);
            return rxjs_1.throwError(function () { return err; });
        }));
    };
    //playlist apicalls
    ApiService.prototype.getAllPlaylists = function () {
        var _this = this;
        return this.http.get(this.baseUrl + "/playlists").pipe(rxjs_1.retry(3), rxjs_1.catchError(function (err) {
            _this.errorHandler.handle(err);
            return rxjs_1.throwError(function () { return err; });
        }));
    };
    ApiService.prototype.postPlaylist = function (playlist) {
        var _this = this;
        return this.http
            .post(this.baseUrl + "/playlists", playlist)
            .pipe(rxjs_1.retry(3), rxjs_1.catchError(function (err) {
            _this.errorHandler.handle(err);
            return rxjs_1.throwError(function () { return err; });
        }));
    };
    ApiService.prototype.addEpisode = function (playlistId, episodeIds) {
        // Create proper request body format
        var body = {
            episode_ids: episodeIds
        };
        return this.http
            .post(this.baseUrl + "/playlists/" + playlistId + "/episodes", body)
            .pipe(rxjs_1.catchError(function (err) {
            // Enhance error information
            if (err.status === 422) {
                err.error.server_validation_errors = err.error.errors;
            }
            return rxjs_1.throwError(function () { return err; });
        }));
    };
    ApiService.prototype.getPlaylist = function (id) {
        var _this = this;
        return this.http.get(this.baseUrl + "/playlists/" + id).pipe(rxjs_1.retry(3), rxjs_1.catchError(function (err) {
            _this.errorHandler.handle(err);
            return rxjs_1.throwError(function () { return err; });
        }));
    };
    // playlist.service.ts
    ApiService.prototype.updatePlaylist = function (playlistId, data) {
        return this.http
            .patch(this.baseUrl + "/playlists/" + playlistId, data)
            .pipe(rxjs_1.catchError(function (error) {
            // Enhance error information
            return rxjs_1.throwError(function () { return error; });
        }));
    };
    ApiService.prototype.deletePlaylist = function (playlistId) {
        return this.http["delete"](this.baseUrl + "/playlists/" + playlistId).pipe(rxjs_1.catchError(function (error) {
            return rxjs_1.throwError(function () { return error; });
        }));
    };
    ApiService.prototype.getAllEpisodes = function () {
        var _this = this;
        return this.http.get(this.baseUrl + "/episodes").pipe(rxjs_1.retry(3), rxjs_1.catchError(function (err) {
            _this.errorHandler.handle(err);
            return rxjs_1.throwError(function () { return err; });
        }), rxjs_2.tap(function (episodes) {
            _this.episodesSubject.next(episodes.data);
        }));
    };
    ApiService.prototype.getAllTeam = function () {
        var _this = this;
        return this.http
            .get(this.baseUrl + "/team-members")
            .pipe(rxjs_1.retry(3), rxjs_1.catchError(function (err) {
            _this.errorHandler.handle(err);
            return rxjs_1.throwError(function () { return err; });
        }));
    };
    ApiService.prototype.getTeamMember = function (id) {
        var _this = this;
        return this.http
            .get(this.baseUrl + "/team-members/" + id)
            .pipe(rxjs_1.retry(3), rxjs_1.catchError(function (err) {
            _this.errorHandler.handle(err);
            return rxjs_1.throwError(function () { return err; });
        }));
    };
    ApiService.prototype.createTeamMember = function (teamMember) {
        var _this = this;
        return this.http
            .post(this.baseUrl + "/team-members", teamMember)
            .pipe(rxjs_1.retry(3), rxjs_1.catchError(function (err) {
            _this.errorHandler.handle(err);
            return rxjs_1.throwError(function () { return err; });
        }));
    };
    ApiService.prototype.updateTeamMember = function (id, teamMember) {
        var _this = this;
        return this.http
            .patch(this.baseUrl + "/team-members/" + id, teamMember)
            .pipe(rxjs_1.retry(3), rxjs_1.catchError(function (err) {
            _this.errorHandler.handle(err);
            return rxjs_1.throwError(function () { return err; });
        }));
    };
    ApiService.prototype.deleteTeamMember = function (id) {
        var _this = this;
        return this.http["delete"](this.baseUrl + "/team-members/" + id)
            .pipe(rxjs_1.retry(3), rxjs_1.catchError(function (err) {
            _this.errorHandler.handle(err);
            return rxjs_1.throwError(function () { return err; });
        }));
    };
    ApiService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
