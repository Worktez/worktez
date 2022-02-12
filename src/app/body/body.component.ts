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
import { User } from '../Interface/UserInterface';
import { ApplicationSettingsService } from '../services/applicationSettings/application-settings.service';
import { AuthService } from '../services/auth.service';
import { PopupHandlerService } from '../services/popup-handler/popup-handler.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

 
  showLoader: boolean = true;
  showlogin: boolean = false;
  teamDataChecked: boolean= false;
  userDataReady: boolean = false;

  constructor(public applicationSettingsService: ApplicationSettingsService, public authService: AuthService, public popupHandlerService: PopupHandlerService) { }

  ngOnInit(): void {
    this.authService.afauth.user.subscribe({
      next: (action) => {
        const data = action as User;
        if (data) {
          this.userDataReady = true;
        } else {
          this.userDataReady = false;
        }

      },
      error: (error) => {
        console.error(error);
        this.userDataReady = false;
      },
      complete: () => console.log("Getting User Data Complete")
    });
  }

  sprintCreated( completed: boolean ) {
    this.popupHandlerService.createNewSprintEnabled= false;
  }

  taskCreated( completed: boolean ) {
    this.popupHandlerService.createNewTaskEnabled= false;
  }

  teamCreated( completed: boolean) {
    this.popupHandlerService.createNewTeamEnabled = false;
  }

  teamUpdated( completed: boolean ) {
    this.popupHandlerService.updateTeamId = undefined;
    this.popupHandlerService.updateTeamEnabled = false;
  }
}
