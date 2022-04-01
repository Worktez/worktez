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
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { User } from 'src/app/Interface/UserInterface';
import { ValidationService } from '../../services/validation/validation.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { AuthService } from 'src/app/services/auth.service';
import { Organizations } from 'src/app/Interface/OrganizationInterface';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { Sprint, TeamDataId } from 'src/app/Interface/TeamInterface';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { ToolsService } from 'src/app/services/tool/tools.service';

declare var jQuery:any;

@Component({
  selector: 'app-create-new-sprint',
  templateUrl: './create-new-sprint.component.html',
  styleUrls: ['./create-new-sprint.component.css']
})
export class CreateNewSprintComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @Input('newSprintId') newSprintId: string;
  @Output() sprintCreated = new EventEmitter<{ completed: boolean }>();

  componentName: string = "CREATE-NEW-SPRINT";
  startDate: string
  endDate: string
  status: string = null
  enableLoader: boolean = false;
  user: User;
  userTeam: string;
  taskNo: number;
  selectedTeamId: string;
  teamCurrentSprintNumber: number;

  teamData: TeamDataId[] = [];

  organizationDetails: Organizations

  sprintData: Sprint;
  teams: [];
  showTeams: boolean = false;

  nextSprintId: number;
  showContent: boolean;
  todayDate: string;
  showClose: boolean = false
  constructor(private applicationSettingsService: ApplicationSettingsService, private functions: AngularFireFunctions, public validationService: ValidationService, public errorHandlerService: ErrorHandlerService, private backendService: BackendService, private authService: AuthService, public popupHandlerService: PopupHandlerService, public toolsService:ToolsService) { }

  ngOnInit(): void {
    this.todayDate = this.toolsService.date();
    this.authService.afauth.user.subscribe(data => {
      this.userTeam = this.authService.getTeamId();
      this.authService.userAppSettingObservable.subscribe(data => {
        if (data.SelectedOrgAppKey) {
          this.selectedTeamId = data.SelectedTeamId;
          this.backendService.organizationsData.subscribe(data => {
              this.teams = data.TeamsId;
              this.showTeams = true;
              this.readApplicationData();
          });
        }
      });
    });
  }

  readApplicationData() {
    this.applicationSettingsService.getTeamDetails(this.selectedTeamId).subscribe(team => {
      this.teamCurrentSprintNumber = team.CurrentSprintId;
      this.nextSprintId = team.CurrentSprintId + 1;
      this.readSprintData();
    });
  }

  readSprintData() {
    this.showContent = false;
    this.applicationSettingsService.getSprintsDetails(this.nextSprintId).subscribe(sprints => {
      if (sprints != undefined) {
        this.sprintData = sprints;
        this.taskNo = this.sprintData.TotalNumberOfTask;
      } else{
        this.taskNo = 0;
      }
      this.showContent = true;
    });
  }

  async submit() {
    let data = [{ label: "startDate", value: this.startDate },
    { label: "endDate", value: this.endDate },
    { label: "status", value: this.status }];
    var condition = await (this.validationService.checkValidity(this.componentName, data)).then(res => {
      return res;
    });
    if (condition) {
      console.log("Inputs are valid");
      this.createNewSprint();
    }
    else
      console.log("Sprint not created! Validation error");
  }

  async createNewSprint() {
    this.enableLoader = true;
    const appKey = this.backendService.getOrganizationAppKey();
    const callable = this.functions.httpsCallable('sprints/createNewSprint');

    await callable({AppKey: appKey, StartDate: this.startDate, EndDate: this.endDate, Status: this.status, NewSprintId: this.nextSprintId, TeamId: this.selectedTeamId }).subscribe({
      next: (data) => {
        console.log("Successfully created sprint");
        this.showClose = true
      },
      error: (error) => {
        this.enableLoader = false;
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        console.error(error);
      },
      complete: () => console.info('Successfully created sprint ')
  });
    this.showClose = true
  }

  close() {
    jQuery('#createNewSprint').modal('hide');
    jQuery('#form').trigger("reset");
    window.location.reload();
    this.sprintCreated.emit({ completed: true });
  }
}
