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
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { ApplicationSettingsService } from '../services/applicationSettings/application-settings.service';
import { AuthService } from '../services/auth.service';
import { PopupHandlerService } from '../services/popup-handler/popup-handler.service';
import { StartServiceService } from '../services/start/start-service.service';

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
  uid:string = ""
  appTheme:string = ""
  public useEmulator = environment.useEmulators;
  constructor(public startService: StartServiceService, public applicationSettingsService: ApplicationSettingsService, public authService: AuthService, public popupHandlerService: PopupHandlerService, public cookieService: CookieService) { }

  ngOnInit(): void {
    this.appTheme = this.cookieService.get("userAppTheme")
    this.uid = this.cookieService.get("useruid")
  }

  sprintCreated( completed: boolean ) {
    this.popupHandlerService.createNewSprintEnabled= false;
  }

  taskCreated( completed: boolean ) {
    this.popupHandlerService.createNewTaskEnabled= false;
  }

  meetScheduled( completed: boolean ){
    this.popupHandlerService.scheduleMeetEnabled = false;
  }

  teamCreated( completed: boolean) {
    this.popupHandlerService.createNewTeamEnabled = false;
  }
}
