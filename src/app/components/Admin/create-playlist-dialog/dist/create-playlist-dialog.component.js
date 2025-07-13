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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.CreatePlaylistDialogComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var dialog_1 = require("@angular/material/dialog");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var button_1 = require("@angular/material/button");
var CreatePlaylistDialogComponent = /** @class */ (function () {
    function CreatePlaylistDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.isEditMode = false;
        this.playlistForm = new forms_1.FormGroup({
            name: new forms_1.FormControl(this.data.name || '', [forms_1.Validators.required]),
            description: new forms_1.FormControl(this.data.description || '')
        });
        this.isEditMode = !!this.data.playlistId;
    }
    CreatePlaylistDialogComponent.prototype.ngOnInit = function () {
        this.isEditMode = !!this.data.playlistId;
        this.initializeForm();
    };
    CreatePlaylistDialogComponent.prototype.initializeForm = function () {
        this.playlistForm = new forms_1.FormGroup({
            name: new forms_1.FormControl(this.data.name || '', [forms_1.Validators.required]),
            description: new forms_1.FormControl(this.data.description || '')
        });
    };
    CreatePlaylistDialogComponent.prototype.onSubmit = function () {
        if (this.playlistForm.valid) {
            this.dialogRef.close(__assign(__assign({}, this.playlistForm.value), { playlistId: this.data.playlistId }));
        }
    };
    CreatePlaylistDialogComponent.prototype.onCancel = function () {
        this.dialogRef.close();
    };
    CreatePlaylistDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-create-playlist-dialog',
            standalone: true,
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                dialog_1.MatDialogModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                button_1.MatButtonModule,
            ],
            templateUrl: './create-playlist-dialog.component.html',
            styleUrls: ['./create-playlist-dialog.component.scss']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], CreatePlaylistDialogComponent);
    return CreatePlaylistDialogComponent;
}());
exports.CreatePlaylistDialogComponent = CreatePlaylistDialogComponent;
