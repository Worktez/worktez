/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* 
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/
import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MyEducationData, MyExperienceData, MyOrganizationData, MyProjectData, User, UserAppSetting } from "../Interface/UserInterface";
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

  public myOrgCollectionDocData: MyOrganizationData

  public organizationAvailable: boolean = true;
  public completedLoadingApplication: boolean = false;

  user: User;
  userAppSetting: UserAppSetting;
  public userName:string = "";
  public landingToSocial: boolean = false;

  educations: MyEducationData;
  public educationCollectionData: Observable<MyEducationData>

  experiences: MyExperienceData;
  public experienceCollectionData: Observable<MyExperienceData>

  projects: MyProjectData;
  public projectCollectionData: Observable<MyProjectData>

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
    const callable = this.functions.httpsCallable('users/createNewUser');
      console.log("create new user from ui");
      const result = await callable({ uid: user.uid, photoURL: user.photoURL, displayName: user.displayName, email: user.email, phoneNumber: user.phoneNumber, providerId: user.providerId }).subscribe({
        next: (data) => {
          console.log("Successful ");
        },
        error: (error) => {
          console.error("Error", error);
        },
        complete: () => console.info('Successful ')
    });

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
    this.landingToSocial = false;
    let uid="";
    if(this.userName == ""){
      uid = this.getLoggedInUser(); 
    }
    const callable = this.functions.httpsCallable('users/getUserAppSettings');

    this.userAppSettingObservable = callable({ Uid: uid, Username: this.userName }).pipe(map(res => {
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
    const callable = this.functions.httpsCallable("users/getMyOrgList");
    this.myOrgCollectionsData = callable({Uid: uid}).pipe(
      map(actions => {
        return actions.data as MyOrganizationData[];
    }));
  }

  getMyOrgCollectionDocs(uid, appKey) {
    const callable = this.functions.httpsCallable("users/getMyOrgCollectionDocs");
     callable({Uid: uid, OrgAppKey: appKey}).pipe(
      map(actions => {
        return actions.data as MyOrganizationData;
    })).subscribe({
      next: (data) =>{
        this.myOrgCollectionDocData = data;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => console.log("Getting My Organisation Data Complete")
    })
      
  }

  getListedTeams(uid: string, appKey: string) {
    const callable = this.functions.httpsCallable("users/getMyTeamsList");
    this.myTeamsListObservable = callable({Uid: uid, OrgAppKey: appKey}).pipe(
      map(actions => {
        return actions.data as string[];
    }));  
  }

  getUserEducation(uid: string) {
    const callable = this.functions.httpsCallable("users/getAllEducation");
    this.educationCollectionData = callable({Uid: uid }).pipe(
      map(actions => {
        this.educations = actions.data as MyEducationData;
        return this.educations;
      }));
      return this.educationCollectionData;
  }

  getUserExperience(uid: string) {
    const callable = this.functions.httpsCallable("users/getAllExperience");
    this.experienceCollectionData = callable({Uid: uid }).pipe(
      map(actions => {
        this.experiences = actions.data as MyExperienceData;
        return this.experiences;
      }));
      return this.experienceCollectionData;
  }
  
  getUserProject(uid: string) {
    const callable = this.functions.httpsCallable("users/getAllProject");
    this.projectCollectionData = callable({Uid: uid }).pipe(
      map(actions => {
        this.projects = actions.data as MyProjectData;
        return this.projects;
      }));
      return this.projectCollectionData;
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
