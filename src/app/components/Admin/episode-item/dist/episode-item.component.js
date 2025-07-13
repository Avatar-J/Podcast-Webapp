"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EpisodeItemComponent = void 0;
var core_1 = require("@angular/core");
var card_1 = require("@angular/material/card");
var icon_1 = require("@angular/material/icon");
var common_1 = require("@angular/common");
var EpisodeItemComponent = /** @class */ (function () {
    function EpisodeItemComponent() {
        this.showPlaylistActions = false;
    }
    __decorate([
        core_1.Input()
    ], EpisodeItemComponent.prototype, "episode");
    __decorate([
        core_1.Input()
    ], EpisodeItemComponent.prototype, "showPlaylistActions");
    EpisodeItemComponent = __decorate([
        core_1.Component({
            selector: 'app-episode-item',
            imports: [card_1.MatCard, icon_1.MatIcon, common_1.DatePipe, common_1.CommonModule],
            templateUrl: './episode-item.component.html',
            styleUrl: './episode-item.component.scss'
        })
    ], EpisodeItemComponent);
    return EpisodeItemComponent;
}());
exports.EpisodeItemComponent = EpisodeItemComponent;
