import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { playlistData } from '../../../Models/ApiResponse';
import { PlaylistCardComponent } from '../../../components/public/playlist-card/playlist-card.component';

@Component({
  selector: 'app-homepage',
  imports: [NgFor, PlaylistCardComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  apiService = inject(ApiService);
  featuredPlaylists: playlistData[] = [];
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
        console.log(this.featuredPlaylists);
      },
      error: (err) => {
        console.error('Error fetching playlists:', err);
      },
    });
  }
}
