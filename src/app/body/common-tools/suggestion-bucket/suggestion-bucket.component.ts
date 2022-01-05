import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserAppSetting } from 'src/app/Interface/UserInterface';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';


@Component({
  selector: 'app-suggestion-bucket',
  templateUrl: './suggestion-bucket.component.html',
  styleUrls: ['./suggestion-bucket.component.css']
})
export class SuggestionBucketComponent implements OnInit {

  @Input("email") email: string;
  @Output() selectedEmail = new EventEmitter<{ selected: boolean, data: string }>();

  userName: string;
  photoUrl: string;
  user: UserAppSetting;

  showMoreDetail: boolean = false;
  
  constructor(public userService: UserServiceService,  public router: Router) { }

  ngOnInit(): void {
    this.readTeamMemberName();
  }

  readTeamMemberName(){
    const data = this.userService.getUserData(this.email);
    
    if(data) {
      this.userName = data.displayName;
      this.photoUrl = data.photoURL;
      this.user = data
    }
  }

  selectedOption(value: boolean) {
    this.selectedEmail.emit({ selected: value, data: this.email });
  }

  showUserProfile() {
    this.router.navigate(['/profile', this.user.Username]);
    this.selectedOption(false)
  }
}
