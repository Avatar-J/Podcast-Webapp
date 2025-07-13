import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../components/public/header/header.component';
import { EpisodeCardComponent } from '../../../components/public/episode-card/episode-card.component';
import { ApiService } from '../../../services/api.service';
import { Episode } from '../../../Models/ApiResponse';
import { LoadingScreenComponent } from '../../../components/public/loading-screen/loading-screen.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { M } from '../../../../../node_modules/@angular/material/paginator.d-CexYxFq4';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-episodes',
  imports: [
    HeaderComponent,
    EpisodeCardComponent,
    LoadingScreenComponent,
    MatPaginatorModule,
    FormsModule,
  ],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.scss',
})
export class EpisodesComponent implements OnInit {
  apiService = inject(ApiService);
  episodes: Episode[] = [];
  isloading: boolean = true;
  newEpisodes: Episode[] = [];
  searchQuery: string = '';

  pageSize = 5;
  currentPage = 0;

  ngOnInit(): void {
    this.apiService.getAllEpisodes().subscribe({
      next: (response) => {
        this.isloading = false;
        this.episodes = response.data;
        this.updatePaginatedEpisodes();
      },
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedEpisodes();
  }

  updatePaginatedEpisodes() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.newEpisodes = this.episodes.slice(startIndex, endIndex);
  }

  searchEpisodes(query: string) {
    const lowerQuery = query.toLowerCase().trim();
    const filtered = this.episodes.filter(
      (epi) =>
        epi.title.toLowerCase().includes(lowerQuery) ||
        epi.description.toLowerCase().includes(lowerQuery)
    );

    this.newEpisodes = filtered;
  }
}
