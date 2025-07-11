import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../components/public/header/header.component';
import { EpisodeCardComponent } from '../../../components/public/episode-card/episode-card.component';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-episodes',
  imports: [HeaderComponent, EpisodeCardComponent],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.scss',
})
export class EpisodesComponent implements OnInit {
  apiService = inject(ApiService);

  ngOnInit(): void {
    this.apiService.getAllEpisodes().subscribe({
      next: (response) => {
        console.log('Episodes fetched successfully:', response);
      },
      error: (error) => {
        console.error('Error fetching episodes:', error);
      },
    });
  }
}
