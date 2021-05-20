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
  @Input('displayName') displayName: string
  @Input('bio') bio: string
  @Output() editProfileCompleted = new EventEmitter<{ completed: boolean }>();

  enableLoader: boolean = false

  constructor(private functions: AngularFireFunctions,  private router: Router) { }

  ngOnInit(): void {
  }

  async editProfile(){
      this.enableLoader = true;
      const callable = this.functions.httpsCallable('updateUserProfile');
      try {
        const result = await callable({Uid: this.uid, DisplayName: this.displayName, Bio: this.bio}).toPromise();
        console.log("Successful");
        console.log(result);
        this.enableLoader = false;
        this.editProfileCompleted.emit({ completed: true });
      } catch (error) {
        console.log("error");
        this.enableLoader = false;
      }
  }
  
}
