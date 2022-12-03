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
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Router } from '@angular/router';
import { TeamDataId } from 'src/app/Interface/TeamInterface';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { CookieService } from 'ngx-cookie-service';
import { marketingLabelsTempelate, developmentLabelsTempelate } from 'src/app/Interface/TeamLabelsTempelate';
import { TeamServiceService } from 'src/app/services/team/team-service.service';

@Component({
  selector: 'app-create-new-team',
  templateUrl: './create-new-team.component.html',
  styleUrls: ['./create-new-team.component.css']
})
export class CreateNewTeamComponent implements OnInit {
  componentName: string = "CREATE-NEW-TEAM"

  filteredOptionsLabels: string[] = ['Development', 'Marketing'];
  labelName: string;
  organizationDomain: string
  appKey: string
  teamAdmin: string
  uid: string
  teamData: TeamDataId[] = [];
  isUpdateTeam: boolean = false;
  addMemberEnabled: boolean = false;
  teamName: string;
  teamId: string;
  teamDescription: string = "";
  teamManagerEmail: string;
  teamMembers: string[] = [];
  enableLoader: boolean = false;
  teamChanged:boolean = false
  teamNameIsSame: boolean = true;
  public TeamNameAvailable: boolean = true;
  teamIdIsSame: boolean = true;
  flag1: boolean = true;
  flag2: boolean = true;
  public TeamIdAvailable: boolean = true;
  teamIds: string[] = [];
  teamNames: string[] = [];
  constructor(private startService: StartServiceService, private applicationSettingsService: ApplicationSettingsService, private navbarService: NavbarHandlerService, private functions: AngularFireFunctions, public validationService: ValidationService, private router: Router,private authService: AuthService, private location: Location, public applicationSettings: ApplicationSettingsService, public backendService: BackendService, public toolsService: ToolsService, public popUpHandlerService: PopupHandlerService, public errorHandlerService: ErrorHandlerService, public cookieService: CookieService,public teamService: TeamServiceService ) { }

  ngOnInit(): void {
    
    this.navbarService.resetNavbar();
    this.navbarService.addToNavbar(this.componentName);
    this.teamAdmin = this.authService.getUserEmail(); 
    if(!this.startService.teamIdExists && this.startService.userAppSettingsReady) {
      this.loadData();
    } else {
      if(this.startService.showTeamsData) {
        this.loadData();
      } else {
        this.startService.userDataStateObservable.subscribe((data) => {
          if(data){
            this.startService.applicationDataStateObservable.subscribe((data) => {
              if(data) {
                this.loadData();
              }
            });
          }
        });
      }
    }
    this.teamIds = this.backendService.getOrganizationTeamIds();
    this.teamNames = this.backendService.getOrganizationTeamNames();
  }

  check(){
    if (!this.teamName) {
      this.flag1= false;
    }
    if (!this.teamId) {
      this.flag2= false;
    }
  }
  setTeamId(){
    if(!this.teamChanged){
    this.teamId = this.teamName.slice(0, 3);
    }
  }

  setChange(){
    this.teamChanged = true;
}


  loadData() {
    this.appKey = this.cookieService.get('userSelectedOrgAppKey');
    this.backendService.getOrgDetails(this.appKey).subscribe(()=>{
      this.organizationDomain = this.backendService.getOrganizationDomain();
      this.teamAdmin = this.authService.getUserEmail();
      this.uid = this.authService.getLoggedInUser();
    });
  }

  handleIdInput() {
    this.teamId = this.teamName.slice(0, 3);
  }

  changeLabels(labelName){
    console.log(labelName);
    if(labelName == "Marketing"){
      this.type = marketingLabelsTempelate.type;
      this.statusLabels = marketingLabelsTempelate.statusLabels;
      this.difficultyLabels = marketingLabelsTempelate.difficultyLabels;
      this.priorityLabels = marketingLabelsTempelate.priorityLabels;
      this.milestoneStatusLabels = marketingLabelsTempelate.milestoneStatusLabels
    }
    else if(labelName == "Development"){
      this.type = developmentLabelsTempelate.type;
      this.statusLabels = developmentLabelsTempelate.statusLabels;
      this.difficultyLabels = developmentLabelsTempelate.difficultyLabels;
      this.priorityLabels = developmentLabelsTempelate.priorityLabels;
      this.milestoneStatusLabels = developmentLabelsTempelate.milestoneStatusLabels;

    }
  }

  updateTeamLabels() {
    const scope: string[] = ["Type", "Priority", "Difficulty", "Status", "MilestoneStatus"];
    const callable = this.functions.httpsCallable('teams/createDefaultLabels');
    callable({TypeLabels: this.type, StatusLabels:this.statusLabels,
      PriorityLabels:this.priorityLabels, DifficultyLabels: this.difficultyLabels, MilestoneStatusLabels: this.milestoneStatusLabels, Scope: scope}).subscribe({
      next: (data) => {
        this.createNewTeamWithLabels();
      }, 
      error: (error) => {
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError", "Api");
        console.log(error);
      },
      complete: () => {
        console.info('Successfully updated team labels');
      }
    })
  }

  type: string[] = ["Bug", "Story", "Sub Task"]
  statusLabels: string[] = ["Ice Box", "Ready to start", "Under Progress", "Blocked", "Completed"]
  priorityLabels: string[] = ["High", "Medium", "Low"]
  difficultyLabels: string[] = ["High", "Medium", "Low"]
  milestoneStatusLabels: string[] = ["Ice Box", "Completed", "Under Progress", "Ready to start"]


  async submit() {
    this.changeLabels(this.labelName);
    if (this.teamName!=undefined || this.teamId!=undefined || this.teamManagerEmail!=undefined){
      this.teamName = this.teamName.trimRight();
      this.teamName = this.teamName.trimLeft();
      this.teamId = this.teamId.trimLeft();
      this.teamId = this.teamId.trimRight();
    }
    this.teamMembers.push(this.teamManagerEmail);
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
      this.createNewTeamWithLabels()
    }
    else {
      console.log("Team not created! Validation error");
    }
  }

  addMember() {
    var condition = (this.validationService.checkTeamMemberEmails(this.teamMembers)).then(res => {
      return res;
    });
    if (condition){
      this.addMemberEnabled = true;
    }
    else(
      console.log("error")
    )
  }

  addedMember(data: { completed: boolean, memberEmail: string}) {
    if (data.memberEmail) {
    }
    this.addMemberEnabled = false;
  }

  async removeMember(remove: string) {
    const index = this.teamMembers.indexOf(remove);
    if (index != -1) {
      this.teamMembers.splice(index, 1);
    } else {
      console.error("Error - Cannot remove member. Member not found");
    }
  }

  createNewTeamWithLabels() {
    this.enableLoader = true;
    const callable = this.functions.httpsCallable('teams/createTeam');
    if (this.organizationDomain == undefined) {
      this.organizationDomain = this.backendService.getOrganizationDomain();
    }

    callable({OrganizationDomain: this.organizationDomain, TeamName: this.teamName, TeamId: this.teamId, TeamDescription: this.teamDescription, TeamAdmin: this.teamAdmin, TeamManagerEmail: this.teamManagerEmail, TeamMembers: this.teamMembers, TypeLabels: this.type, StatusLabels: this.statusLabels, PriorityLabels: this.priorityLabels, DifficultyLabels: this.difficultyLabels, MilestoneStatusLabels: this.milestoneStatusLabels, Uid: this.uid, OrganizationAppKey: this.appKey }).subscribe({
      next: (data) => {
      this.enableLoader = false;
      this.startService.startApplication();
      this.router.navigate(['TeamDetails',this.teamId]);
      console.log("Successful created new team");
      },
      error: (error) => {
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        console.error(error);
      },
      complete: () =>{ 
        console.info('Successful ');
        this.cookieService.set('userSelectedTeamId', this.teamId);
    }
    });
  }

  close() {
    this.router.navigate(['ViewOrganizationDetails']);
  }

  checkTeamNameAvailabilityLive() {
    if(this.teamName!=""){
      this.teamNameIsSame = false
    }
    else{
      this.teamNameIsSame = true
    }
    for (let i = 0; i < this.teamNames.length; i++) {
        if (this.teamNames[i]==this.teamName) {
          this.TeamNameAvailable = false;
          break;
        }else {
            this.TeamNameAvailable = true;
            this.enableLoader = false;
        }
    }
      this.checkTeamIdAvailabilityLive();
  }


  checkTeamIdAvailabilityLive() {
    if(this.teamId!=""){
      this.teamIdIsSame = false
    }
    else{
      this.teamIdIsSame = true
    }
    for (let i = 0; i < this.teamIds.length; i++) {
      if (this.teamIds[i]==this.teamId) {
        this.TeamIdAvailable = false;
        break;
      }else {
          this.TeamIdAvailable = true;
          this.enableLoader = false;
      }
    }
  }
}
