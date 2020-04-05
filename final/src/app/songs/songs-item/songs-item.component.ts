import { Component, OnInit, Input } from '@angular/core';
import { Song } from '../song-model';

@Component({
  selector: 'app-songs-item',
  templateUrl: './songs-item.component.html',
  styleUrls: ['./songs-item.component.css']
})
export class SongsItemComponent implements OnInit {
  @Input() song: Song;
  constructor() { }

  ngOnInit() {
  }

}
