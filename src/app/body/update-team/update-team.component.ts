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
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ActivatedRoute, Router } from '@angular/router';
import { Team, TeamDataId } from 'src/app/Interface/TeamInterface';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

declare var jQuery:any;

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.css']
})
export class UpdateTeamComponent implements OnInit {

  componentName: string = "UPDATE-TEAM"
  organizationDomain: string
  appKey: string
  teamData: TeamDataId[] = [];
  teamName: string;
  teamId: string;
  teamDescription: string = "";
  enableLoader: boolean = false;
  showClose: boolean = false;
  @Input('teamToUpdate') teamToUpdate: Team;
  @Output() teamUpdated = new EventEmitter<{ completed: boolean }>();

  constructor(private route: ActivatedRoute, private functions: AngularFireFunctions, public validationService: ValidationService, private router: Router,private authService: AuthService, private location: Location, public applicationSettings: ApplicationSettingsService, public backendService: BackendService, public toolsService: ToolsService, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.authService.afauth.user.subscribe(data => {
      this.authService.userAppSettingObservable.subscribe(data => {
        if (data.SelectedOrgAppKey) {
          this.backendService.organizationsData.subscribe(data => {
            this.loadData();
          });
        }
      });
    });
  }

  loadData() {
    this.appKey = this.authService.getAppKey();
    this.backendService.getOrgDetails(this.appKey);
    this.organizationDomain = this.backendService.getOrganizationDomain();
    this.teamName = this.teamToUpdate.TeamName;
    this.teamId = this.teamToUpdate.TeamId;
    this.teamDescription = this.teamToUpdate.TeamDescription;
  }

  updateExistingTeam() {
    this.enableLoader = true;
    const callable = this.functions.httpsCallable('teams/updateTeam');
    if (this.organizationDomain == undefined) {
      this.organizationDomain = this.backendService.getOrganizationDomain();
    }

    callable({OrganizationDomain: this.organizationDomain, TeamName: this.teamName, TeamId: this.teamId, TeamDescription: this.teamDescription}).subscribe({
      next: (data) => {
        this.enableLoader = false;
        this.showClose= true
        console.log("Successful");

      },
      error: (error) => {
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        console.error("Error", error);
      },
      complete: () => console.info('Successful ')
  });
  }

  updateTeamDone() {
    this.teamUpdated.emit({ completed: true });
    this.showClose =false;
  }
}