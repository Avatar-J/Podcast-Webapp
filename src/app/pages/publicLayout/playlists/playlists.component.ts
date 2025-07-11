import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { playlistData } from '../../../Models/ApiResponse';
import { PlaylistCardComponent } from '../../../components/public/playlist-card/playlist-card.component';
import { HeaderComponent } from '../../../components/public/header/header.component';
import { LoadingScreenComponent } from '../../../components/public/loading-screen/loading-screen.component';

@Component({
  selector: 'app-playlists',
  imports: [PlaylistCardComponent, HeaderComponent, LoadingScreenComponent],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.scss',
})
export class PlaylistsComponent implements OnInit {
  apiService = inject(ApiService);
  playlists: playlistData[] = [];
  isloading: boolean = true;

  ngOnInit(): void {
    this.apiService.getAllPlaylists().subscribe({
      next: (res) => {
        this.isloading = false;
        this.playlists = res.data.data;
      },
    });
  }
}
