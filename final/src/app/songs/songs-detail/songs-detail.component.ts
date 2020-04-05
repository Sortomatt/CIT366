import { Component, OnInit } from '@angular/core';
import { Song } from '../song-model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SongsService } from '../songs.service';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'app-songs-detail',
  templateUrl: './songs-detail.component.html',
  styleUrls: ['./songs-detail.component.css']
})
export class SongsDetailComponent implements OnInit {
  song: Song;
  nativeWindow: any;
  id: string;

  constructor(private songService: SongsService,
              private windowRefService: WindRefService,
              private route: ActivatedRoute,
              private router: Router) {
    this.nativeWindow = windowRefService.getNativeWindow();
    }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params.id;
        console.log('THIS ID', this.id);
        this.song = this.songService.getSong(this.id);
      }
    );
  }
  // onView() {
  //   if (this.song.url) {
  //     this.nativeWindow.open(this.song.url);
  //   }
  // }

  onDelete() {
    this.songService.deleteSong(this.song),
    this.router.navigate(['/songs'], {relativeTo: this.route});
  }
}
