import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FavouritesService } from 'src/app/favourites/services/favourites.service';
import { RecipePreview } from '../../models/recipe-preview.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  recipeId!: string | null;
  movie: any;
  loading = true;

  recipeData$!: Observable<{ recipe: Recipe; similar: RecipePreview[] }>;
  authenticated = false;
  authSub: Subscription = new Subscription();
  isFavourite = false;
  favouriteSub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private location: Location,
    private auth: AngularFireAuth,
    private favouriteService: FavouritesService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.recipeId = params.get('id');
      this.fetchMovieDetails();
      if (this.recipeId) {
        this.fetchRecipe(this.recipeId);
      }
    });
    this.authSub = this.auth.authState.subscribe((user) => {
      this.authenticated = user ? true : false;
    });
  }

  fetchMovieDetails(): void {
    if (!this.recipeId) {
      return;
    }

    const apiUrl = `https://api.themoviedb.org/3/movie/${this.recipeId}?api_key=7f0910d9a8dcd4c900ffeade02cbf7d7`;

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

  fetchRecipe(id: string): void {
    this.recipeData$ = this.recipeService.getRecipeById(id);
    this.favouriteSub = this.favouriteService.favourites$.subscribe((favourites) => {
      this.isFavourite = favourites.map((f) => f.id).indexOf(id) !== -1;
    });
  }

  onAddFavourite(recipe: Recipe): void {
    const limitedRecipe = new RecipePreview(recipe.id, recipe.name, recipe.imgURL);
    this.favouriteService.storeFavourites(limitedRecipe);
  }

  onRemoveFavourite(recipe: Recipe): void {
    const limitedRecipe = new RecipePreview(recipe.id, recipe.name, recipe.imgURL);
    this.favouriteService.removeFavourite(limitedRecipe);
  }

  onBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
    this.favouriteSub.unsubscribe();
  }
}
