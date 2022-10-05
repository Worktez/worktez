import { Component, Input, OnInit } from '@angular/core';
import { Notification } from 'src/app/Interface/NotificationInterface';
@Component({
  selector: 'app-all-notification-card',
  templateUrl: './all-notification-card.component.html',
  styleUrls: ['./all-notification-card.component.css']
})
export class AllNotificationCardComponent implements OnInit {
  @Input('notification') notification: Notification;
  constructor() { }

  ngOnInit(): void {
  }

}
