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
import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/app/Interface/ActivityInterface';
import { defaultUser, User} from "../../../Interface/UserInterface";
import { UserServiceService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  @Input('activity') activity: Activity

  user: User;

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
    this.getUserDetail();
  }

  getUserDetail() {
    if(this.activity.Uid == "defaultUser") {
      this.user = defaultUser;
    } else {
      this.user = this.userService.users.filter((obj) => {
        return obj.uid == this.activity.Uid
      })[0];
    }
  }

}

