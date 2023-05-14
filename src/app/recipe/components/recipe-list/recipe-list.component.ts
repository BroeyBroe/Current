import { Component, Input } from '@angular/core';
import { RecipePreview } from '../../models/recipe-preview.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {
  @Input() recipes: RecipePreview[] = [];

  navigateToDetails(id: number) {
    // Add your navigation logic here
  }

  getImageUrl(image: string): string {
    // Add your logic to get the image URL
    return 'path/to/image.jpg';
  }
}
