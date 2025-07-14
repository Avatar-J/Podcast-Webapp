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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ConfessionsListComponent = void 0;
var core_1 = require("@angular/core");
var table_1 = require("@angular/material/table");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var select_1 = require("@angular/material/select");
var button_toggle_1 = require("@angular/material/button-toggle");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var confession_card_component_1 = require("../../../components/Admin/confession-card/confession-card.component");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var button_1 = require("@angular/material/button");
var icon_1 = require("@angular/material/icon");
var confirmation_dialog_component_1 = require("../../../components/Admin/confirmation-dialog/confirmation-dialog.component");
var rxjs_1 = require("rxjs");
var chips_1 = require("@angular/material/chips");
var ConfessionsListComponent = /** @class */ (function () {
    function ConfessionsListComponent(apiService, dialog) {
        this.apiService = apiService;
        this.dialog = dialog;
        this.confessions = [];
        this.filteredConfessions = [];
        this.isLoading = false;
        this.error = null;
        // Filter properties
        this.searchTerm = '';
        this.selectedCategory = '';
        this.selectedEmotion = '';
        this.approvalFilter = 'all';
        // Pagination
        this.pageSize = 10;
        this.pageIndex = 0;
        this.totalConfessions = 0;
        // View mode
        this.viewMode = 'cards';
        // For table view
        this.displayedColumns = [
            'id',
            'message',
            'category',
            'emotion',
            'is_approved',
            'created_at',
            'actions',
        ];
        this.dataSource = new table_1.MatTableDataSource();
    }
    ConfessionsListComponent.prototype.ngOnInit = function () {
        this.loadConfessions();
    };
    ConfessionsListComponent.prototype.loadConfessions = function () {
        var _this = this;
        this.isLoading = true;
        this.error = null;
        this.apiService
            .getConfessions()
            .pipe(rxjs_1.finalize(function () { return (_this.isLoading = false); }))
            .subscribe({
            next: function (response) {
                _this.confessions = response.data || response;
                _this.applyFilters();
                _this.dataSource.data = _this.filteredConfessions;
                _this.totalConfessions = _this.filteredConfessions.length;
            },
            error: function (err) {
                _this.error = 'Failed to load confessions. Please try again later.';
                console.error('Error loading confessions:', err);
            }
        });
    };
    ConfessionsListComponent.prototype.applyFilters = function () {
        var _this = this;
        this.filteredConfessions = this.confessions.filter(function (confession) {
            var matchesSearch = confession.message
                .toLowerCase()
                .includes(_this.searchTerm.toLowerCase());
            var matchesCategory = _this.selectedCategory
                ? confession.category === _this.selectedCategory
                : true;
            var matchesEmotion = _this.selectedEmotion
                ? confession.emotion === _this.selectedEmotion
                : true;
            var matchesApproval = _this.approvalFilter === 'all'
                ? true
                : _this.approvalFilter === 'approved'
                    ? confession.is_approved
                    : !confession.is_approved;
            return (matchesSearch && matchesCategory && matchesEmotion && matchesApproval);
        });
        this.dataSource.data = this.filteredConfessions;
        this.totalConfessions = this.filteredConfessions.length;
        this.pageIndex = 0; // Reset to first page when filters change
    };
    ConfessionsListComponent.prototype.onPageChange = function (event) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
    };
    ConfessionsListComponent.prototype.onSortChange = function (sort) {
        var data = this.filteredConfessions.slice();
        if (!sort.active || sort.direction === '') {
            this.filteredConfessions = data;
            return;
        }
        this.filteredConfessions = data.sort(function (a, b) {
            var isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'id':
                    return compare(a.id, b.id, isAsc);
                case 'message':
                    return compare(a.message, b.message, isAsc);
                case 'category':
                    return compare(a.category, b.category, isAsc);
                case 'emotion':
                    return compare(a.emotion, b.emotion, isAsc);
                case 'is_approved':
                    return compare(a.is_approved, b.is_approved, isAsc);
                case 'created_at':
                    return compare(new Date(a.created_at), new Date(b.created_at), isAsc);
                default:
                    return 0;
            }
        });
        this.dataSource.data = this.filteredConfessions;
    };
    ConfessionsListComponent.prototype.handleApprovalChange = function (confession, isApproved) {
        var _this = this;
        var dialogRef = this.dialog.open(confirmation_dialog_component_1.ConfirmationDialogComponent, {
            data: {
                title: 'Confirm Status Change',
                message: "Are you sure you want to " + (isApproved ? 'approve' : 'reject') + " this confession?"
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.isLoading = true;
                var updatedConfession = __assign(__assign({}, confession), { is_approved: isApproved });
                _this.apiService
                    .patchConfession(confession.id, updatedConfession)
                    .pipe(rxjs_1.finalize(function () { return (_this.isLoading = false); }))
                    .subscribe({
                    next: function () {
                        // Find and update the confession in the array
                        var index = _this.confessions.findIndex(function (c) { return c.id === confession.id; });
                        if (index !== -1) {
                            _this.confessions[index] = __assign(__assign({}, _this.confessions[index]), { is_approved: isApproved, updated_at: new Date().toISOString() });
                            _this.applyFilters();
                        }
                    },
                    error: function (err) {
                        _this.error = "Failed to " + (isApproved ? 'approve' : 'reject') + " confession.";
                        console.error('Error updating confession:', err);
                    }
                });
            }
        });
    };
    Object.defineProperty(ConfessionsListComponent.prototype, "uniqueCategories", {
        get: function () {
            return __spreadArrays(new Set(this.confessions.map(function (c) { return c.category; }))).sort();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfessionsListComponent.prototype, "uniqueEmotions", {
        get: function () {
            return __spreadArrays(new Set(this.confessions.map(function (c) { return c.emotion; }))).sort();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ConfessionsListComponent.prototype, "paginatedConfessions", {
        get: function () {
            var startIndex = this.pageIndex * this.pageSize;
            return this.filteredConfessions.slice(startIndex, startIndex + this.pageSize);
        },
        enumerable: false,
        configurable: true
    });
    ConfessionsListComponent = __decorate([
        core_1.Component({
            selector: 'app-confessions-list',
            imports: [
                common_1.CommonModule,
                paginator_1.MatPaginatorModule,
                sort_1.MatSortModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                select_1.MatSelectModule,
                button_toggle_1.MatButtonToggleModule,
                progress_spinner_1.MatProgressSpinnerModule,
                confession_card_component_1.ConfessionCardComponent,
                forms_1.FormsModule,
                button_1.MatButtonModule,
                icon_1.MatIconModule,
                chips_1.MatChip,
                table_1.MatTableModule,
            ],
            templateUrl: './confessions-list.component.html',
            styleUrl: './confessions-list.component.scss'
        })
    ], ConfessionsListComponent);
    return ConfessionsListComponent;
}());
exports.ConfessionsListComponent = ConfessionsListComponent;
function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
