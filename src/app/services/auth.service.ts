import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from "../Interface/UserInterface";
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})

export class AuthService {

  constructor(public afauth: AngularFireAuth, private functions: AngularFireFunctions, private db: AngularFirestore) { }

  async createUser(email: string, password: string, username: string) {
    await this.afauth.createUserWithEmailAndPassword(email, password);
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: username
    }).then(() => {
      this.createUserData(user);
    }).catch(function (error) {
      console.log(error);
    });
  }

  async loginUser(email: string, password: string) {
    await this.afauth.signInWithEmailAndPassword(email, password);
  }

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
