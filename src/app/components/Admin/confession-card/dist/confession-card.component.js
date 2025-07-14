"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ConfessionCardComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var card_1 = require("@angular/material/card");
var chips_1 = require("@angular/material/chips");
var icon_1 = require("@angular/material/icon");
var common_2 = require("@angular/common");
var button_1 = require("@angular/material/button");
var ConfessionCardComponent = /** @class */ (function () {
    function ConfessionCardComponent() {
        this.showActions = false;
        this.approve = new core_1.EventEmitter();
        this.reject = new core_1.EventEmitter();
        this.approvalChange = new core_1.EventEmitter();
    }
    ConfessionCardComponent.prototype.onApprove = function () {
        this.approvalChange.emit(true);
    };
    ConfessionCardComponent.prototype.onReject = function () {
        this.approvalChange.emit(false);
    };
    Object.defineProperty(ConfessionCardComponent.prototype, "approvalStatus", {
        get: function () {
            return this.confession.is_approved ? 'Approved' : 'Pending';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfessionCardComponent.prototype, "approvalColor", {
        get: function () {
            return this.confession.is_approved ? 'primary' : 'warn';
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        core_1.Input()
    ], ConfessionCardComponent.prototype, "confession");
    __decorate([
        core_1.Input()
    ], ConfessionCardComponent.prototype, "showActions");
    __decorate([
        core_1.Output()
    ], ConfessionCardComponent.prototype, "approve");
    __decorate([
        core_1.Output()
    ], ConfessionCardComponent.prototype, "reject");
    __decorate([
        core_1.Output()
    ], ConfessionCardComponent.prototype, "approvalChange");
    ConfessionCardComponent = __decorate([
        core_1.Component({
            selector: 'app-confession-card',
            imports: [
                common_1.CommonModule,
                card_1.MatCardModule,
                chips_1.MatChipsModule,
                icon_1.MatIconModule,
                common_2.DatePipe,
                button_1.MatButtonModule,
            ],
            templateUrl: './confession-card.component.html',
            styleUrl: './confession-card.component.scss',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], ConfessionCardComponent);
    return ConfessionCardComponent;
}());
exports.ConfessionCardComponent = ConfessionCardComponent;
