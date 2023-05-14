import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../models/category.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.scss']
})
export class CategorySelectComponent implements OnInit {

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  categories: Category[] = [];
  loading = true;

  ngOnInit(): void {
    this.recipeService.getAllCategories().subscribe(response => {
      this.categories = response;
      this.loading = false;
    });
  }

  onNavigateCategory(category: string) {
    this.router.navigate([category], {relativeTo: this.route});
  }

}
