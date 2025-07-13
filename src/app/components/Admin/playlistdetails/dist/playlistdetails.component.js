"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PlaylistdetailsComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var add_episodes_dialog_component_1 = require("../add-episodes-dialog/add-episodes-dialog.component");
var common_1 = require("@angular/common");
var icon_1 = require("@angular/material/icon");
var divider_1 = require("@angular/material/divider");
var episode_item_component_1 = require("../episode-item/episode-item.component");
var progress_bar_1 = require("@angular/material/progress-bar");
var delete_confirmation_dialog_component_1 = require("../delete-confirmation-dialog/delete-confirmation-dialog.component");
var create_playlist_dialog_component_1 = require("../create-playlist-dialog/create-playlist-dialog.component");
var menu_1 = require("@angular/material/menu");
var PlaylistdetailsComponent = /** @class */ (function () {
    function PlaylistdetailsComponent(route, playlistService, dialog, snackBar, location, router) {
        this.route = route;
        this.playlistService = playlistService;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.location = location;
        this.router = router;
        this.isLoading = true;
        this.error = null;
    }
    PlaylistdetailsComponent.prototype.ngOnInit = function () {
        this.playlistId = +this.route.snapshot.params['id'];
        this.loadPlaylist();
    };
    PlaylistdetailsComponent.prototype.loadPlaylist = function () {
        var _this = this;
        this.isLoading = true;
        this.error = null;
        this.playlistService.getPlaylistById(this.playlistId).subscribe({
            next: function (response) {
                _this.playlist = response.data;
                _this.isLoading = false;
            },
            error: function (err) {
                console.error('Failed to load playlist', err);
                _this.error = 'Failed to load playlist. Please try again.';
                _this.isLoading = false;
                _this.showErrorSnackbar();
            }
        });
    };
    PlaylistdetailsComponent.prototype.openAddEpisodesDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(add_episodes_dialog_component_1.AddEpisodesDialogComponent, {
            width: '600px',
            data: { playlistId: this.playlistId }
        });
        dialogRef.afterClosed().subscribe(function (episodeIds) {
            if (episodeIds === null || episodeIds === void 0 ? void 0 : episodeIds.length) {
                _this.addEpisodes(episodeIds);
            }
        });
    };
    PlaylistdetailsComponent.prototype.openEditDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(create_playlist_dialog_component_1.CreatePlaylistDialogComponent, {
            width: '400px',
            data: {
                name: this.playlist.name,
                description: this.playlist.description,
                playlistId: this.playlist.id
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.updatePlaylist(result);
            }
        });
    };
    PlaylistdetailsComponent.prototype.openDeleteDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(delete_confirmation_dialog_component_1.DeleteConfirmationDialogComponent, {
            width: '350px',
            data: {
                title: 'Delete Playlist',
                message: "Are you sure you want to delete \"" + this.playlist.name + "\"?"
            }
        });
        dialogRef.afterClosed().subscribe(function (confirmed) {
            if (confirmed) {
                _this.deletePlaylist();
            }
        });
    };
    PlaylistdetailsComponent.prototype.deletePlaylist = function () {
        var _this = this;
        this.isLoading = true;
        this.playlistService.deletePlaylist(this.playlistId).subscribe({
            next: function () {
                _this.snackBar.open('Playlist deleted successfully!', 'Close', {
                    duration: 3000
                });
                _this.router.navigate(['/playlists']);
            },
            error: function (err) {
                _this.isLoading = false;
                _this.snackBar.open('Failed to delete playlist', 'Close', {
                    duration: 3000,
                    panelClass: ['error-snackbar']
                });
            }
        });
    };
    PlaylistdetailsComponent.prototype.addEpisodes = function (episodeIds) {
        var _this = this;
        this.isLoading = true;
        this.playlistService
            .addEpisodesToPlaylist(this.playlistId, episodeIds)
            .subscribe({
            next: function () {
                _this.loadPlaylist();
                _this.snackBar.open('Episodes added successfully', 'Close', {
                    duration: 3000
                });
            },
            error: function (err) {
                console.error('Failed to add episodes', err);
                _this.isLoading = false;
                _this.snackBar.open('Failed to add episodes', 'Close', {
                    duration: 3000,
                    panelClass: ['error-snackbar']
                });
            }
        });
    };
    PlaylistdetailsComponent.prototype.updatePlaylist = function (updatedData) {
        var _this = this;
        this.isLoading = true;
        this.playlistService
            .updatePlaylist(updatedData.playlistId, {
            name: updatedData.name,
            description: updatedData.description
        })
            .subscribe({
            next: function () {
                _this.snackBar.open('Playlist updated successfully!', 'Close', {
                    duration: 3000
                });
                _this.loadPlaylist();
            },
            error: function (err) {
                _this.isLoading = false;
                _this.snackBar.open('Failed to update playlist', 'Close', {
                    duration: 3000,
                    panelClass: ['error-snackbar']
                });
            }
        });
    };
    PlaylistdetailsComponent.prototype.showErrorSnackbar = function () {
        var _this = this;
        this.snackBar
            .open(this.error || 'An error occurred', 'Retry', {
            duration: 5000,
            panelClass: ['error-snackbar']
        })
            .onAction()
            .subscribe(function () { return _this.retryLoading(); });
    };
    PlaylistdetailsComponent.prototype.handleImageError = function (event) {
        var imgElement = event.target;
        imgElement.src = '/default.png';
    };
    PlaylistdetailsComponent.prototype.retryLoading = function () {
        this.isLoading = true;
        this.loadPlaylist();
    };
    PlaylistdetailsComponent.prototype.goBack = function () {
        this.location.back();
    };
    PlaylistdetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-playlistdetails',
            imports: [
                common_1.CommonModule,
                icon_1.MatIcon,
                divider_1.MatDivider,
                episode_item_component_1.EpisodeItemComponent,
                progress_bar_1.MatProgressBar,
                menu_1.MatMenuModule,
                dialog_1.MatDialogModule,
            ],
            templateUrl: './playlistdetails.component.html',
            styleUrl: './playlistdetails.component.scss'
        })
    ], PlaylistdetailsComponent);
    return PlaylistdetailsComponent;
}());
exports.PlaylistdetailsComponent = PlaylistdetailsComponent;
