import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipePreview } from 'src/app/recipe/models/recipe-preview.model';
import { FavouritesService } from '../../services/favourites.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit, OnDestroy {

  constructor(private favouriteService: FavouritesService) { }

  favourites: RecipePreview[] = [];
  loading = true;
  favouriteSub = new Subscription;

  ngOnInit(): void {
    this.favouriteSub = this.favouriteService.favourites$.subscribe(favourites => {
      this.favourites = favourites;
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.favouriteSub.unsubscribe();
  }

}
