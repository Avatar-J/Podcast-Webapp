import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { playlistData } from '../../../Models/ApiResponse';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-playlist-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatIcon,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.scss',
})
export class PlaylistCardComponent {
  @Input() playlist!: playlistData;
  isNavigating = false;
  lastClickTime = 0;

  constructor(private router: Router, private snackBar: MatSnackBar) {}

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

  onMenuClick(event: Event): void {
    event.stopPropagation();
    // Handle menu actions here
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,
      panelClass: 'error-snackbar',
    });
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.style.display = 'none';
    // You could also set a default image here
    // imgElement.src = 'assets/default-playlist-cover.jpg';
  }
}
