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
        this.route.params.subscribe(function (params) {
            if (params['id']) {
                _this.isEditMode = true;
                _this.memberId = +params['id'];
                _this.loadTeamMember(_this.memberId);
            }
            else {
                _this.addSocialLink();
            }
        });
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
                _this.teamForm.patchValue({
                    name: member.name,
                    role: member.role,
                    bio: member.bio,
                    profile_image: member.profile_image
                });
                // Clear existing social links
                while (_this.socialLinks.length) {
                    _this.socialLinks.removeAt(0);
                }
                // Add social links from the member
                if (member.social_media_links && member.social_media_links.length > 0) {
                    member.social_media_links.forEach(function (link) { return _this.addSocialLink(link); });
                }
                else {
                    _this.addSocialLink();
                }
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
            imports: [],
            templateUrl: './team-form.component.html',
            styleUrl: './team-form.component.scss'
        })
    ], TeamFormComponent);
    return TeamFormComponent;
}());
exports.TeamFormComponent = TeamFormComponent;
