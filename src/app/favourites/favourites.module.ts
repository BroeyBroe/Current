import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FavouritesComponent } from './components/favourites/favourites.component';
import { MovieDetailsComponent } from '../movie/components/movie-details/movie-details.component';
import { AuthGuardService } from '../auth/services/auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { MovieModule } from '../movie/movie.module'; // Import MovieModule

const routes: Routes = [
  { path: '', component: FavouritesComponent, canActivate: [AuthGuardService] },
  { path: ':id', component: MovieDetailsComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  declarations: [FavouritesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MovieModule // Add MovieModule to imports
  ]
})
export class FavouritesModule { }
