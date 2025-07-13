"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var input_1 = require("@angular/material/input");
var form_field_1 = require("@angular/material/form-field");
var card_1 = require("@angular/material/card");
var button_1 = require("@angular/material/button");
var icon_1 = require("@angular/material/icon");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var select_1 = require("@angular/material/select");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(fb, authService, router) {
        this.fb = fb;
        this.authService = authService;
        this.router = router;
        this.errorMessage = null;
        this.isLoading = false;
        this.roles = ['user', 'admin'];
        this.registerForm = this.fb.group({
            name: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            password: ['', [forms_1.Validators.required, forms_1.Validators.minLength(8)]],
            password_confirmation: ['', forms_1.Validators.required],
            role: ['user']
        }, { validators: this.passwordMatchValidator });
    }
    RegisterComponent.prototype.passwordMatchValidator = function (form) {
        var _a, _b;
        return ((_a = form.get('password')) === null || _a === void 0 ? void 0 : _a.value) === ((_b = form.get('password_confirmation')) === null || _b === void 0 ? void 0 : _b.value)
            ? null
            : { mismatch: true };
    };
    RegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.registerForm.invalid) {
            return;
        }
        this.isLoading = true;
        this.errorMessage = null;
        var formData = this.registerForm.value;
        console.log('Submitting:', formData); // Debug log
        this.authService.register(formData).subscribe({
            next: function () {
                _this.router.navigate(['/admin/login']);
            },
            error: function (err) {
                console.error('Registration error:', err); // Debug log
                if (err.error) {
                    console.log('Error details:', err.error); // Debug log
                }
                _this.errorMessage = _this.parseErrorMessage(err);
                _this.isLoading = false;
            },
            complete: function () {
                _this.isLoading = false;
            }
        });
    };
    RegisterComponent.prototype.parseErrorMessage = function (err) {
        var _this = this;
        var _a;
        if ((_a = err.error) === null || _a === void 0 ? void 0 : _a.errors) {
            // Handle Laravel-style validation errors
            return Object.entries(err.error.errors)
                .map(function (_a) {
                var field = _a[0], messages = _a[1];
                return _this.formatFieldName(field) + ": " + messages.join(', ');
            })
                .join('<br>');
        }
        return err.message || 'Registration failed. Please try again.';
    };
    RegisterComponent.prototype.formatFieldName = function (field) {
        var fieldNames = {
            name: 'Full Name',
            email: 'Email',
            password: 'Password',
            password_confirmation: 'Password Confirmation',
            role: 'Role'
        };
        return (fieldNames[field] ||
            field
                .split('_')
                .join(' ')
                .replace(/\b\w/g, function (l) { return l.toUpperCase(); }));
    };
    Object.defineProperty(RegisterComponent.prototype, "passwordMismatchError", {
        get: function () {
            return (this.registerForm.hasError('mismatch') &&
                this.registerForm.get('password_confirmation').touched);
        },
        enumerable: false,
        configurable: true
    });
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            imports: [
                common_1.CommonModule,
                forms_1.ReactiveFormsModule,
                input_1.MatInputModule,
                form_field_1.MatFormFieldModule,
                card_1.MatCardModule,
                button_1.MatButtonModule,
                icon_1.MatIconModule,
                progress_spinner_1.MatProgressSpinnerModule,
                select_1.MatSelectModule,
            ],
            templateUrl: './register.component.html',
            styleUrl: './register.component.scss'
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
