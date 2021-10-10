import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  editProfileEnabled: boolean = false
  componentName: string = "PROFILE"
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
  education: string;
  experience: string;
  projects: string;
  website: string;

  constructor(public authService: AuthService, public navbarHandler: NavbarHandlerService, public db: AngularFirestore, public backendService: BackendService, public applicationSettingsService: ApplicationSettingsService) { }

  ngOnInit(): void {
    this.navbarHandler.addToNavbar(this.componentName);

    this.authService.afauth.user.subscribe(data => {
      this.authService.userAppSettingObservable.subscribe(data => {
        if (data.SelectedOrgAppKey) {
          this.backendService.organizationsData.subscribe(data => {
            if (data.length) {
              this.readUser();
              this.organizationName = this.backendService.getOrganizationName();
              this.applicationSettingsService.getTeamDetails(this.authService.getTeamId()).subscribe(teams => {
              this.teamName = teams[0].TeamName;
              this.managerEmail = teams[0].TeamManagerEmail;
              if(teams[0].TeamManagerEmail == this.email) {
                this.role = "Manager";
              } else {
                this.role = "Member";
              }
              });
            }
          });
        }
      });
    });
    }    
  


  editProfile(){
    this.editProfileEnabled = true;
  }

  editProfileCompleted(data: { completed: boolean }) {
    this.editProfileEnabled = false;
  }

  readUser() {
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
    this.education = this.authService.userAppSetting.Education;
    this.experience = this.authService.userAppSetting.Experience;
    this.projects = this.authService.userAppSetting.Projects;
    this.website = this.authService.userAppSetting.Website;
    if(this.website.includes("https://") == false){
      this.website = "https://"+this.website;
    } 
  }
  
}
