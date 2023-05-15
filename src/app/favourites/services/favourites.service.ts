import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { MoviePreview } from 'src/app/movie/models/movie-preview.model';
import { ErrorBoxComponent } from 'src/app/shared/components/error-box/error-box.component';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  userID!: string | null;
  favourites: MoviePreview[] = [];
  favourites$ = new BehaviorSubject<MoviePreview[]>([]);
  authToken: any;

  constructor(
    private http: HttpClient,
    private auth: AngularFireAuth,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.auth.authState.subscribe(user => {
      this.userID = user ? user.uid : null;
      if (this.userID) {
        user?.getIdToken(false).then(token => {
          this.authToken = token;
          this.getFavourites();
        });
      } else {
        this.getFavourites();
      }
    });
  }

  getFavourites() {
    if (!this.userID) {
      this.favourites = [];
      this.favourites$.next(this.favourites.slice());
      return;
    }
    this.http
      .get<MoviePreview[]>(
        'https://assessment-2-69e65-default-rtdb.europe-west1.firebasedatabase.app/favourites/' + this.userID + '.json',
        {
          params: {
            auth: this.authToken
          }
        }
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.favourites = response;
            this.favourites$.next(this.favourites.slice());
          } else {
            this.favourites = [];
            this.favourites$.next([]);
          }
        },
        error: (error) => {
          this.dialog
            .open(ErrorBoxComponent, { data: 'Error fetching favourites: ' + error.error.error })
            .afterClosed()
            .subscribe(dialogResponse => {
              console.log(dialogResponse);
            });
        }
      });
  }

  private updateFavourites() {
    this.favourites$.next([...this.favourites]);
  }

  private saveFavouritesToFirebase(successMessage: string, errorMessage: string): Promise<void> {
    if (!this.userID) {
      console.error('User ID is not available.');
      return Promise.reject('User ID is not available.');
    }
    return this.http
      .put<void>(
        'https://assessment-2-69e65-default-rtdb.europe-west1.firebasedatabase.app/favourites/' + this.userID + '.json',
        this.favourites,
        {
          params: {
            auth: this.authToken
          }
        }
      )
      .toPromise();
  }

  storeFavourites(movie: MoviePreview) {
    const index = this.favourites.findIndex(f => f.id === movie.id);
    if (index === -1) {
      this.favourites.push(movie);
      this.updateFavourites();
      this.saveFavouritesToFirebase('Favourites saved successfully', 'Error saving favourites')
        .then(() => {
          this.snackbar
            .open('Favourites saved successfully', 'OK', { duration: 3000 })
            .afterDismissed()
            .subscribe(snackbarResponse => {
              console.log(snackbarResponse);
            });
        })
        .catch(error => {
          console.error('Error saving favourites:', error);
          this.dialog
            .open(ErrorBoxComponent, { data: 'Error saving          favourites: ' + error })
            .afterClosed()
            .subscribe(dialogResponse => {
              console.log(dialogResponse);
            });
        });
    } else {
      console.log('Movie already exists in favourites');
      this.removeFavourite(movie);
    }
  }

  removeFavourite(movie: MoviePreview) {
    const index = this.favourites.findIndex(f => f.id === movie.id);
    if (index !== -1) {
      this.favourites.splice(index, 1);
      this.updateFavourites();
      this.saveFavouritesToFirebase('Favourites removed successfully', 'Error removing favourites')
        .then(() => {
          this.snackbar
            .open('Favourites removed successfully', 'OK', { duration: 3000 })
            .afterDismissed()
            .subscribe(snackbarResponse => {
              console.log(snackbarResponse);
            });
        })
        .catch(error => {
          console.error('Error removing favourites:', error);
          this.dialog
            .open(ErrorBoxComponent, { data: 'Error removing favourites: ' + error })
            .afterClosed()
            .subscribe(dialogResponse => {
              console.log(dialogResponse);
            });
        });
    } else {
      console.log('Movie not found in favourites');
    }
  }
}

