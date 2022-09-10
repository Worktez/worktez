import { Component, Input, OnInit } from '@angular/core';
import { Notification } from 'src/app/Interface/NotificationInterface';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.css']
})
export class NotificationCardComponent implements OnInit {
  @Input('notification') notification: Notification;

  constructor() { }

  ngOnInit(): void {
  }

}
