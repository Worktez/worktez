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
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MyEducationData, MyExperienceData, MyProjectData, User, UserAppSetting } from 'src/app/Interface/UserInterface';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { FileData } from 'src/app/Interface/FileInterface';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { map } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  componentName: string = "PROFILE"
  
  editProfilePicEnabled: boolean = false
  editProfileEnabled: boolean = false
  editEducationEnabled: boolean = false
  editProjectEnabled: boolean = false
  editSkillsEnabled: boolean = false
  editWorkEnabled: boolean = false
  
  educationModalMode: string
  educationModalData: MyEducationData
  workModalMode: string
  workModalData: MyExperienceData
  projectModalMode: string
  projectModalData: MyProjectData

  uid: string
  photoURL: string
  displayName: string
  email: string
  aboutMe: string
  appTheme: string
  phoneNumber: string
  organizationName: string
  teamName: string
  role: string
  githubProfile: string;
  linkedInProfile: string;
  managerEmail: string;
  dateOfJoining: string;
  skills: string;
  website: string;
  username: string;
  
  sameUser: boolean = true;

  imageUrl: string = "";
  profilePicFile: FileData;
  imageReady: boolean = false

  educations: MyEducationData[];
  experiences: MyExperienceData[];
  projects: MyProjectData[];

  userData : User[]

  constructor(public functions: AngularFireFunctions, public startService: StartServiceService, private popupHandler: PopupHandlerService, public authService: AuthService, private route: ActivatedRoute, public navbarHandler: NavbarHandlerService, public backendService: BackendService, public applicationSettingsService: ApplicationSettingsService, public userService: UserServiceService, private router: Router) {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        this.ngOnInit();
      }
    });
  }

  ngOnInit(): void {
    this.popupHandler.resetPopUps();
    this.navbarHandler.addToNavbar(this.componentName);

    this.username = this.route.snapshot.params['username'];
    this.authService.userName = this.username;
    if(this.startService.showTeams) {
      this.readUser();
      this.organizationName = this.backendService.getOrganizationName();
      this.teamName = this.startService.teamName;
      this.managerEmail = this.startService.managerEmail;
      this.role = this.startService.role;
    } else {
      this.startService.userDataStateObservable.subscribe((data) => {
        if(data){
          this.readUser();
          this.startService.applicationDataStateObservable.subscribe((data)=> {
            this.organizationName = this.backendService.getOrganizationName();
            this.teamName = this.startService.teamName;
            this.managerEmail = this.startService.managerEmail;
            this.role = this.startService.role;
          });
        }
      });
    }
    this.checkSameUser();
  }
  checkSameUser(){
    if (this.authService.userAppSetting.Username == this.username){
      this.sameUser=true;
    }
    else{
      this.sameUser=false;
    }
  }
  editProfile() {
    this.editProfileEnabled = true;
  }

  editProfilePic() {
    this.editProfilePicEnabled = true;
  }

  editEducation(mode: string, educationId: number) {
    this.educationModalMode = mode;
    if(educationId >= 0){
      this.educationModalData = this.educations[educationId];
    } else {
      this.educationModalData = null;
    }
    this.editEducationEnabled = true;
  }

  editProject(mode: string, projectId: number) {
    this.projectModalMode = mode;
    if(projectId >= 0){
      this.projectModalData = this.projects[projectId];
    } else {
      this.projectModalData = null
    }
    this.editProjectEnabled = true;
  }

  editSkills() {
    this.editSkillsEnabled = true;
  }

  editWork(mode: string, workId: number) {
    this.workModalMode = mode;
    this.workModalData = this.experiences[workId];
    this.editWorkEnabled = true;
  }

  editProfileCompleted(data: { completed: boolean }) {
    this.editProfileEnabled = false;
  }

  editEducationCompleted(data: { completed: boolean }) {
    this.editEducationEnabled = false;
    this.readUserEducation(this.uid);
  }
  
  editWorkCompleted(data: { completed: boolean }) {
    this.editWorkEnabled = false;
    this.readUserExperience(this.uid);
  }
  
  editProjectCompleted(data: { completed: boolean }) {
    this.editProjectEnabled = false;
    this.readUserProject(this.uid);
  }
  
  editSkillsCompleted(data: { completed: boolean }) {
    this.editSkillsEnabled = false;
    this.readUser();
  }
  
  editProfilePicCompleted(data: { completed: boolean }) {
    this.readUser();
  }

  readUser() {
    if(this.authService.userAppSetting.Username == this.username){
      this.displayName = this.authService.userAppSetting.displayName;
      this.email = this.authService.userAppSetting.email;
      this.uid = this.authService.userAppSetting.uid;
      this.aboutMe = this.authService.userAppSetting.AboutMe;
      this.appTheme = this.authService.userAppSetting.AppTheme;
      this.photoURL = this.authService.userAppSetting.photoURL;
      this.phoneNumber = this.authService.userAppSetting.phoneNumber;
      this.linkedInProfile = this.authService.userAppSetting.LinkedInProfile;
      this.githubProfile = this.authService.userAppSetting.GithubProfile;
      this.dateOfJoining = this.authService.userAppSetting.DateOfJoining;
      this.skills = this.authService.userAppSetting.Skills;
      this.website = this.authService.userAppSetting.Website;
      if (this.website.includes("https://") == false) {
        this.website = "https://" + this.website;
      }
      this.readUserEducation(this.uid);
      this.readUserExperience(this.uid);
      this.readUserProject(this.uid);
      this.readUserProfilePic(this.uid);

      this.sameUser = true;
    }
    else{
      const data = this.userService.getUserNameData(this.username);
      if(data != null) {
        this.displayName = data.displayName;
        this.email = data.email;
        this.uid = data.uid;
        this.aboutMe = data.AboutMe;
        this.photoURL = data.photoURL;
        this.phoneNumber = data.phoneNumber;
        // this.linkedInProfile = data.LinkedInProfile;
        // this.githubProfile = data.LinkedInProfile;
        // this.dateOfJoining = data.DateOfJoining;
        // this.skills = data.Skills;
        // this.website = data.Website;
        if (this.website.includes("https://") == false) {
          this.website = "https://" + this.website;
        }
        this.readUserEducation(this.uid);
        this.readUserExperience(this.uid);
        this.readUserProject(this.uid);
        this.readUserProfilePic(this.uid);

        this.sameUser = false;
      }
      else{
        const callable = this.functions.httpsCallable("users/getUserByUsername");
        callable({Username : this.username}).pipe(map(res => {
          const data = res.userData as UserAppSetting;
          return { ...data }
      })).subscribe({
        next: (data:UserAppSetting) => {
          console.log(data);
          this.displayName = data.displayName;
          this.email = data.email;
          this.uid = data.uid;
          this.aboutMe = data.AboutMe;
          this.photoURL = data.photoURL;
          this.phoneNumber = data.phoneNumber;
          this.linkedInProfile = data.LinkedInProfile;
          this.githubProfile = data.LinkedInProfile;
          this.dateOfJoining = data.DateOfJoining;
          this.skills = data.Skills;
          this.website = data.Website;
          if (this.website.includes("https://") == false) {
            this.website = "https://" + this.website;
          }
          this.readUserEducation(this.uid);
          this.readUserExperience(this.uid);
          this.readUserProject(this.uid);
  
          this.sameUser = false;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => console.info('Getting Task successful')
      });
    }
  }
}

  readUserProfilePic(uid: string) {
    this.authService.getUserProfilePic(uid).subscribe(fileData => {
      if(fileData[fileData.length-1] != undefined) {
        this.imageUrl = fileData[fileData.length-1].FileUrl;
        this.profilePicFile = fileData[fileData.length-1];
      }
      this.imageReady = true
    });
  }

  readUserEducation(uid: string) {
    this.authService.getUserEducation(uid).subscribe(eduData => {
      this.educations = eduData;
    });
  }
  
  readUserExperience(uid: string) {
    this.authService.getUserExperience(uid).subscribe(expData => {
      this.experiences = expData;
    });
  }
  
  readUserProject(uid: string) {
    this.authService.getUserProject(uid).subscribe(projData => {
      this.projects = projData;
    });
  }
}
