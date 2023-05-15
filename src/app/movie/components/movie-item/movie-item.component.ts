import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviePreview } from '../../models/movie-preview.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent {
  @Input() movie!: MoviePreview;
  private readonly API_KEY = '7f0910d9a8dcd4c900ffeade02cbf7d7';
  thumbnailUrl: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getThumbnailUrl(this.movie.id);
  }

  getThumbnailUrl(movieId: string) {
    const id = parseInt(movieId, 10);
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.API_KEY}`;
    this.http.get(apiUrl).subscribe((data: any) => {
      this.thumbnailUrl = `https://image.tmdb.org/t/p/w200${data.poster_path}`;
    });
  }

  onViewMovie() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // searching by title
      if (this.route.snapshot.paramMap.has('title')) {
        let searchTerm = this.route.snapshot.paramMap.get('title');
        this.router.navigate(['../search', searchTerm, this.movie.id]);
      }
      // searching by category
      if (this.route.snapshot.paramMap.has('category')) {
        let searchTerm = this.route.snapshot.paramMap.get('category');
        this.router.navigate(['../category', searchTerm, this.movie.id]);
      }
      // favourites
      if (
        !this.route.snapshot.paramMap.has('category') ||
        !this.route.snapshot.paramMap.has('title')
      ) {
        this.router.navigate(['../favourites', this.movie.id]);
      }
    } else {
      this.router.navigate([this.movie.id], { relativeTo: this.route });
    }
  }
}
