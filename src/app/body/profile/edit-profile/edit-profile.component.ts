import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @Input('uid') uid: string
  @Input('aboutMe') aboutMe: string
  @Input('displayName') displayName: string
  @Input('photoURL') photoURL: string

  @Output() editProfileCompleted = new EventEmitter<{ completed: boolean }>();

  enableLoader: boolean = false
  showClose: boolean = false

  constructor(private functions: AngularFireFunctions,  private router: Router) { }

  ngOnInit(): void {
  }

  async editProfile(){
    this.enableLoader = true 
      const callable = this.functions.httpsCallable('updateUserProfile');
      try {
        await callable({Uid: this.uid, AboutMe: this.aboutMe, DisplayName: this.displayName, PhotoURL: this.photoURL}).toPromise();
        console.log("Successful");
        this.showClose = true
      } catch (error) {
        console.log("error");
        this.enableLoader = false
      }
  }

  editProfileDone(){
    this.editProfileCompleted.emit({ completed: true });
  }
  
}
