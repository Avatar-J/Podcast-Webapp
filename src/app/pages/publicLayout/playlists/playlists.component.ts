import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { playlistData } from '../../../Models/ApiResponse';
import { PlaylistCardComponent } from '../../../components/public/playlist-card/playlist-card.component';
import { HeaderComponent } from '../../../components/public/header/header.component';

@Component({
  selector: 'app-playlists',
  imports: [PlaylistCardComponent, HeaderComponent],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.scss',
})
export class PlaylistsComponent implements OnInit {
  apiService = inject(ApiService);
  playlists: playlistData[] = [];

  ngOnInit(): void {
    this.apiService.getAllPlaylists().subscribe({
      next: (res) => {
        this.playlists = res.data.data;
      },
    });
  }
}
