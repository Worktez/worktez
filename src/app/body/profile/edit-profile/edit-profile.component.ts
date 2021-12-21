import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';

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

  enableLoader: boolean = false
  showClose: boolean = false
  public userAvailable: boolean = false;
  oldUserName: string

  constructor(private functions: AngularFireFunctions) { }

  ngOnInit(): void {
    this.oldUserName = this.userName;
  }

  async editProfile() {
    if(this.userAvailable == true || this.oldUserName == this.userName) {
      this.enableLoader = true
      const callable = this.functions.httpsCallable('users');
      try {
        await callable({ mode: "update", Uid: this.uid, Email: this.email, AboutMe: this.aboutMe, DisplayName: this.displayName, PhoneNumber: this.phoneNumber, GithubProfile: this.githubProfile, LinkedInProfile: this.linkedInProfile, Website: this.website, Username: this.userName }).toPromise();
        console.log("Successful");
        this.showClose = true
      } catch (error) {
        console.log("error");
        this.enableLoader = false
      }
    } else {
      console.log("User Not Available");
    }
  }

  editProfileDone() {
    this.editProfileCompleted.emit({ completed: true });
  }

  async checkAvailability() {
    const callable = this.functions.httpsCallable('users');
    try {
      const result = await callable({ mode: "CheckAvailableUsername", Username: this.userName }).toPromise();
      if(result == "User Already Available"){
        this.userAvailable = false;
      } else {
        this.userAvailable = true;
      }
    } catch (error) {
      console.log(error);
    }
  }

}
