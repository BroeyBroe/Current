import { Component, Input } from '@angular/core';
import { MoviePreview } from '../../models/movie-preview.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {
  @Input() movies: MoviePreview[] = [];

  navigateToDetails(id: number) {
    // Add your navigation logic here
  }

  getImageUrl(image: string): string {
    // Add your logic to get the image URL
    return 'path/to/image.jpg';
  }
}
