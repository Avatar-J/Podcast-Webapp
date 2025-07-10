import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UnsplashService {
  private apiUrl = 'https://api.unsplash.com/photos/random';
  private accessKey = 'S_Iw42O7ZroqNCskyd93yHwPEUXHdfKDKMoMhQwaEdA';

  constructor(private http: HttpClient) {}

  getRandomImage(query?: string): Observable<string> {
    const url = `${this.apiUrl}?client_id=${this.accessKey}${
      query ? `&query=${query}` : ''
    }`;
    return this.http
      .get<any>(url)
      .pipe(map((response) => response.urls.regular));
  }
}
