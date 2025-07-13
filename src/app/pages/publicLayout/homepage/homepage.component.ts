import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { playlistData } from '../../../Models/ApiResponse';
import { PlaylistCardComponent } from '../../../components/public/playlist-card/playlist-card.component';
import { TeamProfile } from '../../../Models/ApiResponse';
import { TeamCardComponent } from '../../../components/public/team-card/team-card.component';
import { LoadingScreenComponent } from '../../../components/public/loading-screen/loading-screen.component';

@Component({
  selector: 'app-homepage',
  imports: [PlaylistCardComponent, TeamCardComponent, LoadingScreenComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  apiService = inject(ApiService);
  featuredPlaylists: playlistData[] = [];
  teamMembers: TeamProfile[] = [];
  isloading: boolean = true;
  images: string[] = [
    'https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=800&q=80',
  ];

  ngOnInit(): void {
    this.apiService.getAllPlaylists().subscribe({
      next: (res) => {
        this.featuredPlaylists = res.data.data.slice(0, 4);
        this.isloading = false;
      },
    });

    this.apiService.getAllTeam().subscribe({
      next: (res) => {
        this.teamMembers = res.data;
      },
    });
  }
}
