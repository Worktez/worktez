import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User, UserAppSetting } from "../Interface/UserInterface";
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BackendService } from './backend.service';
@Injectable({
  providedIn: 'root',
})

export class AuthService {

  public userAppSettingObservable: Observable<UserAppSetting>;
  public userAppSettingDocument: AngularFirestoreDocument<UserAppSetting>;

  user: User;
  userAppSetting: UserAppSetting;

  constructor(public afauth: AngularFireAuth, private functions: AngularFireFunctions, private db: AngularFirestore, private backendService: BackendService) { }

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
    this.user = credential.user;
    return this.createUserData(credential.user);
  }

  async logout() {
    await this.afauth.signOut();
  }

  getLoggedInUser() {
    return this.user.uid;
  }

  async getUserSettings() {
    const uid = this.getLoggedInUser();
    this.userAppSettingDocument = this.db.doc<UserAppSetting>('Users/' + uid);
    try {
      await this.userAppSettingDocument.ref.get().then(doc => {
        if (doc.exists) {
          this.userAppSetting = doc.data();
          if (this.userAppSetting.AppKey != "" || this.userAppSetting.AppKey != undefined) {
            this.backendService.getOrgDetails(this.userAppSetting.AppKey);
          }
        } else {
          console.error("Document does not exists!")
        }
      });
      return this.userAppSetting;
    } catch (error) {
      return "Error";
    }
  }

  getAppKey() {
    return this.userAppSetting.AppKey;
  }

  getTeamId() {
    return this.userAppSetting.TeamId;
  }
  
  getUserData() {
    return this.userAppSetting;
  }

}
