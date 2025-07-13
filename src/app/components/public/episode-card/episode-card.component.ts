import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnDestroy,
  inject,
  OnInit,
} from '@angular/core';
import { Episode } from '../../../Models/ApiResponse';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-episode-card',
  imports: [MatIconModule],
  templateUrl: './episode-card.component.html',
  styleUrl: './episode-card.component.scss',
})
export class EpisodeCardComponent implements AfterViewInit, OnDestroy {
  @Input() episode!: Episode;
  router = inject(Router);
  @ViewChild('audioRef', { static: false })
  audioRef!: ElementRef<HTMLAudioElement>;

  isPlaying = false;
  currentTime = 0;
  duration = 0;
  volume = 1;

  private timeInterval: any;

  ngAfterViewInit() {
    const audio = this.audioRef.nativeElement;

    audio.addEventListener('loadedmetadata', () => {
      this.duration = audio.duration;
    });

    audio.addEventListener('timeupdate', () => {
      this.currentTime = audio.currentTime;
    });
  }
  goToEpisode(id: number) {
    this.router.navigate(['/public/episode', id]);
  }
  togglePlay() {
    const audio = this.audioRef.nativeElement;
    if (audio.paused) {
      audio.play();
      this.isPlaying = true;
    } else {
      audio.pause();
      this.isPlaying = false;
    }
  }

  seek(event: Event) {
    const value = +(event.target as HTMLInputElement).value;
    this.audioRef.nativeElement.currentTime = value;
  }

  setVolume(event: Event) {
    this.volume = +(event.target as HTMLInputElement).value;
    this.audioRef.nativeElement.volume = this.volume;
  }

  ngOnDestroy(): void {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }
}
