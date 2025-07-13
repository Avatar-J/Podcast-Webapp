import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Episode } from '../../../Models/ApiResponse';
import { ApiService } from '../../../services/api.service';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../../Pipes/truncate.pipe';

@Component({
  selector: 'app-add-episodes-dialog',
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormField,
    MatLabel,
    MatIcon,
    ReactiveFormsModule,
    MatListModule,
    TruncatePipe,
  ],
  templateUrl: './add-episodes-dialog.component.html',
  styleUrl: './add-episodes-dialog.component.scss',
})
export class AddEpisodesDialogComponent implements OnInit {
  episodes: Episode[] = [];
  filteredEpisodes!: Observable<Episode[]>;
  searchControl = new FormControl('');
  selectedEpisodes: number[] = [];

  constructor(
    private apiService: ApiService,
    private dialogRef: MatDialogRef<AddEpisodesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { playlistId: number }
  ) {}

  ngOnInit(): void {
    this.apiService.getAllEpisodes().subscribe({
      next: (response) => {
        this.episodes = response.data;
        this.setupFilter();
      },
      error: (err) => console.error('Failed to load episodes', err),
    });
  }

  private setupFilter(): void {
    this.filteredEpisodes = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): Episode[] {
    const filterValue = value.toLowerCase();
    return this.episodes.filter(
      (episode) =>
        episode.title.toLowerCase().includes(filterValue) ||
        episode.description.toLowerCase().includes(filterValue)
    );
  }

  toggleEpisodeSelection(episodeId: number): void {
    const index = this.selectedEpisodes.indexOf(episodeId);
    if (index === -1) {
      this.selectedEpisodes.push(episodeId);
    } else {
      this.selectedEpisodes.splice(index, 1);
    }
  }

  isSelected(episodeId: number): boolean {
    return this.selectedEpisodes.includes(episodeId);
  }

  onAdd(): void {
    this.dialogRef.close(this.selectedEpisodes);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
