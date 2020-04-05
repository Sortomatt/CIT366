import { Injectable, EventEmitter } from '@angular/core';
import { Song } from './song-model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  songListChangedEvent = new Subject<Song[]>();
  songs: Song[] = [];
  songChangedEvent = new EventEmitter<Song[]>();
  maxSongId: number;

  constructor(private http: HttpClient) {}
  getSong(id: string): Song {
    for (const song of this.songs) {
      if (song.id === id) {
        console.log('get songs ', song);
        return song;
      }
    }
    return null;
  }

  // getSongs() {
  //   this.http
  //     .get<{ message: string, songs: Song[]}>('http://localhost:3000/songs/')
  //     .subscribe((responseData) => {
  //       this.songs = responseData.songs;
  //       this.maxSongId = this.getMaxId();
  //       this.songs.sort((a, b) =>
  //         // tslint:disable-next-line: no-string-literal
  //         a['name'] ? 1 : a['name'] > b['name'] ? -1 : 0
  //       );
  //       this.songListChangedEvent.next(this.songs.slice());
  //     });
  // }


  getSongs() {
    this.http
      .get('http://localhost:3000/songs/')
      .subscribe((songs: Song[]) => {
        this.songs = songs;
        this.maxSongId = this.getMaxId();
        this.songs.sort((a, b) =>
          // tslint:disable-next-line: no-string-literal
          a['name'] ? 1 : a['name'] > b['name'] ? -1 : 0
        );
        this.songListChangedEvent.next(this.songs.slice());
      });
  }


  storeSongs() {
    const songs = JSON.stringify(this.songs);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http
      .put(
        'http://localhost:3000/songs/',
        songs
      )
      .subscribe(response => {
        console.log(response);
        this.songListChangedEvent.next(this.songs.slice());
      });
  }

  getMaxId(): number {
    let maxId = 0;
    for (const song of this.songs) {
      const currentId = parseInt(song.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
      return maxId;
    }
  }

    addSong(song: Song) {
      if (!song) {
        return;
      }

      const headers = new HttpHeaders({
        'Content-type': 'application/json'
      });

      song.id = '';
      const strSong = JSON.stringify(song);

      // tslint:disable-next-line: object-literal-shorthand
      this.http.post('http://localhost:3000/songs', strSong, {headers: headers})
        // tslint:disable-next-line: align
        .subscribe(
          (songs: Song[]) => {
            this.songs = songs;
            this.songListChangedEvent.next(this.songs.slice());
          });
  }

  updateSong(originalSong: Song, newSong: Song) {
    if (!originalSong || !newSong) {
      return;
    }
    const pos = this.songs.indexOf(originalSong);
    if (pos < 0) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const strSong = JSON.stringify(newSong);
    this.http
      .patch(
        'http://localhost:3000/song/' + originalSong.id,
        strSong,
        // tslint:disable-next-line: object-literal-shorthand
        { headers: headers }
      )
      // tslint:disable-next-line: align
      .subscribe((songs: Song[]) => {
        this.songs = songs;
        this.songChangedEvent.next(this.songs.slice());
      });
  }

  deleteSong(song: Song) {
    if (!song) {
      return;
    }
    this.http
      .delete('http://localhost:3000/song/' + song.id)
      .subscribe((songs: Song[]) => {
        this.songs = songs;
        this.songChangedEvent.next(this.songs.slice());
      });
  }
}
