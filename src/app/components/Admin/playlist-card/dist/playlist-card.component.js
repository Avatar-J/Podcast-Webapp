"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.PlaylistCardComponent = void 0;
var core_1 = require("@angular/core");
var card_1 = require("@angular/material/card");
var icon_1 = require("@angular/material/icon");
var common_1 = require("@angular/common");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var button_1 = require("@angular/material/button");
var menu_1 = require("@angular/material/menu");
var delete_confirmation_dialog_component_1 = require("../delete-confirmation-dialog/delete-confirmation-dialog.component");
var create_playlist_dialog_component_1 = require("../create-playlist-dialog/create-playlist-dialog.component");
var PlaylistCardComponent = /** @class */ (function () {
    function PlaylistCardComponent(router, snackBar, dialog, playlistService) {
        this.router = router;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.playlistService = playlistService;
        this.playlistDeleted = new core_1.EventEmitter();
        this.playlistUpdated = new core_1.EventEmitter();
        this.isNavigating = false;
        this.isLoading = false;
        this.lastClickTime = 0;
        this.error = null;
    }
    PlaylistCardComponent.prototype.viewPlaylist = function (event) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var now, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        event.stopPropagation();
                        now = Date.now();
                        if (now - this.lastClickTime < 300)
                            return [2 /*return*/];
                        this.lastClickTime = now;
                        if (!((_a = this.playlist) === null || _a === void 0 ? void 0 : _a.id)) {
                            this.showError('Invalid playlist');
                            return [2 /*return*/];
                        }
                        this.isNavigating = true;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.router.navigate(['/admin/playlists', this.playlist.id])];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _b.sent();
                        console.error('Navigation failed:', err_1);
                        this.showError('Failed to load playlist');
                        return [3 /*break*/, 5];
                    case 4:
                        this.isNavigating = false;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PlaylistCardComponent.prototype.openEditDialog = function (event) {
        var _this = this;
        event.stopPropagation();
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
                // Emit the updated playlist data
                var updatedPlaylist = __assign(__assign({}, _this.playlist), { name: result.name, description: result.description });
                _this.playlistUpdated.emit(updatedPlaylist);
            }
        });
    };
    PlaylistCardComponent.prototype.openDeleteDialog = function (event) {
        var _this = this;
        event.stopPropagation();
        var dialogRef = this.dialog.open(delete_confirmation_dialog_component_1.DeleteConfirmationDialogComponent, {
            width: '350px',
            data: {
                title: 'Delete Playlist',
                message: "Are you sure you want to delete \"" + this.playlist.name + "\"?"
            }
        });
        dialogRef.afterClosed().subscribe(function (confirmed) {
            if (confirmed) {
                // Emit just the playlist ID
                _this.playlistDeleted.emit(_this.playlist.id);
            }
        });
    };
    PlaylistCardComponent.prototype.updatePlaylist = function (updatedData) {
        var _this = this;
        this.isLoading = true;
        this.playlistService
            .updatePlaylist(updatedData.playlistId, {
            name: updatedData.name,
            description: updatedData.description
        })
            .subscribe({
            next: function (updatedPlaylist) {
                _this.snackBar.open('Playlist updated successfully!', 'Close', {
                    duration: 3000
                });
                _this.playlistUpdated.emit(updatedPlaylist);
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
    PlaylistCardComponent.prototype.deletePlaylist = function () {
        var _this = this;
        this.isLoading = true;
        this.playlistService.deletePlaylist(this.playlist.id).subscribe({
            next: function () {
                _this.snackBar.open('Playlist deleted successfully!', 'Close', {
                    duration: 3000
                });
                _this.playlistDeleted.emit(_this.playlist.id);
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
    PlaylistCardComponent.prototype.showError = function (message) {
        this.snackBar.open(message, 'Dismiss', {
            duration: 3000,
            panelClass: 'error-snackbar'
        });
    };
    PlaylistCardComponent.prototype.handleImageError = function (event) {
        var imgElement = event.target;
        imgElement.src = '/default.png';
    };
    __decorate([
        core_1.Input()
    ], PlaylistCardComponent.prototype, "playlist");
    __decorate([
        core_1.Output()
    ], PlaylistCardComponent.prototype, "playlistDeleted");
    __decorate([
        core_1.Output()
    ], PlaylistCardComponent.prototype, "playlistUpdated");
    PlaylistCardComponent = __decorate([
        core_1.Component({
            selector: 'app-playlist-card',
            standalone: true,
            imports: [
                common_1.CommonModule,
                card_1.MatCardModule,
                icon_1.MatIconModule,
                progress_spinner_1.MatProgressSpinnerModule,
                button_1.MatButtonModule,
                menu_1.MatMenuModule,
            ],
            templateUrl: './playlist-card.component.html',
            styleUrls: ['./playlist-card.component.scss']
        })
    ], PlaylistCardComponent);
    return PlaylistCardComponent;
}());
exports.PlaylistCardComponent = PlaylistCardComponent;
