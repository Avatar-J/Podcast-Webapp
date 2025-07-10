import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { playlistData } from '../../../Models/ApiResponse';

@Component({
  selector: 'app-playlist-card',
  imports: [RouterLink],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.scss',
})
export class PlaylistCardComponent {
  @Input() playlist!: playlistData;
  @Input() image!: string;
}
