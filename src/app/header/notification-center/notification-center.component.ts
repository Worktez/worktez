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
import { Notification } from 'src/app/Interface/NotificationInterface';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-notification-center',
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.css']
})
export class NotificationCenterComponent implements OnInit {

  notificationsList: Notification[] = []
  showLoader: boolean = false;

  constructor(public backendService: BackendService, public authService: AuthService, public applicationSettingService: ApplicationSettingsService) { }

  ngOnInit(): void {
    
  }

  loadNotifications() {
    this.showLoader = true;
    this.applicationSettingService.getNotificationsList().subscribe((data) => {
      this.notificationsList = data;
      this.showLoader = false;
    });
  }
}
