import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SongsService } from '../songs.service';
import { NgForm } from '@angular/forms';
import { Song } from '../song-model';

@Component({
  selector: 'app-songs-edit',
  templateUrl: './songs-edit.component.html',
  styleUrls: ['./songs-edit.component.css']
})
export class SongsEditComponent implements OnInit {
  id: string;
  originalSong: Song;
  song: Song;
  editMode = true;

  constructor(private songService: SongsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params.id;
          if (this.id === undefined || this.id === null) {
            this.editMode = false;
            return;
          }
          this.originalSong = this.songService.getSong(this.id);
          if ( this.originalSong === undefined || this.originalSong === null) {
            this.editMode = false;
            return;
          }
          this.editMode = true;
          this.song = JSON.parse(JSON.stringify(this.originalSong));
        });
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    const newSong = new Song(value.id, value.name, value.description, value.author);

    if (this.editMode) {
      this.songService.updateSong(this.originalSong, newSong);
    } else {
      this.songService.addSong(newSong);
    }
    this.router.navigate(['/songs']);
  }
  onCancel() {
    this.router.navigate(['/songs']);
  }
}
