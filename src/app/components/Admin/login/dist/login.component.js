"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var icon_1 = require("@angular/material/icon");
var form_field_1 = require("@angular/material/form-field");
var card_1 = require("@angular/material/card");
var common_1 = require("@angular/common");
var input_1 = require("@angular/material/input");
var button_1 = require("@angular/material/button");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, authService, router) {
        this.fb = fb;
        this.authService = authService;
        this.router = router;
        this.errorMessage = null;
        this.isLoading = false;
        this.loginForm = this.fb.group({
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            password: ['', forms_1.Validators.required]
        });
    }
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.loginForm.invalid) {
            return;
        }
        this.isLoading = true;
        this.errorMessage = null;
        this.authService.login(this.loginForm.value).subscribe({
            next: function () {
                _this.router.navigate(['/admin/confessions']);
            },
            error: function (err) {
                _this.errorMessage = err.message || 'Login failed. Please try again.';
                _this.isLoading = false;
            },
            complete: function () {
                _this.isLoading = false;
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            imports: [
                common_1.CommonModule,
                progress_spinner_1.MatProgressSpinner,
                icon_1.MatIcon,
                form_field_1.MatError,
                form_field_1.MatLabel,
                form_field_1.MatFormField,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                button_1.MatButtonModule,
                card_1.MatCard,
                card_1.MatCardContent,
                card_1.MatCardTitle,
                card_1.MatCardHeader,
                forms_1.ReactiveFormsModule,
            ],
            templateUrl: './login.component.html',
            styleUrl: './login.component.scss'
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
