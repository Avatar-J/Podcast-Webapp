import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../components/public/header/header.component';
import { EpisodeCardComponent } from '../../../components/public/episode-card/episode-card.component';
import { ApiService } from '../../../services/api.service';
import { Episode } from '../../../Models/ApiResponse';
import { LoadingScreenComponent } from '../../../components/public/loading-screen/loading-screen.component';

@Component({
  selector: 'app-episodes',
  imports: [HeaderComponent, EpisodeCardComponent, LoadingScreenComponent],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.scss',
})
export class EpisodesComponent implements OnInit {
  apiService = inject(ApiService);
  episodes: Episode[] = [];
  isloading: boolean = true;

  ngOnInit(): void {
    this.apiService.getAllEpisodes().subscribe({
      next: (response) => {
        this.isloading = false;
        this.episodes = response.data;
      },
    });
  }
}
