"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PlaylistCardComponent = void 0;
var core_1 = require("@angular/core");
var card_1 = require("@angular/material/card");
var icon_1 = require("@angular/material/icon");
var common_1 = require("@angular/common");
var PlaylistCardComponent = /** @class */ (function () {
    function PlaylistCardComponent() {
    }
    __decorate([
        core_1.Input()
    ], PlaylistCardComponent.prototype, "playlist");
    PlaylistCardComponent = __decorate([
        core_1.Component({
            selector: 'app-playlist-card',
            imports: [common_1.CommonModule, card_1.MatCardModule, icon_1.MatIcon],
            templateUrl: './playlist-card.component.html',
            styleUrl: './playlist-card.component.scss'
        })
    ], PlaylistCardComponent);
    return PlaylistCardComponent;
}());
exports.PlaylistCardComponent = PlaylistCardComponent;
