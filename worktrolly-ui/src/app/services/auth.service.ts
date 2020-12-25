import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from "../Interface/UserInterface";
import { Observable } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/functions';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(public afauth: AngularFireAuth, private functions: AngularFireFunctions, private db: AngularFirestore) { }

  async createUserData(user: User) {
    const callable = this.functions.httpsCallable('createNewUser');
    try {
      const result = await callable({ uid: user.uid, photoURL: user.photoURL, displayName: user.displayName, email: user.email, phoneNumber: user.phoneNumber, providerId: user.providerId }).toPromise();
      console.log(result);
    } catch (error) {
      console.error("Error", error);
    }
  }

  async googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afauth.signInWithPopup(provider);
    return this.createUserData(credential.user);
  }

  async logout() {
    await this.afauth.signOut();
  }
}
