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
import { UserServiceService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-speed-images',
  templateUrl: './speed-images.component.html',
  styleUrls: ['./speed-images.component.css']
})
export class SpeedImagesComponent implements OnInit {

  @Input('emails') emails: string[]

  constructor(public userService: UserServiceService) { }

  watcherList: string[] = [];

  ngOnInit(): void {
    if (this.emails.length) {
      this.userService.getPhotoList(this.emails);
      this.userService.photoUrlObservable.subscribe(data => {
      this.watcherList = data;
      }); 
    }
  }
}
