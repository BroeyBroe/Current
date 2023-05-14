import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { RecipePreview } from 'src/app/recipe/models/recipe-preview.model';
import { ErrorBoxComponent } from 'src/app/shared/components/error-box/error-box.component';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  userID!: string | null;
  favourites: RecipePreview[] = [];
  favourites$ = new BehaviorSubject<RecipePreview[]>([]);
  authToken: any;

  constructor(private http: HttpClient, private auth: AngularFireAuth, private snackbar: MatSnackBar, private dialog: MatDialog) {
    this.auth.authState.subscribe(user => {
      this.userID = user ? user.uid : null;
      if(this.userID) {
        user?.getIdToken(false).then(token => {
          this.authToken = token;
          this.getFavourites();
        })
      } else {
        this.getFavourites();
      }
    });
  }

  getFavourites() {
    if(!this.userID) {
      this.favourites = [];
      this.favourites$.next(this.favourites.slice());
      return;
    }
    this.http.get<RecipePreview[]>('https://recipebook-c58b2-default-rtdb.europe-west1.firebasedatabase.app/favourites/' + this.userID + '.json', {
      params: {
        'auth': this.authToken
      }
    })
    .subscribe({
      next: (response) => {
        if(response) {
          this.favourites = response;
          this.favourites$.next(this.favourites.slice());
        }
      },
      error: (error) => {
        this.dialog.open(ErrorBoxComponent, {data: 'Error fetching favourites: ' + error.error.error}).afterClosed().subscribe(dialogResponse => {
          console.log(dialogResponse);        
        });
      }
    });
  }

  storeFavourites(recipe: RecipePreview) {
    this.favourites.push(recipe);
    this.http.put<RecipePreview[]>('https://recipebook-c58b2-default-rtdb.europe-west1.firebasedatabase.app/favourites/' + this.userID + '.json', this.favourites, {params: {'auth': this.authToken}})
    .subscribe(response => {
      this.snackbar.open("Added to favourites", "UNDO", {duration: 3000}).afterDismissed().subscribe(snackbarResponse => {
        if(snackbarResponse.dismissedByAction) {
          this.removeFavourite(recipe);
        }
      });
    });
    this.favourites$.next(this.favourites.slice());
  }

  removeFavourite(recipe: RecipePreview) {
    let i = this.favourites.map(f => f.id).indexOf(recipe.id);
    this.favourites.splice(i, 1);
    this.http.put<RecipePreview[]>('https://recipebook-c58b2-default-rtdb.europe-west1.firebasedatabase.app/favourites/' + this.userID + '.json', this.favourites, {params: {'auth': this.authToken}})
    .subscribe(response => {
      this.snackbar.open("Removed favourite", "UNDO", {duration: 3000}).afterDismissed().subscribe(snackbarResponse => {
        if(snackbarResponse.dismissedByAction) {
          this.storeFavourites(recipe);
        }
      });
    });
    this.favourites$.next(this.favourites.slice());
  }
}
