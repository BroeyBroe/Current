import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorySelectComponent } from './components/category-select/category-select.component';
import { RecipeByCategoryComponent } from './components/recipe-by-category/recipe-by-category.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { RecipeItemComponent } from './components/recipe-item/recipe-item.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeSearchComponent } from './components/recipe-search/recipe-search.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  {path: 'search', component: RecipeSearchComponent, children: [
    {path: ':title', component: SearchResultsComponent},
    {path: ':title/:id', component: RecipeDetailsComponent}
  ]},
  {path: 'category', component: CategorySelectComponent, children: [
      {path: ':category', component: RecipeByCategoryComponent},
      {path: ':category/:id', component: RecipeDetailsComponent}
  ]},
];

@NgModule({
  declarations: [
    RecipeSearchComponent,
    CategorySelectComponent,
    RecipeListComponent,
    RecipeItemComponent,
    SearchResultsComponent,
    RecipeDetailsComponent,
    RecipeByCategoryComponent,
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
  exports : [
    RecipeListComponent,
    RecipeItemComponent,
  ]
})
export class RecipeModule { }
