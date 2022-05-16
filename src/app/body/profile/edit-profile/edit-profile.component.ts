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
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @Input('uid') uid: string
  @Input('aboutMe') aboutMe: string
  @Input('displayName') displayName: string
  @Input('phoneNumber') phoneNumber: string
  @Input('githubProfile') githubProfile: string
  @Input('linkedInProfile') linkedInProfile: string
  @Input('skills') skills: string
  @Input('education') education: string
  @Input('experience') experience: string
  @Input('projects') projects: string
  @Input('website') website: string
  @Input('userName') oldUserName: string
  @Input('email') email: string

  @Output() editProfileCompleted = new EventEmitter<{ completed: boolean }>();
  componentName: string = "PROFILE"
  enableLoader: boolean = false
  showClose: boolean = false
  public userAvailable: boolean = false;
  userName: string
  userNameIsSame: boolean = true;
  
  constructor(private functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService,  public authService: AuthService) { }

  ngOnInit(): void {
    this.userName = this.oldUserName;
    this.email = this.authService.userAppSetting.email;
  }

  async editProfile() {
    if(this.userAvailable == true || this.oldUserName == this.userName) {
      this.enableLoader = true
      const callable = this.functions.httpsCallable('users/updateUser');

        await callable({Uid: this.uid, Email: this.email, AboutMe: this.aboutMe, DisplayName: this.displayName, PhoneNumber: this.phoneNumber, GithubProfile: this.githubProfile, LinkedInProfile: this.linkedInProfile, Skills: this.skills, Education: this.education, Experience: this.experience, Projects: this.projects, Website: this.website, Username: this.userName }).subscribe({
          next: (data) => {
            console.log("Successful");
            this.showClose = true
            
          },
          error: (error) => {
            console.log("error");
            this.enableLoader = false
            this.errorHandlerService.showError = true;
            this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
            console.error(error);
          },
          complete: () => console.info('Successfully edited profile')
      });
        console.log("Successful");
        this.showClose = true
        
      }

      else {
      console.log("User Not Available");
    }
    
  }

  editProfileDone() {
    this.editProfileCompleted.emit({ completed: true });
  }


  async checkAvailabilityLive() {
    if(this.userName!=this.oldUserName && this.userName!=""){
      this.userNameIsSame = false
    }
    else{
      this.userNameIsSame = true
    }
    const callable = this.functions.httpsCallable('users/checkAvailableUsername');
      await callable({Username: this.userName }).subscribe({
        next: (result) => {
          if(result == "User Already Available"){   
              this.userAvailable = false;

          } else {
            this.userAvailable = true;
          }
        },

        error: (error) => {
          console.log(error);
          this.errorHandlerService.showError = true;
          this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        },
        complete: () => console.info('Successful ')
    });
  }

}
