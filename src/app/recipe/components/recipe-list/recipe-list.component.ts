import { Component, Input } from '@angular/core';
import { RecipePreview } from '../../models/recipe-preview.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {

  @Input() recipes: RecipePreview[] = [];

}
