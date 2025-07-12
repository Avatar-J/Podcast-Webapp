import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { playlistData } from '../../../Models/ApiResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlist-card',
  imports: [CommonModule, MatCardModule, MatIcon],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.scss',
})
export class PlaylistCardComponent {
  @Input() playlist!: playlistData;
}
