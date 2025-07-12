import { Component, Input, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PlaylistCardComponent } from '../../../components/Admin/playlist-card/playlist-card.component';
import { playlistData, playlistResponse } from '../../../Models/ApiResponse';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { PlaylistService } from '../../../services/playlist.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatePlaylistDialogComponent } from '../../../components/Admin/create-playlist-dialog/create-playlist-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-playlists',
  imports: [PlaylistCardComponent, MatIcon, MatProgressBarModule, CommonModule],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.scss',
})
export class PlaylistsComponent implements OnInit {
  playlists: playlistData[] = [];
  isLoading = true;
  constructor(
    private playlistService: PlaylistService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPlaylists();
  }

  loadPlaylists(): void {
    this.isLoading = true;
    this.playlistService.getAllPlaylists().subscribe({
      next: (playlists) => {
        this.playlists = playlists;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load playlists', err);
        this.isLoading = false;
      },
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreatePlaylistDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.playlistService.createPlaylist(result).subscribe({
          next: () => this.loadPlaylists(),
          error: (err) => console.error('Failed to create playlist', err),
        });
      }
    });
  }
}
