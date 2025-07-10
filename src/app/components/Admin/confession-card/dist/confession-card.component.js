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
var ConfessionCardComponent = /** @class */ (function () {
    function ConfessionCardComponent() {
        this.approvalChange = new core_1.EventEmitter();
    }
    ConfessionCardComponent.prototype.onApprove = function () {
        this.confession.data.is_approved = true;
        this.approvalChange.emit({
            id: this.confession.data.id,
            isApproved: true
        });
    };
    ConfessionCardComponent.prototype.onDisapprove = function () {
        this.confession.data.is_approved = false;
        this.approvalChange.emit({
            id: this.confession.data.id,
            isApproved: false
        });
    };
    __decorate([
        core_1.Input()
    ], ConfessionCardComponent.prototype, "confession");
    __decorate([
        core_1.Output()
    ], ConfessionCardComponent.prototype, "approvalChange");
    ConfessionCardComponent = __decorate([
        core_1.Component({
            selector: 'app-confession-card',
            imports: [common_1.CommonModule],
            templateUrl: './confession-card.component.html',
            styleUrl: './confession-card.component.scss'
        })
    ], ConfessionCardComponent);
    return ConfessionCardComponent;
}());
exports.ConfessionCardComponent = ConfessionCardComponent;
