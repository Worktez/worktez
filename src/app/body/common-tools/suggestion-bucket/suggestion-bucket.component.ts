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
import { UserBasicSetting } from 'src/app/Interface/UserInterface';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';


@Component({
  selector: 'app-suggestion-bucket',
  templateUrl: './suggestion-bucket.component.html',
  styleUrls: ['./suggestion-bucket.component.css']
})
export class SuggestionBucketComponent implements OnInit {

  @Input("email") email: string;
  @Input("showOnlyProfilePic") showOnlyProfilePic: boolean = false;

  @Input("showEmail") showEmail: boolean;
  @Input("showUserBasic") showUserBasic: boolean;
  @Output() selectedEmail = new EventEmitter<{ selected: boolean, data: string }>();

  displayName: string;
  photoUrl: string;
  user: UserBasicSetting;

  showMoreDetail: boolean = false;
  showUser: boolean = false
  showText: boolean = false

  constructor(public userService: UserServiceService,  public router: Router) { }

  ngOnInit(): void {
   
    this.readTeamMemberName();
  }

  readTeamMemberName(){
    const data = this.userService.getUserData(this.email);
    if(data != undefined) {
      this.displayName = data.displayName;
      this.photoUrl = data.photoURL;
      this.user = data
      this.showUser = true
    } else {
      this.showEmail = true
      this.showUser = true
      this.displayName = null
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
