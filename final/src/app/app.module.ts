import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SongsComponent } from './songs/songs.component';
import { HeaderComponent } from './header.component';
import { SongsDetailComponent } from './songs/songs-detail/songs-detail.component';
import { SongsEditComponent } from './songs/songs-edit/songs-edit.component';
import { SongsItemComponent } from './songs/songs-item/songs-item.component';
import { SongsListComponent } from './songs/songs-list/songs-list.component';
import { SongsViewComponent } from './songs/songs-view/songs-view.component';
import { AppRoutingModule } from './app-routing.module';
import { WindRefService } from './wind-ref.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SongsComponent,
    SongsDetailComponent,
    SongsEditComponent,
    SongsItemComponent,
    SongsListComponent,
    SongsViewComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [WindRefService],
  bootstrap: [AppComponent]
})
export class AppModule { }
