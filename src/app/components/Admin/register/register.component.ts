import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  isLoading = false;
  roles = ['user', 'admin'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        password_confirmation: ['', Validators.required],
        role: ['user'], // Default role
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value ===
      form.get('password_confirmation')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const formData = this.registerForm.value;
    console.log('Submitting:', formData); // Debug log

    this.authService.register(formData).subscribe({
      next: () => {
        this.router.navigate(['/admin/login']);
      },
      error: (err) => {
        console.error('Registration error:', err); // Debug log
        if (err.error) {
          console.log('Error details:', err.error); // Debug log
        }

        this.errorMessage = this.parseErrorMessage(err);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  private parseErrorMessage(err: any): string {
    if (err.error?.errors) {
      // Handle Laravel-style validation errors
      return Object.entries(err.error.errors)
        .map(
          ([field, messages]) =>
            `${this.formatFieldName(field)}: ${(messages as string[]).join(
              ', '
            )}`
        )
        .join('<br>');
    }
    return err.message || 'Registration failed. Please try again.';
  }

  private formatFieldName(field: string): string {
    const fieldNames: Record<string, string> = {
      name: 'Full Name',
      email: 'Email',
      password: 'Password',
      password_confirmation: 'Password Confirmation',
      role: 'Role',
    };
    return (
      fieldNames[field] ||
      field
        .split('_')
        .join(' ')
        .replace(/\b\w/g, (l) => l.toUpperCase())
    );
  }

  get passwordMismatchError(): boolean {
    return (
      this.registerForm.hasError('mismatch') &&
      this.registerForm.get('password_confirmation')!.touched
    );
  }
}
