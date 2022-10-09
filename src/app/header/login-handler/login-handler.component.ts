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
import { AuthService } from 'src/app/services/auth/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { StartServiceService } from 'src/app/services/start/start-service.service';

@Component({
  selector: 'app-login-handler',
  templateUrl: './login-handler.component.html',
  styleUrls: ['./login-handler.component.css']
})
export class LoginHandlerComponent implements OnInit {
  user: User
  authserviceUserChecked: boolean = false

  organizationAvailable: boolean = false;
  constructor(public startService: StartServiceService, public authService: AuthService, public router: Router, public backendService: BackendService) { }

  ngOnInit(): void {
    if (!this.startService.applicationStarted)
      this.startService.startApplication();
  }

}
