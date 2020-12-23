import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
  });
  signupForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(3)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)]),
  });
  resetLoginForm() {
    this.loginForm.setValue({
      email: "",
      password: ""
    })
  }
  resetSignupForm() {
    this.signupForm.setValue({
      username: "",
      email: "",
      password: ""
    })
  }

  constructor(public afauth: AngularFireAuth, public afs: AngularFirestore) { }

  private createUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `Users/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };
    return userRef.set(data, { merge: true });
  }

  async googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afauth.signInWithPopup(provider);
    return this.createUserData(credential.user);
  }

  async logout() {
    await this.afauth.signOut();
  }

  async createUser(email: string, password: string, username: string) {
    await this.afauth.createUserWithEmailAndPassword(email, password);
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: username
    }).then(() => {
      this.createUserData(user);
      this.signupForm.reset();
      this.resetSignupForm();
    }).catch(function (error) {
      console.log(error);
    });
  }

  async loginUser(email: string, password: string) {
    await this.afauth.signInWithEmailAndPassword(email, password);
    this.loginForm.reset();
    this.resetLoginForm();
  }
}
