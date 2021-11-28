import { Component, OnInit } from '@angular/core';
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

  constructor(public applicationSettingsService: ApplicationSettingsService, public authService: AuthService, public popupHandlerService: PopupHandlerService) { }

  ngOnInit(): void {
  }

  sprintCreated( completed: boolean ) {
    this.popupHandlerService.createNewSprintEnabled= false;
  }

  taskCreated( completed: boolean ) {
    this.popupHandlerService.createNewTaskEnabled= false;
  }
}
