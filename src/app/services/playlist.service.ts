import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { playlistData, SingleEpisode } from '../Models/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  constructor(private apiService: ApiService) {}

  getAllPlaylists(): Observable<playlistData[]> {
    return this.apiService
      .getAllPlaylists()
      .pipe(map((response) => response.data.data));
  }

  getPlaylistById(id: number): Observable<SingleEpisode> {
    return this.apiService.getPlaylist(id);
  }

  createPlaylist(playlist: {
    name: string;
    description: string;
  }): Observable<any> {
    return this.apiService.postPlaylist(playlist);
  }

  updatePlaylist(
    playlistId: number,
    data: { name: string; description: string }
  ): Observable<any> {
    return this.apiService.updatePlaylist(playlistId, data);
  }

  addEpisodesToPlaylist(
    playlistId: number,
    episodeIds: number[]
  ): Observable<any> {
    return this.apiService.addEpisode(playlistId, episodeIds);
  }

  deletePlaylist(playlistId: number): Observable<any> {
    return this.apiService.deletePlaylist(playlistId);
  }
}
