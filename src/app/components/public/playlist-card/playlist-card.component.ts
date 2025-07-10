import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { playlistData } from '../../../Models/ApiResponse';
import { UnsplashService } from '../../../services/unsplash.service';

@Component({
  selector: 'app-playlist-card',
  imports: [RouterLink],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.scss',
})
export class PlaylistCardComponent {
  @Input() playlist!: playlistData;
  @Input() image!: string;

  unsplashService = inject(UnsplashService);

  ngOnInit(): void {
    if (!this.image) {
      this.unsplashService.getRandomImage('podcast').subscribe({
        next: (res: string): void => {
          this.image = res;
        },
      });
    }
  }
}
