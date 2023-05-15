import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviePreview } from '../../models/movie-preview.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  movies: MoviePreview[] = [];
  loading = true;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const title = params.get('title');
      this.fetchMovies(title!);
    });
  }

  fetchMovies(title: string) {
    this.loading = true;
    this.movieService.getMoviesByTitle(title).subscribe(movies => {
      this.movies = movies;
      this.loading = false;
    });
  }

}
