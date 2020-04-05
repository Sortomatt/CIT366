import { Component, OnInit } from '@angular/core';
import { Song } from './song-model';
import { SongsService } from './songs.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {
  selectedSong: Song;

  constructor(private songService: SongsService) { }

  ngOnInit() {
  }

}
