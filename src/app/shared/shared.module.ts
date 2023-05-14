import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorBoxComponent } from './components/error-box/error-box.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HideNonAuthDirective } from './directives/hide-non-auth.directive';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    NotFoundComponent,
    LoadingSpinnerComponent,
    HideNonAuthDirective,
    ErrorBoxComponent, 
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule
  ],
  exports: [
    NotFoundComponent,
    LoadingSpinnerComponent,
    HideNonAuthDirective,
    ErrorBoxComponent 
  ]
})
export class SharedModule { }
