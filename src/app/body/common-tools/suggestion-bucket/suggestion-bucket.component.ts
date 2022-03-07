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
  @Input("showOnlyProfilePic") showOnlyProfilePic: boolean = false;
  @Output() selectedEmail = new EventEmitter<{ selected: boolean, data: string }>();

  userName: string;
  photoUrl: string;
  user: UserAppSetting;

  showMoreDetail: boolean = false;
  showUser: boolean = false
  
  constructor(public userService: UserServiceService,  public router: Router) { }

  ngOnInit(): void {
   
    this.readTeamMemberName();
  }

  readTeamMemberName(){
    const data = this.userService.getUserData(this.email);

    if(data != undefined) {
      this.userName = data.displayName;
      this.photoUrl = data.photoURL;
      this.user = data
      this.showUser = true
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
