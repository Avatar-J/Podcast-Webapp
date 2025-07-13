"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PlaylistsComponent = void 0;
var core_1 = require("@angular/core");
var icon_1 = require("@angular/material/icon");
var playlist_card_component_1 = require("../../../components/Admin/playlist-card/playlist-card.component");
var common_1 = require("@angular/common");
var create_playlist_dialog_component_1 = require("../../../components/Admin/create-playlist-dialog/create-playlist-dialog.component");
var progress_bar_1 = require("@angular/material/progress-bar");
var PlaylistsComponent = /** @class */ (function () {
    function PlaylistsComponent(playlistService, dialog, snackBar) {
        this.playlistService = playlistService;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.playlists = [];
        this.isLoading = true;
    }
    PlaylistsComponent.prototype.ngOnInit = function () {
        this.loadPlaylists();
    };
    PlaylistsComponent.prototype.loadPlaylists = function () {
        var _this = this;
        this.isLoading = true;
        this.playlistService.getAllPlaylists().subscribe({
            next: function (playlists) {
                _this.playlists = playlists;
                _this.isLoading = false;
            },
            error: function (err) {
                console.error('Failed to load playlists', err);
                _this.isLoading = false;
            }
        });
    };
    PlaylistsComponent.prototype.openCreateDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(create_playlist_dialog_component_1.CreatePlaylistDialogComponent, {
            width: '400px',
            data: {}
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.createPlaylist(result);
            }
        });
    };
    PlaylistsComponent.prototype.createPlaylist = function (playlistData) {
        var _this = this;
        this.playlistService.createPlaylist(playlistData).subscribe({
            next: function () {
                _this.snackBar.open('Playlist created successfully!', 'Close', {
                    duration: 3000
                });
                _this.loadPlaylists();
            },
            error: function (err) {
                _this.snackBar.open('Failed to create playlist', 'Close', {
                    duration: 3000,
                    panelClass: ['error-snackbar']
                });
            }
        });
    };
    PlaylistsComponent = __decorate([
        core_1.Component({
            selector: 'app-playlists',
            imports: [playlist_card_component_1.PlaylistCardComponent, icon_1.MatIcon, progress_bar_1.MatProgressBarModule, common_1.CommonModule],
            templateUrl: './playlists.component.html',
            styleUrl: './playlists.component.scss'
        })
    ], PlaylistsComponent);
    return PlaylistsComponent;
}());
exports.PlaylistsComponent = PlaylistsComponent;
