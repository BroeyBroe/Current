import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviePreview } from '../../models/movie-preview.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-by-category',
  templateUrl: './movie-by-category.component.html',
  styleUrls: ['./movie-by-category.component.scss']
})
export class MovieByCategoryComponent implements OnInit {

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  loading = true;
  movies: MoviePreview[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.loading = true;
      const category = params.get('category');
      this.fetchMovies(category!);      
    });
  }

  fetchMovies(category: string) {
    this.movieService.getMoviesByCategory(category).subscribe(response => {
      this.movies = response;
      this.loading = false;
    });
  }

}
