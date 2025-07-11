import {
  Component,
  OnInit,
  inject,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { LoadingScreenComponent } from '../../../components/public/loading-screen/loading-screen.component';
import { HeaderComponent } from '../../../components/public/header/header.component';
import { ApiService } from '../../../services/api.service';
import { Episode } from '../../../Models/ApiResponse';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-episode-view',
  imports: [LoadingScreenComponent, HeaderComponent, CommonModule],
  templateUrl: './episode-view.component.html',
  styleUrl: './episode-view.component.scss',
})
export class EpisodeViewComponent implements OnInit, AfterViewInit, OnDestroy {
  isloading: boolean = true;
  apiService = inject(ApiService);
  route = inject(ActivatedRoute);
  episode!: Episode;
  @ViewChild('audioRef', { static: false })
  audioRef!: ElementRef<HTMLAudioElement>;

  audio = new Audio();
  isPlaying = false;
  currentTime = 0;
  duration = 0;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getAllEpisodes().subscribe({
        next: (episodes) => {
          const foundEpisode = episodes.data.find(
            (ep) => ep.id.toString() === id
          );
          if (foundEpisode) {
            this.episode = foundEpisode;
            this.isloading = false;
          } else {
            throw new Error('Episode not found');
          }
        },
      });
    }
  }

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

  formatTime(time: number): string {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${mins}:${secs}`;
  }

  parseDurationToMinutes(durationStr: string): number {
    const parts = durationStr.split(':').map(Number);

    let hours = 0,
      minutes = 0,
      seconds = 0;

    if (parts.length === 3) {
      [hours, minutes, seconds] = parts;
    } else if (parts.length === 2) {
      [minutes, seconds] = parts;
    } else {
      return 0;
    }

    const totalMinutes = hours * 60 + minutes + Math.floor(seconds / 60);
    return totalMinutes;
  }

  seek(event: Event) {
    const value = +(event.target as HTMLInputElement).value;
    this.audioRef.nativeElement.currentTime = value;
  }

  ngOnDestroy(): void {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }
}
