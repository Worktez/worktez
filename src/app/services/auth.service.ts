import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MyOrganizationData, User, UserAppSetting } from "../Interface/UserInterface";
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Observable } from 'rxjs';
import { BackendService } from './backend/backend.service';
import { ThemeService } from './theme/theme.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  public userAppSettingObservable: Observable<UserAppSetting>;

  public myOrgCollectionsData: Observable<MyOrganizationData[]>
  public myTeamsListObservable: Observable<string[]>

  public myOrgCollectionDocData: Observable<MyOrganizationData>

  public organizationAvailable: boolean = true;
  public completedLoadingApplication: boolean = false;

  user: User;
  userAppSetting: UserAppSetting;

  constructor(public afauth: AngularFireAuth, private functions: AngularFireFunctions, private backendService: BackendService, private themeService: ThemeService) { }

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
    const callable = this.functions.httpsCallable('users');
    try {
      const result = await callable({ mode: "create", uid: user.uid, photoURL: user.photoURL, displayName: user.displayName, email: user.email, phoneNumber: user.phoneNumber, providerId: user.providerId }).toPromise();

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

  getUserSettings() {
    const uid = this.getLoggedInUser(); 
    const callable = this.functions.httpsCallable('users');

    this.userAppSettingObservable = callable({ mode: "getUserAppSettings", uid: uid }).pipe(map(res => {
      const data = res.userData as UserAppSetting;
      this.userAppSetting = data;
      if (this.userAppSetting && this.userAppSetting.SelectedOrgAppKey != "") {
        this.organizationAvailable = true;
        this.getListedOrganizationData(data.uid);
        this.backendService.getOrgDetails(this.userAppSetting.SelectedOrgAppKey);
        this.getMyOrgCollectionDocs(data.uid, data.SelectedOrgAppKey);
        this.themeService.changeTheme(data.AppTheme);
      } else {
        this.organizationAvailable = false;
      }
      return { ...data };
    }));
    this.completedLoadingApplication =true;
  }

  getListedOrganizationData(uid: string) {
    const callable = this.functions.httpsCallable("users");
    this.myOrgCollectionsData = callable({mode: "getMyOrgList", Uid: uid}).pipe(
      map(actions => {
        return actions.data as MyOrganizationData[];
    }));
  }

  getMyOrgCollectionDocs(uid, appKey) {
    const callable = this.functions.httpsCallable("users");
    this.myOrgCollectionDocData = callable({mode: "getMyOrgCollectionDocs", Uid: uid, OrgAppKey: appKey}).pipe(
      map(actions => {
        return actions.data as MyOrganizationData;
    }));
  }

  getListedTeams(uid: string, appKey: string) {
    const callable = this.functions.httpsCallable("users");
    this.myTeamsListObservable = callable({mode: "getMyTeamsList", Uid: uid, OrgAppKey: appKey}).pipe(
      map(actions => {
        return actions.data as string[];
    }));  
  }

  getAppKey() {
    return this.userAppSetting.SelectedOrgAppKey;
  }

  getTeamId() {
    return this.userAppSetting.SelectedTeamId;
  }
  getUserEmail(){
    return this.user.email;
  }

}
