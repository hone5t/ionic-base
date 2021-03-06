import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import firebase from 'firebase';
import { Config } from '../../app/config';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {
  public fireAuth: firebase.auth.Auth;
  public userProfileRef: firebase.database.Reference;

  constructor(public http: Http) {
    this.fireAuth = firebase.auth();
    this.userProfileRef = firebase.database().ref(Config.UserProfileRef);
  }

  loginUser(email: string, password: string): firebase.Promise<any> {
    return this.fireAuth.signInWithEmailAndPassword(email,password);
  }

  signupUser(email: string, password: string): firebase.Promise<any> {
    return this.fireAuth.createUserWithEmailAndPassword(email,password)
    .then( newUser => {
      this.userProfileRef.child(newUser.uid).set({
        email: email
      });
    });
  }

  resetPassword(email: string): firebase.Promise<void>{
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  logoutUser(): firebase.Promise<void>{
    // turn the reference off
    this.userProfileRef.child(this.fireAuth.currentUser.uid).off();
    return this.fireAuth.signOut();
  }

}
