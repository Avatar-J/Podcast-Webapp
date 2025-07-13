"use strict";
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
exports.AddEpisodesDialogComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var dialog_1 = require("@angular/material/dialog");
var form_field_1 = require("@angular/material/form-field");
var icon_1 = require("@angular/material/icon");
var list_1 = require("@angular/material/list");
var common_1 = require("@angular/common");
var truncate_pipe_1 = require("../../../Pipes/truncate.pipe");
var AddEpisodesDialogComponent = /** @class */ (function () {
    function AddEpisodesDialogComponent(apiService, dialogRef, data) {
        this.apiService = apiService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.episodes = [];
        this.searchControl = new forms_1.FormControl('');
        this.selectedEpisodes = [];
    }
    AddEpisodesDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.getAllEpisodes().subscribe({
            next: function (response) {
                _this.episodes = response.data;
                _this.setupFilter();
            },
            error: function (err) { return console.error('Failed to load episodes', err); }
        });
    };
    AddEpisodesDialogComponent.prototype.setupFilter = function () {
        var _this = this;
        this.filteredEpisodes = this.searchControl.valueChanges.pipe(rxjs_1.startWith(''), rxjs_1.map(function (value) { return _this._filter(value || ''); }));
    };
    AddEpisodesDialogComponent.prototype._filter = function (value) {
        var filterValue = value.toLowerCase();
        return this.episodes.filter(function (episode) {
            return episode.title.toLowerCase().includes(filterValue) ||
                episode.description.toLowerCase().includes(filterValue);
        });
    };
    AddEpisodesDialogComponent.prototype.toggleEpisodeSelection = function (episodeId) {
        var index = this.selectedEpisodes.indexOf(episodeId);
        if (index === -1) {
            this.selectedEpisodes.push(episodeId);
        }
        else {
            this.selectedEpisodes.splice(index, 1);
        }
    };
    AddEpisodesDialogComponent.prototype.isSelected = function (episodeId) {
        return this.selectedEpisodes.includes(episodeId);
    };
    AddEpisodesDialogComponent.prototype.onAdd = function () {
        this.dialogRef.close(this.selectedEpisodes);
    };
    AddEpisodesDialogComponent.prototype.onCancel = function () {
        this.dialogRef.close();
    };
    AddEpisodesDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-add-episodes-dialog',
            imports: [
                common_1.CommonModule,
                dialog_1.MatDialogModule,
                form_field_1.MatFormField,
                form_field_1.MatLabel,
                icon_1.MatIcon,
                forms_1.ReactiveFormsModule,
                list_1.MatListModule,
                truncate_pipe_1.TruncatePipe,
            ],
            templateUrl: './add-episodes-dialog.component.html',
            styleUrl: './add-episodes-dialog.component.scss'
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], AddEpisodesDialogComponent);
    return AddEpisodesDialogComponent;
}());
exports.AddEpisodesDialogComponent = AddEpisodesDialogComponent;
