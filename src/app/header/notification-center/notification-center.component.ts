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
  activeNotifications: number = 0;

  constructor(public backendService: BackendService, public authService: AuthService, public applicationSettingService: ApplicationSettingsService) { }

  ngOnInit(): void {
    this.authService.afauth.user.subscribe(data => {
      this.authService.userAppSettingObservable.subscribe(data => {
        if (data.SelectedOrgAppKey) {
          this.authService.myOrgCollectionDocData.subscribe(data => {
            if(data.ActiveNotifications) {
              this.activeNotifications = data.ActiveNotifications;
            }
          });
        }
      });
    });
  }

  loadNotifications() {
    this.showLoader = true;
    this.applicationSettingService.getNotificationsList().subscribe((data) => {
      this.notificationsList = data;
      this.showLoader = false;
    });
  }
}
