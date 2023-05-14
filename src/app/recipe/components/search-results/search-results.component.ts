import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipePreview } from '../../models/recipe-preview.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  recipes: RecipePreview[] = [];
  loading = true;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const title = params.get('title');
      this.fetchRecipes(title!);
    });
  }

  fetchRecipes(title: string) {
    this.loading = true;
    this.recipeService.getRecipesByTitle(title).subscribe(recipes => {
      this.recipes = recipes;
      this.loading = false;
    });
  }

}
