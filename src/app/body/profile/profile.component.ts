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

  constructor(public authService: AuthService, public navbarHandler: NavbarHandlerService, public db: AngularFirestore, public backendService: BackendService, public applicationSettingsService: ApplicationSettingsService) { }

  ngOnInit(): void {
    this.navbarHandler.addToNavbar(this.componentName);

    this.authService.afauth.user.subscribe(data => {
      this.authService.userAppSettingObservable.subscribe(
        data =>{
          if(data.AppKey) {
          this.photoURL = data.photoURL;
          this.displayName = data.displayName;
          this.email = data.email;
          this.uid = data.uid;
          this.aboutMe = data.AboutMe;
          this.appTheme = data.AppTheme;
          this.phoneNumber = data.phoneNumber;
          this.linkedInProfile = data.LinkedInProfile;
          this.githubProfile = data.GithubProfile;
          }
        }
        );

        this.organizationName = this.backendService.getOrganizationName();
        this.applicationSettingsService.getTeamDetails(this.authService.getTeamId()).subscribe(teams => {
          this.teamName = teams[0].TeamName;
          if(teams[0].TeamManagerEmail == this.email) {
            this.role = "Manager";
          } else {
            this.role = "Member";
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

}
