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
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { Sprint } from 'src/app/Interface/TeamInterface';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { AuthService } from '../../../services/auth.service';
import { StartServiceService } from 'src/app/services/start/start-service.service';


@Component({
  selector: 'app-sprint-details',
  templateUrl: './sprint-details.component.html',
  styleUrls: ['./sprint-details.component.css']
})
export class SprintDetailsComponent implements OnInit {

  @Input('currentSprintName') currentSprintName: string;
  @Input('currentSprintNumber') currentSprintNumber: number
  @Input('sprintData') sprintData: Sprint;
  @Input('workPercentage') workPercentage: number;
  @Output() currentSprint = new EventEmitter<number>();

  componentName: string = "SPRINT-DETAILS"
  filterSprintNumber: number;
  completedSprintEnabled: boolean = false;
  showLoader:boolean = false
  sprintDataReady: boolean = false

  constructor(public startService: StartServiceService, private authService: AuthService, public applicationSettingsService: ApplicationSettingsService, private functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService, public backendService: BackendService, private router: Router, public popupHandlerService: PopupHandlerService) { }

  ngOnInit(): void {
    this.applicationSettingsService.sprintDataObservable.subscribe((data) => {
      this.sprintDataReady = true;
    });
    this.filterSprintNumber=this.startService.teamCurrentSprintNumber ;
  }

  changeSprintStatus(sprintStatus: string) {
    this.showLoader = true;
    const callable = this.functions.httpsCallable('sprints/updateSprintStatus');
    const appKey = this.backendService.getOrganizationAppKey();
    const uid = this.authService.getLoggedInUser();

    callable({AppKey: appKey, CurrentSprintName: this.currentSprintName, SprintStatus: sprintStatus, TeamId: this.sprintData.TeamId, Uid: uid }).subscribe({
        next: (data) => {
          console.log("Successful updated ");
        },
        error: (error) => {
          this.errorHandlerService.showError = true;
          this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
          console.error(error);
        },
        complete: () => this.applicationSettingsService.sprintDataObservable.subscribe((data) => {
          this.sprintData = data;
          this.showLoader = false;
        })
    });
  }
    
  changeSprintNumber() {
    this.currentSprint.emit(this.filterSprintNumber);
  }

  startNewSprint() {
    this.popupHandlerService.createNewSprintEnabled= true;
  }

  setSprintToComplete(){
    this.completedSprintEnabled=true;
  }

  showTasks() {
    this.router.navigate(['/Tasks', this.sprintData.TeamId, this.currentSprintName])
  }

  ActiveSprint() {
    this.currentSprint.emit(this.startService.currentSprintNumber);
  }

  showBacklog() {
    this.currentSprint.emit(-1);
  }

  showDeleted() {
    this.currentSprint.emit(-2);
  }

  async autoSchedule() {
    const orgAppKey = this.backendService.getOrganizationAppKey();
    const assignee = this.authService.getUserEmail();
    const callable = this.functions.httpsCallable('scheduledFnManually/addScheduler');
      const result = await callable({Type: "AutoSprintCompletion", OrgAppKey: orgAppKey, Assignee: assignee, TeamId: this.sprintData.TeamId, OrgDomain: this.backendService.getOrganizationDomain()}).subscribe({
        next: (data) => {
          console.log("Successful ");
        },
        error: (error) => {
          this.errorHandlerService.showError = true;
          this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
          console.error(error);
        },
        complete: () => console.info('Successful')
    });
  }
}
