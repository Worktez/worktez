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
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Interface/UserInterface';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-login-handler',
  templateUrl: './login-handler.component.html',
  styleUrls: ['./login-handler.component.css']
})
export class LoginHandlerComponent implements OnInit {
  user: User
  authserviceUserChecked: boolean = false

  organizationAvailable: boolean = false;
  constructor(public authService: AuthService, public router: Router, public backendService: BackendService) { }

  ngOnInit(): void {
    this.authService.afauth.user.subscribe({
      next: (action) =>{
        this.authService.completedLoadingApplication = false;
      const data = action as User;
      if(data) {
        this.user = data
        this.authService.user = data;
        this.authService.getUserSettings(); 
        this.authserviceUserChecked =true;
      } else {
        this.authService.completedLoadingApplication = true;
      }
 
      },
      error: (error) => {
        this.authService.completedLoadingApplication = true;
        console.error(error);
      },
      complete: () => console.log("Getting User data Successful")
    });
  }

}
