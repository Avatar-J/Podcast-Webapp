"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ConfessionDetailsComponent = void 0;
var core_1 = require("@angular/core");
var confession_card_component_1 = require("../../../components/Admin/confession-card/confession-card.component");
var common_1 = require("@angular/common");
var ConfessionDetailsComponent = /** @class */ (function () {
    function ConfessionDetailsComponent() {
    }
    ConfessionDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-confession-details',
            imports: [confession_card_component_1.ConfessionCardComponent, common_1.CommonModule],
            templateUrl: './confession-details.component.html',
            styleUrl: './confession-details.component.scss'
        })
    ], ConfessionDetailsComponent);
    return ConfessionDetailsComponent;
}());
exports.ConfessionDetailsComponent = ConfessionDetailsComponent;
