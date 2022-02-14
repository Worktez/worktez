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
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ToolsService } from 'src/app/services/tool/tools.service';

@Component({
  selector: 'app-notification-center',
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.css']
})
export class NotificationCenterComponent implements OnInit {

  notificationsList: Notification[] = []
  showLoader: boolean = false;
  showNotificationsList: boolean = false;
  showOldNotificationsList: boolean = false;
  OpenNotifBox: boolean = true;
  display: string;

  

  constructor(public toolService: ToolsService, public functions: AngularFireFunctions, public backendService: BackendService, public authService: AuthService, public applicationSettingService: ApplicationSettingsService) { }

  ngOnInit(): void {
  }

  loadNotifications(notificationStatus) {
    this.showLoader = true;
    this.showNotificationsList = !(this.showNotificationsList);
    if (this.showNotificationsList) 
    {
      this.applicationSettingService.getNotificationsList(notificationStatus).subscribe((data) => {
        this.notificationsList = data;
        this.showLoader = false;
        if (notificationStatus == 1)
          this.resetActiveNotificationCounter();
      });
    }
  }

  resetActiveNotificationCounter() {
    const uid = this.authService.getLoggedInUser();
    const orgDomain = this.backendService.getOrganizationDomain();
    const lastSeenDate = this.toolService.date();
    const callable = this.functions.httpsCallable("notifications/emptyNotifications");
    callable({Uid: uid, OrgDomain: orgDomain, LastSeenDate: lastSeenDate}).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error("active notifications reset");
      },
      complete: () => console.info("notification reset successfully!")
    })
  }

  showOlderNotifications() {
    this.loadNotifications(0);
    this.showOldNotificationsList = true;
  }
} 
