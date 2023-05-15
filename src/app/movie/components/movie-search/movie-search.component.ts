import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit, OnDestroy {
  searchForm: FormGroup = new FormGroup({
    title: new FormControl("", Validators.required)
  });
  trendingMovies: any[] = [];
  loading = true;
  private scrollSubscription: Subscription | undefined;
  private page = 1;
  private readonly scrollTriggerOffset = 300;

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.setupInfiniteScroll();
    this.fetchTrendingMovies();
  }

  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

  fetchTrendingMovies(): void {
    const apiUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=7f0910d9a8dcd4c900ffeade02cbf7d7&page=${this.page}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.trendingMovies = [...this.trendingMovies, ...response.results];
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching trending movies:', error);
        this.loading = false;
      }
    );
  }

  onSubmit(): void {
    const value = this.searchForm.controls['title'].value;

    if (value) {
      this.loading = true;
      this.trendingMovies = [];
      this.page = 1;

      const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=7f0910d9a8dcd4c900ffeade02cbf7d7&query=${value}`;

      this.http.get(apiUrl).subscribe(
        (response: any) => {
          this.trendingMovies = response.results;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching movies by title:', error);
          this.loading = false;
        }
      );
    } else {
      this.fetchTrendingMovies();
    }
  }

  getImageUrl(posterPath: string): string {
    if (posterPath) {
      return `https://image.tmdb.org/t/p/w500${posterPath}`;
    }
    return 'assets/placeholder.jpg';
  }

  private setupInfiniteScroll(): void {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      debounceTime(200),
      distinctUntilChanged()
    );

    this.scrollSubscription = scroll$.subscribe(() => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.offsetHeight;
      const scrollOffset = window.pageYOffset;

      if (documentHeight - (scrollOffset + windowHeight) < this.scrollTriggerOffset && !this.loading) {
        this.page++;
        this.fetchTrendingMovies();
      }
    });
  }

  navigateToDetails(movieId: number): void {
    this.router.navigate(['../details', movieId], { relativeTo: this.route });
  }

  fetchMovieDetails(movieId: number): void {
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=7f0910d9a8dcd4c900ffeade02cbf7d7`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        const ageRating = response.age_rating;
        const summary = response.summary;

        // Use the extracted data as needed (e.g., display in the movie details page)
      },
      (error) => {
        console.error('Error fetching movie details:', error);
      }
    );
  }
}
