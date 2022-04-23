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
import { AuthService } from 'src/app/services/auth.service';
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
  childStep: number = 1
  teamAdmin: string
  uid: string
  teamData: TeamDataId[] = [];
  addMemberEnabled: boolean = false;
  teamName: string;
  teamId: string;
  teamDescription: string = "";
  teamManagerEmail: string;
  teamMembers: string[] = [];
  enableLoader: boolean = false;
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
    this.teamAdmin = this.authService.getUserEmail();
    this.uid = this.authService.getLoggedInUser();

    this.teamName = this.teamToUpdate.TeamName;
    this.teamId = this.teamToUpdate.TeamId;
    this.teamDescription = this.teamToUpdate.TeamDescription;
    this.teamManagerEmail = this.teamToUpdate.TeamManagerEmail;
    this.teamMembers = this.teamToUpdate.TeamMembers;
  }

  handleIdInput() {
    this.teamId = this.teamName.slice(0, 3);
  }

  type: string[] = ["Bug", "Story", "Sub Task"]
  statusLabels: string[] = ["Ice Box", "Ready to start", "Under Progress", "Blocked", "Completed"]
  priorityLabels: string[] = ["High", "Medium", "Low"]
  difficultyLabels: string[] = ["High", "Medium", "Low"]

  labelFunc(checked: boolean, value: string, array: string[]) {
    if (checked === false) {
      for (var i = 0; i < array.length; i++) {
        if (array[i] === value) {
          array.splice(i, 1);
        }
      }
    }
    else {
      array.push(value);
    }
  }

  getLabels(event: Event) {
    let labelName = (<HTMLInputElement>event.target).name;
    let labelValue = (<HTMLInputElement>event.target).value;
    let isChecked = (<HTMLInputElement>event.target).checked;
    if (labelName === "Task") {
      this.labelFunc(isChecked, labelValue, this.type)
    }
    if (labelName === "Status") {
      this.labelFunc(isChecked, labelValue, this.statusLabels)
    };
    if (labelName === "Priority") {
      this.labelFunc(isChecked, labelValue, this.priorityLabels)
    };
    if (labelName === "Difficulty") {
      this.labelFunc(isChecked, labelValue, this.difficultyLabels)
    };
  }

  async nextChildStep() {
    let data = [
      { label: "teamName", value: this.teamName },
      { label: "teamId", value: this.teamId },
      { label: "teamDescription", value: this.teamDescription },
      { label: "teamManagerEmail", value: this.teamManagerEmail },
      { label: "teamMemberEmails", value: this.teamMembers }
    ];

    var condition = await (this.validationService.checkValidity(this.componentName, data)).then(res => {
      return res;
    });
    if (condition) {
      console.log("Inputs are valid");
      this.childStep += 1
    }
    else {
      console.log("Team not created! Validation error");
    }
  }

  prevChildStep() {
    this.childStep -= 1
  }

  async removeMemberDB(remove: string) {
    this.enableLoader = true;
    const callable = this.functions.httpsCallable('teams/removeMember');
    if (this.organizationDomain == undefined) {
      this.organizationDomain = this.backendService.getOrganizationDomain();
    }
    await callable({OrganizationDomain: this.organizationDomain, TeamName: this.teamName, TeamMembers: this.teamMembers, Remove: remove}).subscribe({
      next: (data) => {
        this.enableLoader = false;
        console.log("Successful removed member");
        const index = this.teamMembers.indexOf(remove);
        if (index != -1) {
          this.teamMembers.splice(index, 1);
        } else {
          console.log("Error- Cannot remove member. Member not found");
        }
      },
      error: (error) => {
        this.enableLoader = false;
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        
      },
      complete: () => console.info('Successful ')
  });
  }

  async updateExistingTeam() {
    this.enableLoader = true;
    // this.teamFormSubmitted.emit({ submitted: true })
    const callable = this.functions.httpsCallable('teams/updateTeam');
    if (this.organizationDomain == undefined) {
      this.organizationDomain = this.backendService.getOrganizationDomain();
    }

    await callable({OrganizationDomain: this.organizationDomain, TeamName: this.teamName, TeamId: this.teamId, TeamDescription: this.teamDescription, TeamManagerEmail: this.teamManagerEmail, TypeLabels: this.type, StatusLabels: this.statusLabels, PriorityLabels: this.priorityLabels, DifficultyLabels: this.difficultyLabels }).subscribe({
      next: (data) => {
      this.enableLoader = false;
      jQuery('#updateTeam').modal('hide');
      jQuery('#form').trigger("reset");
      this.teamUpdated.emit({ completed: true });
      this.router.navigate(['TeamDetails', this.teamId]);
        console.log("Successful ");
      },
      error: (error) => {
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        console.error("Error", error);
      },
      complete: () => console.info('Successful ')
  });
  }

  close() {
    jQuery('#updateTeam').modal('hide');
    jQuery('#form').trigger("reset");
    this.teamUpdated.emit({ completed: true });
  }
}
