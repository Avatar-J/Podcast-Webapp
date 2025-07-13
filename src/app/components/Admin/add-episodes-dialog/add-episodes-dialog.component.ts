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
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-episodes-dialog',
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormField,
    MatLabel,
    MatIcon,
    MatInputModule,
    ReactiveFormsModule,
    MatListModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
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
  isLoading = false;
  selectAllChecked = false;

  constructor(
    private apiService: ApiService,
    private dialogRef: MatDialogRef<AddEpisodesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { playlistId: number }
  ) {}

  ngOnInit(): void {
    this.loadEpisodes();
    this.setupFilter();
  }

  loadEpisodes(): void {
    this.isLoading = true;
    this.apiService.getAllEpisodes().subscribe({
      next: (response) => {
        this.episodes = response.data;
        this.setupFilter();
        this.isLoading = false;
      },
      error: (err) => console.error('Failed to load episodes', err),
      complete: () => (this.isLoading = false),
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
    this.updateSelectAllState();
  }

  updateSelectAllState(): void {
    this.selectAllChecked =
      this.selectedEpisodes.length === this.episodes.length;
  }

  isSelected(episodeId: number): boolean {
    return this.selectedEpisodes.includes(episodeId);
  }

  toggleSelectAll(event: any): void {
    this.selectAllChecked = event.checked;
    if (this.selectAllChecked) {
      this.selectedEpisodes = this.episodes.map((episode) => episode.id);
    } else {
      this.selectedEpisodes = [];
    }
  }

  onAdd(): void {
    this.dialogRef.close(this.selectedEpisodes);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = '/default.png';
  }
}
