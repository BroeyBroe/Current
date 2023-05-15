import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../models/category.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.scss']
})
export class CategorySelectComponent implements OnInit {

  constructor(private movieService: MovieService, private router: Router, private route: ActivatedRoute) { }

  categories: Category[] = [];
  loading = true;

  ngOnInit(): void {
    this.movieService.getAllCategories().subscribe(response => {
      this.categories = response;
      this.loading = false;
    });
  }

  onNavigateCategory(category: string) {
    this.router.navigate([category], {relativeTo: this.route});
  }

}
