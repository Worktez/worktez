/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* 
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
*Author:sanjaykrishna1203@gmail.com
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/
import { Component, Input, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-profile-pictures',
  templateUrl: './profile-pictures.component.html',
  styleUrls: ['./profile-pictures.component.css']
})
export class ProfilePicturesComponent implements OnInit {

  @Input('emails') emails: string[]
  photoUrlReady: boolean = false

  constructor(public userService: UserServiceService) { }

  ProfileList: string[] = [];

  ngOnInit(): void {
    if (this.emails.length) {
      this.userService.getPhotoList(this.emails);
      this.userService.photoUrlObservable.subscribe(data => {
      this.ProfileList = data;
      this.photoUrlReady = true;
      }); 
    }
  }

}
