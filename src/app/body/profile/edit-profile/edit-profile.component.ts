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
  @Input('userName') userName: string
  @Input('email') email: string

  @Output() editProfileCompleted = new EventEmitter<{ completed: boolean }>();
  componentName: string = "PROFILE"
  enableLoader: boolean = false
  showClose: boolean = false
  public userAvailable: boolean = false;
  oldUserName: string

  constructor(private functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.oldUserName = this.userName;
  }

  async editProfile() {
    if(this.userAvailable == true || this.oldUserName == this.userName) {
      this.enableLoader = true
      const callable = this.functions.httpsCallable('users/updateUser');
      try {
        await callable({Uid: this.uid, Email: this.email, AboutMe: this.aboutMe, DisplayName: this.displayName, PhoneNumber: this.phoneNumber, GithubProfile: this.githubProfile, LinkedInProfile: this.linkedInProfile, Skills: this.skills, Education: this.education, Experience: this.experience, Projects: this.projects, Website: this.website, Username: this.userName }).toPromise();
        console.log("Successful");
        this.showClose = true
      } catch (error) {
        console.log("error");
        this.enableLoader = false
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
      }
    } else {
      console.log("User Not Available");
    }
  }

  editProfileDone() {
    this.editProfileCompleted.emit({ completed: true });
  }

  async checkAvailability() {
    const callable = this.functions.httpsCallable('users/checkAvailableUsername');
    try {
      const result = await callable({Username: this.userName }).toPromise();
      if(result == "User Already Available"){
        this.userAvailable = false;
      } else {
        this.userAvailable = true;
      }
    } catch (error) {
      console.log(error);
      this.errorHandlerService.showError = true;
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
    }
  }

}
