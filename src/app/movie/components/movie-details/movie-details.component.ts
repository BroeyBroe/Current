import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FavouritesService } from 'src/app/favourites/services/favourites.service';
import { MoviePreview } from '../../models/movie-preview.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movieId!: string | null;
  movie: any;
  loading = true;

  movieData$!: Observable<{ movie: Movie; similar: MoviePreview[] }>;
  authenticated = false;
  authSub: Subscription = new Subscription();
  isFavourite = false;
  favouriteSub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location,
    private auth: AngularFireAuth,
    private favouriteService: FavouritesService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.movieId = params.get('id');
      this.fetchMovieDetails();
      if (this.movieId) {
        this.fetchMovie(this.movieId);
      }
    });
    this.authSub = this.auth.authState.subscribe((user) => {
      this.authenticated = user ? true : false;
    });
  }

  fetchMovieDetails(): void {
    if (!this.movieId) {
      return;
    }

    const apiUrl = `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=7f0910d9a8dcd4c900ffeade02cbf7d7`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.movie = response;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching movie details:', error);
        this.loading = false;
      }
    );
  }

  fetchMovie(id: string): void {
    this.movieData$ = this.movieService.getMovieById(id);
    this.favouriteSub = this.favouriteService.favourites$.subscribe((favourites) => {
      this.isFavourite = favourites.map((f) => f.id).indexOf(id) !== -1;
    });
  }

  onAddFavourite(movie: Movie): void {
    const limitedMovie = new MoviePreview(movie.id, movie.name, movie.imgURL);
    this.favouriteService.storeFavourites(limitedMovie);
  }

  onRemoveFavourite(movie: Movie): void {
    const limitedMovie = new MoviePreview(movie.id, movie.name, movie.imgURL);
    this.favouriteService.removeFavourite(limitedMovie);
  }

  onBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
    this.favouriteSub.unsubscribe();
  }
}
