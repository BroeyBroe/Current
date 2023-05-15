import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, map } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { MoviePreview } from '../models/movie-preview.model';
import { Ingredient, Movie } from '../models/movie.model';

interface MovieAPIResponse {
  results: {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    release_date: string;
    vote_average: number;
    genre_ids: number[];
  }[];
}

interface GenreAPIResponse {
  genres: {
    id: number;
    name: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '7f0910d9a8dcd4c900ffeade02cbf7d7';

  constructor(private http: HttpClient) { }

  getMoviesByTitle(title: string) {
    return this.http.get<MovieAPIResponse>('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: this.apiKey,
        query: title
      }
    }).pipe(
      map(response => {
        return response.results.map(movie => {
          return new MoviePreview(
            movie.id.toString(),
            movie.title,
            movie.poster_path
          );
        });
      })
    );
  }

  getMoviesByCategory(category: string) {
    return this.http.get<GenreAPIResponse>('https://api.themoviedb.org/3/genre/movie/list', {
      params: {
        api_key: this.apiKey
      }
    }).pipe(
      concatMap(genreResponse => {
        const genre = genreResponse.genres.find(genre => genre.name.toLowerCase() === category.toLowerCase());
        if (!genre) {
          return [];
        }
        return this.http.get<MovieAPIResponse>('https://api.themoviedb.org/3/discover/movie', {
          params: {
            api_key: this.apiKey,
            with_genres: genre.id.toString()
          }
        }).pipe(
          map(response => {
            return response.results.map(movie => {
              return new MoviePreview(
                movie.id.toString(),
                movie.title,
                movie.poster_path
              );
            });
          })
        );
      })
    );
  }

  getMovieById(id: string) {
    return this.http.get<MovieAPIResponse>(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: this.apiKey
      }
    }).pipe(
      map(response => {
        const movie = response.results[0];
        return new Movie(
          movie.id.toString(),
          movie.title,
          movie.poster_path,
          '', 
          '', 
          '', 
          [],
          '', 
          [], 
          [], 
        );
      }),
      concatMap(movie => {
        return this.http.get<MovieAPIResponse>(`https://api.themoviedb.org/3/movie/${id}/similar`, {
          params: {
            api_key: this.apiKey
          }
        }).pipe(
          map(similarResponse => {
            const similarMovies = similarResponse.results.slice(0, 3).map(movie => {
              return new MoviePreview(
                movie.id.toString(),
                movie.title,
                movie.poster_path
              );
            });
            return { movie, similar: similarMovies };
          })
        );
      })
    );
  }

  getAllCategories() {
    return this.http.get<GenreAPIResponse>('https://api.themoviedb.org/3/genre/movie/list', {
      params: {
        api_key: this.apiKey
      }
    }).pipe(
      map(response => {
        return response.genres.map(category => {
          return new Category(
            category.id.toString(),
            category.name,
            ''
          );
        });
      })
    );
  }
}
