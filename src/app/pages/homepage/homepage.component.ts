import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { playlistData } from '../../Models/ApiResponse';

@Component({
  selector: 'app-homepage',
  imports: [RouterLink, NgFor],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  apiService = inject(ApiService);
  featuredPlaylists: playlistData[] = [];

  ngOnInit(): void {
    // this.apiService.getAllPlaylists().subscribe({
    //   next: (res) => {
    //     this.featuredPlaylists = res.data.data.slice(0,4);;
    //   },
    // });
  }
}
