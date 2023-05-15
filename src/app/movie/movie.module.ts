import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { CategorySelectComponent } from './components/category-select/category-select.component';
import { MovieByCategoryComponent } from './components/movie-by-category/movie-by-category.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ShortenPipe } from './pipes/shorten.pipe';

const routes: Routes = [
  {
    path: 'search', component: MovieSearchComponent, children: [
      { path: ':title', component: SearchResultsComponent },
      { path: ':title/:id', component: MovieDetailsComponent }
    ]
  },
  {
    path: 'category', component: CategorySelectComponent, children: [
      { path: ':category', component: MovieByCategoryComponent },
      { path: ':category/:id', component: MovieDetailsComponent }
    ]
  },
];

@NgModule({
  declarations: [
    MovieSearchComponent,
    CategorySelectComponent,
    MovieListComponent,
    MovieItemComponent,
    SearchResultsComponent,
    MovieDetailsComponent,
    MovieByCategoryComponent,
    ShortenPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule
  ],
  exports: [
    MovieListComponent,
    MovieItemComponent,
  ]
})
export class MovieModule { }
