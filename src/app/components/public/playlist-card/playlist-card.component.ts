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

  // unsplashService = inject(UnsplashService);

  ngOnInit(): void {
    this.image =
      'https://accessadvisors.nz/assets/Uploads/How-to-design-a-great-podcast-logo__FocusFillWzEyMDAsOTAwLCJ5IiwzMF0.jpg';
  }
}
