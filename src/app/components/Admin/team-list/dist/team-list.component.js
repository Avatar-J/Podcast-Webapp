"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TeamListComponent = void 0;
var core_1 = require("@angular/core");
var confirmation_dialog_component_1 = require("../confirmation-dialog/confirmation-dialog.component");
var TeamListComponent = /** @class */ (function () {
    function TeamListComponent(apiService, router, dialog, snackBar) {
        this.apiService = apiService;
        this.router = router;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.teamMembers = [];
        this.loading = true;
        this.displayedColumns = ['image', 'name', 'role', 'bio', 'actions'];
    }
    TeamListComponent.prototype.ngOnInit = function () {
        this.loadTeamMembers();
    };
    TeamListComponent.prototype.loadTeamMembers = function () {
        var _this = this;
        this.loading = true;
        this.apiService.getAllTeam().subscribe({
            next: function (response) {
                _this.teamMembers = response.data;
                _this.loading = false;
            },
            error: function (error) {
                console.error('Error loading team members:', error);
                _this.loading = false;
                _this.showSnackbar('Failed to load team members', 'error');
            }
        });
    };
    TeamListComponent.prototype.editMember = function (member) {
        this.router.navigate(['/admin/team/edit', member.id]);
    };
    TeamListComponent.prototype.confirmDelete = function (member) {
        var _this = this;
        var dialogRef = this.dialog.open(confirmation_dialog_component_1.ConfirmationDialogComponent, {
            width: '350px',
            data: {
                title: 'Confirm Delete',
                message: "Are you sure you want to delete " + member.name + "?",
                confirmText: 'Delete',
                cancelText: 'Cancel'
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result) {
                _this.deleteMember(member.id);
            }
        });
    };
    TeamListComponent.prototype.deleteMember = function (id) {
        var _this = this;
        this.apiService.deleteTeamMember(id).subscribe({
            next: function () {
                _this.showSnackbar('Team member deleted successfully', 'success');
                _this.loadTeamMembers();
            },
            error: function (error) {
                console.error('Error deleting team member:', error);
                _this.showSnackbar('Failed to delete team member', 'error');
            }
        });
    };
    TeamListComponent.prototype.addNewMember = function () {
        this.router.navigate(['/admin/team/new']);
    };
    TeamListComponent.prototype.showSnackbar = function (message, type) {
        this.snackBar.open(message, 'Close', {
            duration: 3000,
            panelClass: type === 'success' ? ['snackbar-success'] : ['snackbar-error']
        });
    };
    TeamListComponent = __decorate([
        core_1.Component({
            selector: 'app-team-list',
            imports: [],
            templateUrl: './team-list.component.html',
            styleUrl: './team-list.component.scss'
        })
    ], TeamListComponent);
    return TeamListComponent;
}());
exports.TeamListComponent = TeamListComponent;
