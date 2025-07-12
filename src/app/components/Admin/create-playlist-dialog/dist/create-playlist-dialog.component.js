"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreatePlaylistDialogComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var form_field_1 = require("@angular/material/form-field");
var CreatePlaylistDialogComponent = /** @class */ (function () {
    function CreatePlaylistDialogComponent(fb, dialogRef) {
        this.fb = fb;
        this.dialogRef = dialogRef;
        this.playlistForm = this.fb.group({
            name: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(100)]],
            description: ['', forms_1.Validators.maxLength(500)]
        });
    }
    CreatePlaylistDialogComponent.prototype.onSubmit = function () {
        if (this.playlistForm.valid) {
            this.dialogRef.close(this.playlistForm.value);
        }
    };
    CreatePlaylistDialogComponent.prototype.onCancel = function () {
        this.dialogRef.close();
    };
    CreatePlaylistDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-create-playlist-dialog',
            imports: [
                common_1.CommonModule,
                dialog_1.MatDialogContent,
                form_field_1.MatFormFieldModule,
                dialog_1.MatDialogModule,
                forms_1.ReactiveFormsModule,
            ],
            templateUrl: './create-playlist-dialog.component.html',
            styleUrl: './create-playlist-dialog.component.scss'
        })
    ], CreatePlaylistDialogComponent);
    return CreatePlaylistDialogComponent;
}());
exports.CreatePlaylistDialogComponent = CreatePlaylistDialogComponent;
