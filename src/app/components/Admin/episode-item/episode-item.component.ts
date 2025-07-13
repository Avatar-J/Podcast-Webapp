import { Component, Input } from '@angular/core';
import { Episode } from '../../../Models/ApiResponse';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-episode-item',
  imports: [MatCard, MatIcon, DatePipe, CommonModule],
  templateUrl: './episode-item.component.html',
  styleUrl: './episode-item.component.scss',
})
export class EpisodeItemComponent {
  @Input() episode!: Episode;
  @Input() showPlaylistActions: boolean = false;
}
