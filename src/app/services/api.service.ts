import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError, retry } from 'rxjs';
import { ErrorService } from './error.service';
import {
  LoginResponse,
  ConfessionResponse,
  SingleConfessionResponse,
  playlistResponse,
  SingleEpisode,
  MeetTheTeamResponse,
  EpisodesResponse,
  Episode,
} from '../Models/ApiResponse';
import { Playlist } from '../Models/playlist';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Confession } from '../Models/confession';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  http = inject(HttpClient);
  errorHandler = inject(ErrorService);
  episodesSubject = new BehaviorSubject<Episode[]>([]);
  episodes$ = this.episodesSubject.asObservable();

  private baseUrl = 'https://api.rantsnconfess.com/v1';

  login(credentials: { email: string; password: string }) {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/login`, credentials)
      .pipe(retry(3));
  }

  logout(token: string) {
    return this.http.post(`${this.baseUrl}/logout`, token).pipe(
      retry(3),
      catchError((err: HttpErrorResponse) => {
        this.errorHandler.handle(err);
        return throwError(() => err);
      })
    );
  }

  //confessions
  getConfessions(): Observable<ConfessionResponse[]> {
    return this.http
      .get<ConfessionResponse[]>(`${this.baseUrl}/confessions`)
      .pipe(
        retry(3),
        catchError((err: HttpErrorResponse) => {
          this.errorHandler.handle(err);
          return throwError(() => err);
        })
      );
  }

  postConfession(Confession: Confession) {
    return this.http.post(`${this.baseUrl}/confessions`, Confession).pipe(
      retry(3),
      catchError((err: HttpErrorResponse) => {
        this.errorHandler.handle(err);
        return throwError(() => err);
      })
    );
  }

  getSingleConfession(id: number): Observable<SingleConfessionResponse> {
    return this.http
      .get<SingleConfessionResponse>(`${this.baseUrl}/confessions/${id}`)
      .pipe(
        retry(3),
        catchError((err: HttpErrorResponse) => {
          this.errorHandler.handle(err);
          return throwError(() => err);
        })
      );
  }

  deleteConfession(id: number) {
    return this.http.delete(`${this.baseUrl}/confessions/${id}`).pipe(
      retry(3),
      catchError((err: HttpErrorResponse) => {
        this.errorHandler.handle(err);
        return throwError(() => err);
      })
    );
  }
  patchConfession(id: number, confession: Confession) {
    return this.http
      .patch(`${this.baseUrl}/confessions/${id}`, confession)
      .pipe(
        retry(3),
        catchError((err: HttpErrorResponse) => {
          this.errorHandler.handle(err);
          return throwError(() => err);
        })
      );
  }

  //playlist apicalls

  getAllPlaylists(): Observable<playlistResponse> {
    return this.http.get<playlistResponse>(`${this.baseUrl}/playlists`).pipe(
      retry(3),
      catchError((err: HttpErrorResponse) => {
        this.errorHandler.handle(err);
        return throwError(() => err);
      })
    );
  }

  postPlaylist(playlist: Playlist): Observable<playlistResponse> {
    return this.http
      .post<playlistResponse>(`${this.baseUrl}/playlists`, playlist)
      .pipe(
        retry(3),
        catchError((err: HttpErrorResponse) => {
          this.errorHandler.handle(err);
          return throwError(() => err);
        })
      );
  }

  // addEpisode(id: number, episodesId: number[]) {
  //   return this.http
  //     .post(`${this.baseUrl}/playlists/${id}/episodes`, episodesId)
  //     .pipe(
  //       retry(3),
  //       catchError((err: HttpErrorResponse) => {
  //         this.errorHandler.handle(err);
  //         return throwError(() => err);
  //       })
  //     );
  // }

  addEpisode(playlistId: number, episodeIds: number[]): Observable<any> {
    // Create proper request body format
    const body = {
      episode_ids: episodeIds, // Note the plural 'episode_ids' which APIs typically expect
    };

    return this.http
      .post(`${this.baseUrl}/playlists/${playlistId}/episodes`, body)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          // Enhance error information
          if (err.status === 422) {
            err.error.server_validation_errors = err.error.errors;
          }
          return throwError(() => err);
        })
      );
  }

  getPlaylist(id: number): Observable<SingleEpisode> {
    return this.http.get<SingleEpisode>(`${this.baseUrl}/playlists/${id}`).pipe(
      retry(3),
      catchError((err: HttpErrorResponse) => {
        this.errorHandler.handle(err);
        return throwError(() => err);
      })
    );
  }

  // playlist.service.ts
  updatePlaylist(
    playlistId: number,
    data: { name: string; description: string }
  ): Observable<any> {
    return this.http
      .patch(`${this.baseUrl}/playlists/${playlistId}`, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // Enhance error information
          return throwError(() => error);
        })
      );
  }

  deletePlaylist(playlistId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/playlists/${playlistId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  //team
  getAllTeam(): Observable<MeetTheTeamResponse> {
    return this.http
      .get<MeetTheTeamResponse>(`${this.baseUrl}/team-members`)
      .pipe(
        retry(3),
        catchError((err: HttpErrorResponse) => {
          this.errorHandler.handle(err);
          return throwError(() => err);
        })
      );
  }

  //episodes
  getAllEpisodes(): Observable<EpisodesResponse> {
    return this.http.get<EpisodesResponse>(`${this.baseUrl}/episodes`).pipe(
      retry(3),
      catchError((err: HttpErrorResponse) => {
        this.errorHandler.handle(err);
        return throwError(() => err);
      }),
      tap((episodes: EpisodesResponse) => {
        this.episodesSubject.next(episodes.data);
      })
    );
  }
}
