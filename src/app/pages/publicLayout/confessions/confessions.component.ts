import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../../../components/public/header/header.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-confessions',
  imports: [
    HeaderComponent,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
  ],
  templateUrl: './confessions.component.html',
  styleUrl: './confessions.component.scss',
})
export class ConfessionsComponent {
  fb = inject(FormBuilder);
  snackBar = inject(MatSnackBar);
  apiService = inject(ApiService);
  isSubmitting = false;
  showSuccessMessage = false;

  categories = ['Funny', 'Sad', 'Angry', 'Romantic', 'general', 'Opinion'];
  emotions = [
    'Guilty',
    'Happy',
    'Anxious',
    'Embarrassed',
    'Relieved',
    'Neutral',
  ];

  confessionForm = this.fb.group({
    message: ['', [Validators.required, Validators.minLength(10)]],
    category: ['', Validators.required],
    emotion: ['', Validators.required],
  });

  onSubmit() {
    if (this.confessionForm.invalid) return;

    this.isSubmitting = true;

    const formValue = this.confessionForm.value as {
      message: string;
      category: string;
      emotion: string;
    };

    this.apiService.postConfession(formValue).subscribe({
      next: () => {
        this.snackBar.open('Confession submitted successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });

        this.isSubmitting = false;
        this.showSuccessMessage = true;

        setTimeout(() => (this.showSuccessMessage = false), 4000);
        this.confessionForm.reset(
          {
            message: '',
            category: '',
            emotion: '',
          },
          { emitEvent: false }
        );
        this.confessionForm.markAsPristine();
        this.confessionForm.markAsUntouched();
      },
      error: () => {
        this.snackBar.open('Submission failed. Try again.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
        this.isSubmitting = false;
      },
    });
  }
}
