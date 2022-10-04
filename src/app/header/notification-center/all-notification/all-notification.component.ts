import { Component, Input, OnInit } from '@angular/core';
import { Notification } from 'src/app/Interface/NotificationInterface';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';

declare var jQuery:any;

@Component({
  selector: 'app-all-notification',
  templateUrl: './all-notification.component.html',
  styleUrls: ['./all-notification.component.css']
})
export class AllNotificationComponent implements OnInit {
  @Input('notification') notification: Notification;

  componentName: string="Notifications"
  notificationsList: Notification[] = []
  showLoader: boolean = false;
  showNotificationsList: boolean = false;
  showOldNotificationsList: boolean = false;
  OpenNotifBox: boolean = true;
  display: string;

  constructor(private navbarHandlerService: NavbarHandlerService,public toolService: ToolsService,public router: Router,private location: Location, public functions: AngularFireFunctions, public backendService: BackendService, public authService: AuthService, public applicationSettingService: ApplicationSettingsService) { }

  ngOnInit(): void {
    this.navbarHandlerService.resetNavbar();
    this.navbarHandlerService.addToNavbar(this.componentName);
    this.loadNotifications(0);
  }

  loadNotifications(notificationStatus) {
    this.showLoader = true;
    this.applicationSettingService.getNotificationsList(notificationStatus).subscribe((data) => {
      this.notificationsList = data;
      this.showNotificationsList = !(this.showNotificationsList);
      this.showOldNotificationsList = false;
      this.showLoader = false;
    });
  }
  
  close() {
    this.location.back()
  }
}
