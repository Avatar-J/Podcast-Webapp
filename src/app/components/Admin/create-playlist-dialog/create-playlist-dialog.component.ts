import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-playlist-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-playlist-dialog.component.html',
  styleUrls: ['./create-playlist-dialog.component.scss'],
})
export class CreatePlaylistDialogComponent implements OnInit {
  playlistForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CreatePlaylistDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name?: string;
      description?: string;
      playlistId?: number;
    }
  ) {
    this.playlistForm = new FormGroup({
      name: new FormControl(this.data.name || '', [Validators.required]),
      description: new FormControl(this.data.description || ''),
    });
    this.isEditMode = !!this.data.playlistId;
  }

  ngOnInit(): void {
    this.isEditMode = !!this.data.playlistId;
    this.initializeForm();
  }

  private initializeForm(): void {
    this.playlistForm = new FormGroup({
      name: new FormControl(this.data.name || '', [Validators.required]),
      description: new FormControl(this.data.description || ''),
    });
  }

  onSubmit(): void {
    if (this.playlistForm.valid) {
      this.dialogRef.close({
        ...this.playlistForm.value,
        playlistId: this.data.playlistId,
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
