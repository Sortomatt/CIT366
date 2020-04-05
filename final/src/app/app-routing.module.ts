import {Routes, RouterModule } from '@angular/router';
import { SongsComponent } from './songs/songs.component';
import { NgModule } from '@angular/core';
import {SongsEditComponent } from './songs/songs-edit/songs-edit.component';
import { SongsDetailComponent } from './songs/songs-detail/songs-detail.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/songs', pathMatch: 'full' },
  {path: 'songs', component: SongsComponent, children: [
    {path: 'new', component: SongsEditComponent},
    {path: ':id', component: SongsDetailComponent},
    {path: ':id/edit', component: SongsEditComponent}
  ]}
];

@NgModule ({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
