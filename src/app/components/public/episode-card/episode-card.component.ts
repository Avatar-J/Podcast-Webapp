import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Episode } from '../../../Models/ApiResponse';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-episode-card',
  imports: [MatIconModule, RouterLink],
  templateUrl: './episode-card.component.html',
  styleUrl: './episode-card.component.scss',
})
export class EpisodeCardComponent implements AfterViewInit, OnDestroy, OnInit {
  @Input() episode!: Episode;
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

    this.timeInterval = setInterval(() => {
      if (!audio.paused) {
        this.currentTime = audio.currentTime;
      }
    }, 500);
  }
  ngOnInit(): void {}
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
