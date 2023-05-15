import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FavouritesComponent } from './components/favourites/favourites.component';
import { MovieDetailsComponent } from '../movie/components/movie-details/movie-details.component';
import { AuthGuardService } from '../auth/services/auth-guard.service';
import { MovieModule } from '../movie/movie.module';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: FavouritesComponent, canActivate: [AuthGuardService] },
  { path: ':id', component: MovieDetailsComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  declarations: [FavouritesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MovieModule,
    SharedModule
  ]
})
export class FavouritesModule { }
