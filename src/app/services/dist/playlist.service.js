"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PlaylistService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var PlaylistService = /** @class */ (function () {
    function PlaylistService(apiService) {
        this.apiService = apiService;
    }
    PlaylistService.prototype.getAllPlaylists = function () {
        return this.apiService
            .getAllPlaylists()
            .pipe(rxjs_1.map(function (response) { return response.data.data; }));
    };
    PlaylistService.prototype.getPlaylistById = function (id) {
        return this.apiService.getPlaylist(id);
    };
    PlaylistService.prototype.createPlaylist = function (playlist) {
        return this.apiService.postPlaylist(playlist);
    };
    PlaylistService.prototype.updatePlaylist = function (playlistId, data) {
        return this.apiService.updatePlaylist(playlistId, data);
    };
    PlaylistService.prototype.addEpisodesToPlaylist = function (playlistId, episodeIds) {
        return this.apiService.addEpisode(playlistId, episodeIds);
    };
    PlaylistService.prototype.deletePlaylist = function (playlistId) {
        return this.apiService.deletePlaylist(playlistId);
    };
    PlaylistService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PlaylistService);
    return PlaylistService;
}());
exports.PlaylistService = PlaylistService;
