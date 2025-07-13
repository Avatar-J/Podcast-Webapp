import { Component, inject, OnInit } from '@angular/core';
import { EpisodeCardComponent } from '../../../components/public/episode-card/episode-card.component';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingScreenComponent } from '../../../components/public/loading-screen/loading-screen.component';
import { SinglePlaylist } from '../../../Models/ApiResponse';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../components/public/header/header.component';

@Component({
  selector: 'app-playlist-view',
  imports: [
    EpisodeCardComponent,
    LoadingScreenComponent,
    CommonModule,
    HeaderComponent,
  ],
  templateUrl: './playlist-view.component.html',
  styleUrl: './playlist-view.component.scss',
})
export class PlaylistViewComponent implements OnInit {
  isloading: boolean = true;
  apiService = inject(ApiService);
  route = inject(ActivatedRoute);
  playlist!: SinglePlaylist;
  image =
    'https://accessadvisors.nz/assets/Uploads/How-to-design-a-great-podcast-logo__FocusFillWzEyMDAsOTAwLCJ5IiwzMF0.jpg';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const numericId = Number(id);
      this.apiService.getPlaylist(numericId).subscribe({
        next: (playlist) => {
          this.playlist = playlist;
          this.isloading = false;
        },
      });
    }
  }
}
