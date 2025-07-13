import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { playlistData } from '../../../Models/ApiResponse';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { CreatePlaylistDialogComponent } from '../create-playlist-dialog/create-playlist-dialog.component';
import { PlaylistService } from '../../../services/playlist.service';

@Component({
  selector: 'app-playlist-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss'],
})
export class PlaylistCardComponent {
  @Input() playlist!: playlistData;
  @Output() playlistDeleted = new EventEmitter<number>();
  @Output() playlistUpdated = new EventEmitter<playlistData>();

  isNavigating = false;
  isLoading = false;
  lastClickTime = 0;
  error: string | null = null;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private playlistService: PlaylistService
  ) {}

  async viewPlaylist(event: Event): Promise<void> {
    event.stopPropagation();

    // Debounce clicks (300ms threshold)
    const now = Date.now();
    if (now - this.lastClickTime < 300) return;
    this.lastClickTime = now;

    if (!this.playlist?.id) {
      this.showError('Invalid playlist');
      return;
    }

    this.isNavigating = true;

    try {
      await this.router.navigate(['/admin/playlists', this.playlist.id]);
    } catch (err) {
      console.error('Navigation failed:', err);
      this.showError('Failed to load playlist');
    } finally {
      this.isNavigating = false;
    }
  }

  openEditDialog(event: Event): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(CreatePlaylistDialogComponent, {
      width: '400px',
      data: {
        name: this.playlist.name,
        description: this.playlist.description,
        playlistId: this.playlist.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Emit the updated playlist data
        const updatedPlaylist = {
          ...this.playlist,
          name: result.name,
          description: result.description,
        };
        this.playlistUpdated.emit(updatedPlaylist);
      }
    });
  }

  openDeleteDialog(event: Event): void {
    event.stopPropagation();

    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: 'Delete Playlist',
        message: `Are you sure you want to delete "${this.playlist.name}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        // Emit just the playlist ID
        this.playlistDeleted.emit(this.playlist.id);
      }
    });
  }

  private updatePlaylist(updatedData: {
    name: string;
    description: string;
    playlistId: number;
  }): void {
    this.isLoading = true;
    this.playlistService
      .updatePlaylist(updatedData.playlistId, {
        name: updatedData.name,
        description: updatedData.description,
      })
      .subscribe({
        next: (updatedPlaylist) => {
          this.snackBar.open('Playlist updated successfully!', 'Close', {
            duration: 3000,
          });
          this.playlistUpdated.emit(updatedPlaylist);
        },
        error: (err) => {
          this.isLoading = false;
          this.snackBar.open('Failed to update playlist', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        },
      });
  }

  private deletePlaylist(): void {
    this.isLoading = true;
    this.playlistService.deletePlaylist(this.playlist.id).subscribe({
      next: () => {
        this.snackBar.open('Playlist deleted successfully!', 'Close', {
          duration: 3000,
        });
        this.playlistDeleted.emit(this.playlist.id);
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.open('Failed to delete playlist', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,
      panelClass: 'error-snackbar',
    });
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = '/default.png';
  }
}
