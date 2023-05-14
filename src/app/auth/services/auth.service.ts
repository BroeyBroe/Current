import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private router: Router) { }

  register(email: string, password: string): Promise<string | void> {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.router.navigate(['']);
      })
      .catch(error => {
        if(error.code == 'auth/email-already-in-use') {
          return 'An account already exists with this email address';
        }
        if(error.code == 'auth/invalid-email') {
          return 'Provided email address is invalid';
        }
        return 'An unknown error is preventing this action, please try again later';
      })
  }

  login(email: string, password: string): Promise<string | void> {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.router.navigate(['']);
      })
      .catch(error => {
        if(error.code == 'auth/user-not-found') {
          return 'No account found with this email address';
        }
        if(error.code == 'auth/wrong-password') {
          return 'Incorrect password provided';
        }
        return 'An unknown error is preventing this action, please try again later';
      })
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['']);
  }
}
