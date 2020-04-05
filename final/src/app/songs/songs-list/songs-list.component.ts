import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Song } from '../song-model';
import { SongsService } from '../songs.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css']
})
export class SongsListComponent implements OnInit, OnDestroy {
  @Output() selectedSongEvent = new EventEmitter <Song>();
  private subscription: Subscription;

  songs: Song[] = [];

  constructor(private songService: SongsService) { }

  ngOnInit() {
    this.songService.getSongs();
    this.subscription = this.songService.songListChangedEvent
    .subscribe(
      (songs: Song[]) => {
        this.songs = songs;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
