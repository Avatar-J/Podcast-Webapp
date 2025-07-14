"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TeamFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var form_field_1 = require("@angular/material/form-field");
var input_1 = require("@angular/material/input");
var select_1 = require("@angular/material/select");
var icon_1 = require("@angular/material/icon");
var button_1 = require("@angular/material/button");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var card_1 = require("@angular/material/card");
var TeamFormComponent = /** @class */ (function () {
    function TeamFormComponent(fb, route, router, apiService, snackBar) {
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.apiService = apiService;
        this.snackBar = snackBar;
        this.isEditMode = false;
        this.memberId = null;
        this.loading = false;
        this.socialPlatforms = [
            'Instagram',
            'Twitter',
            'LinkedIn',
            'Facebook',
            'YouTube',
            'TikTok',
            'X',
        ];
        this.teamForm = this.fb.group({
            name: ['', forms_1.Validators.required],
            role: ['', forms_1.Validators.required],
            bio: ['', forms_1.Validators.required],
            profile_image: [
                '',
                [forms_1.Validators.required, forms_1.Validators.pattern('https?://.+')],
            ],
            social_media_links: this.fb.array([])
        });
    }
    TeamFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            if (id) {
                _this.isEditMode = true;
                _this.memberId = +id;
                _this.loadTeamData();
            }
            else {
                _this.addSocialLink();
            }
        });
    };
    TeamFormComponent.prototype.loadTeamData = function () {
        // First try to get data from route state
        var state = history.state;
        if (state === null || state === void 0 ? void 0 : state.memberData) {
            this.patchFormWithData(state.memberData);
        }
        else {
            // Fall back to API call if no state data
            this.loadTeamMember(this.memberId);
        }
    };
    TeamFormComponent.prototype.patchFormWithData = function (member) {
        var _this = this;
        var _a;
        this.teamForm.patchValue({
            name: member.name,
            role: member.role,
            bio: member.bio,
            profile_image: member.profile_image
        });
        // Clear existing social links
        while (this.socialLinks.length) {
            this.socialLinks.removeAt(0);
        }
        // Add social links from the member
        if (((_a = member.social_media_links) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            member.social_media_links.forEach(function (link) { return _this.addSocialLink(link); });
        }
        else {
            this.addSocialLink();
        }
    };
    Object.defineProperty(TeamFormComponent.prototype, "socialLinks", {
        get: function () {
            return this.teamForm.get('social_media_links');
        },
        enumerable: false,
        configurable: true
    });
    TeamFormComponent.prototype.addSocialLink = function (link) {
        if (link === void 0) { link = null; }
        var linkGroup = this.fb.group({
            platform: [(link === null || link === void 0 ? void 0 : link.platform) || '', forms_1.Validators.required],
            url: [
                (link === null || link === void 0 ? void 0 : link.url) || '',
                [forms_1.Validators.required, forms_1.Validators.pattern('https?://.+')],
            ]
        });
        this.socialLinks.push(linkGroup);
    };
    TeamFormComponent.prototype.removeSocialLink = function (index) {
        this.socialLinks.removeAt(index);
    };
    TeamFormComponent.prototype.loadTeamMember = function (id) {
        var _this = this;
        this.loading = true;
        this.apiService.getTeamMember(id).subscribe({
            next: function (member) {
                _this.patchFormWithData(member);
                _this.loading = false;
            },
            error: function (error) {
                console.error('Error loading team member:', error);
                _this.loading = false;
                _this.showSnackbar('Failed to load team member', 'error');
                _this.router.navigate(['/admin/team']);
            }
        });
    };
    TeamFormComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.teamForm.invalid) {
            this.teamForm.markAllAsTouched();
            this.showSnackbar('Please fill all required fields', 'error');
            return;
        }
        this.loading = true;
        var memberData = this.teamForm.value;
        if (this.isEditMode && this.memberId) {
            this.apiService.updateTeamMember(this.memberId, memberData).subscribe({
                next: function () {
                    _this.showSnackbar('Team member updated successfully', 'success');
                    _this.router.navigate(['/admin/team']);
                },
                error: function (error) {
                    console.error('Error updating team member:', error);
                    _this.showSnackbar('Failed to update team member', 'error');
                    _this.loading = false;
                }
            });
        }
        else {
            this.apiService.createTeamMember(memberData).subscribe({
                next: function () {
                    _this.showSnackbar('Team member created successfully', 'success');
                    _this.router.navigate(['/admin/team']);
                },
                error: function (error) {
                    console.error('Error creating team member:', error);
                    _this.showSnackbar('Failed to create team member', 'error');
                    _this.loading = false;
                }
            });
        }
    };
    TeamFormComponent.prototype.onCancel = function () {
        this.router.navigate(['/admin/team']);
    };
    TeamFormComponent.prototype.showSnackbar = function (message, type) {
        this.snackBar.open(message, 'Close', {
            duration: 3000,
            panelClass: type === 'success' ? ['snackbar-success'] : ['snackbar-error']
        });
    };
    TeamFormComponent = __decorate([
        core_1.Component({
            selector: 'app-team-form',
            standalone: true,
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                select_1.MatSelectModule,
                icon_1.MatIconModule,
                button_1.MatButtonModule,
                progress_spinner_1.MatProgressSpinnerModule,
                card_1.MatCardModule,
            ],
            templateUrl: './team-form.component.html',
            styleUrls: ['./team-form.component.scss']
        })
    ], TeamFormComponent);
    return TeamFormComponent;
}());
exports.TeamFormComponent = TeamFormComponent;
