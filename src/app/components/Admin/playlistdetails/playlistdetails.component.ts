import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogModule,
} from '@angular/material/dialog';
import { PlaylistService } from '../../../services/playlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddEpisodesDialogComponent } from '../add-episodes-dialog/add-episodes-dialog.component';
import { SingleEpisode } from '../../../Models/ApiResponse';
import { CommonModule, Location } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { EpisodeItemComponent } from '../episode-item/episode-item.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBar } from '@angular/material/progress-bar';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { CreatePlaylistDialogComponent } from '../create-playlist-dialog/create-playlist-dialog.component';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-playlistdetails',
  imports: [
    CommonModule,
    MatIcon,
    MatDivider,
    EpisodeItemComponent,
    MatProgressBar,
    MatMenuModule,
    MatDialogModule,
  ],
  templateUrl: './playlistdetails.component.html',
  styleUrl: './playlistdetails.component.scss',
})
export class PlaylistdetailsComponent implements OnInit {
  playlist!: SingleEpisode['data'];
  isLoading = true;
  playlistId!: number;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.playlistId = +this.route.snapshot.params['id'];
    this.loadPlaylist();
  }

  loadPlaylist(): void {
    this.isLoading = true;
    this.error = null;

    this.playlistService.getPlaylistById(this.playlistId).subscribe({
      next: (response) => {
        this.playlist = response.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load playlist', err);
        this.error = 'Failed to load playlist. Please try again.';
        this.isLoading = false;
        this.showErrorSnackbar();
      },
    });
  }

  openAddEpisodesDialog(): void {
    const dialogRef = this.dialog.open(AddEpisodesDialogComponent, {
      width: '600px',
      data: { playlistId: this.playlistId },
    });

    dialogRef.afterClosed().subscribe((episodeIds) => {
      if (episodeIds?.length) {
        this.addEpisodes(episodeIds);
      }
    });
  }

  openEditDialog(): void {
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
        this.updatePlaylist(result);
      }
    });
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: 'Delete Playlist',
        message: `Are you sure you want to delete "${this.playlist.name}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.deletePlaylist();
      }
    });
  }

  deletePlaylist(): void {
    this.isLoading = true;
    this.playlistService.deletePlaylist(this.playlistId).subscribe({
      next: () => {
        this.snackBar.open('Playlist deleted successfully!', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/playlists']);
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

  private addEpisodes(episodeIds: number[]): void {
    this.isLoading = true;
    this.playlistService
      .addEpisodesToPlaylist(this.playlistId, episodeIds)
      .subscribe({
        next: () => {
          this.loadPlaylist();
          this.snackBar.open('Episodes added successfully', 'Close', {
            duration: 3000,
          });
        },
        error: (err) => {
          console.error('Failed to add episodes', err);
          this.isLoading = false;
          this.snackBar.open('Failed to add episodes', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        },
      });
  }

  updatePlaylist(updatedData: {
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
        next: () => {
          this.snackBar.open('Playlist updated successfully!', 'Close', {
            duration: 3000,
          });
          this.loadPlaylist();
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

  private showErrorSnackbar(): void {
    this.snackBar
      .open(this.error || 'An error occurred', 'Retry', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      })
      .onAction()
      .subscribe(() => this.retryLoading());
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = '/default.png';
  }

  retryLoading(): void {
    this.isLoading = true;
    this.loadPlaylist();
  }

  goBack(): void {
    this.location.back();
  }
}
