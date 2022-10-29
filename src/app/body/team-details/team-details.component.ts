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
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Location } from '@angular/common';
import { Label, Team } from 'src/app/Interface/TeamInterface';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { RBAService } from 'src/app/services/RBA/rba.service';
import { marketingLabelsTempelate, developmentLabelsTempelate } from 'src/app/Interface/TeamLabelsTempelate';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {
  ComponentName: string;
  labelName: string = "Select label";
  organizationDomain: string
  teamId: string;
  teamName: string;
  teamMembers: string[] = [];
  teamDataReady: boolean = false;
  componentName:string ="TEAM-DETAILS";
  team: Team;
  teamToUpdate: Team;
  updateTeamEnabled: boolean = false;
  addMemberEnabled: boolean = false;
  filteredOptionsLabels: string[] = ['Development', 'Marketing'];
  showLoader: boolean = true;
  enableLoader: boolean = false;
  type: string[]; 
  statusLabels: string[];
  priorityLabels: string[]; 
  difficultyLabels: string[]; 
  milestoneStatusLabels: string[];

  constructor(private applicationSettingsService: ApplicationSettingsService,public rbaService :RBAService, private startService: StartServiceService, private userService: UserServiceService, private location: Location, private backendService: BackendService, private route: ActivatedRoute, private navbarHandler: NavbarHandlerService, private functions: AngularFireFunctions,  public errorHandlerService: ErrorHandlerService, public router: Router) { }

  ngOnInit(): void {
    this.teamId = this.route.snapshot.params['teamId'];
    this.navbarHandler.addToNavbar(this.teamId);

    if(this.startService.showTeamsData) {
      this.getTeamData();
    } else {
      this.startService.userDataStateObservable.subscribe((data) => {
        if(data){
          this.startService.applicationDataStateObservable.subscribe((data) => {
            if(data) {
              this.applicationSettingsService.teamData.subscribe((data) => {
                if(data) {
                  this.getTeamData();
                }
              });
            }
          });
        }
      });
    }
  }

  changeLabels(labelName){
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

  updateDefaultLabels(){
    this.showLoader = true;
    const callable = this.functions.httpsCallable('teams/createDefaultLabels');
    this.organizationDomain = this.backendService.getOrganizationDomain();
    const scope: string[] = ["Type", "Priority", "Difficulty", "Status", "MilestoneStatus"];
    callable({OrganizationDomain:this.organizationDomain, TeamName: this.team.TeamName, TypeLabels: this.type, StatusLabels: this.statusLabels, PriorityLabels: this.priorityLabels, DifficultyLabels: this.difficultyLabels, MilestoneStatusLabels: this.milestoneStatusLabels, Scope: scope}).subscribe({
      next: (data) => {
        // this.changeDefaultLabels();
        this.showLoader = false;
        this.router.navigate(['TeamDetails', this.teamId]);
        console.log("Successful ");
      },
      error: (error) => {
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        console.error("Error", error);
      },
      complete: () => console.info('Successful')
    });
  }

  changeDefaultLabels(item: string){
    this.labelName = item;
    if(this.labelName!=undefined){
      this.changeLabels(this.labelName);
      this.showLoader = true;
      this.organizationDomain = this.backendService.getOrganizationDomain();
      const scope: string[] = ["Type", "Priority", "Difficulty", "Status", "MilestoneStatus"];
      const callable = this.functions.httpsCallable('teams/createDefaultLabels');
      callable({OrganizationDomain: this.organizationDomain, TeamName: this.team.TeamName, Type: this.type, StatusLabels: this.statusLabels, PriorityLabels: this.priorityLabels, DifficultyLabels: this.difficultyLabels,  MilestoneStatusLabels: this.milestoneStatusLabels, Scope: scope}).subscribe({
        next: (data) => {
          this.showLoader = false;
          console.log("Successfully updated")
          this.router.navigate(['TeamDetails', this.teamId]);
          // this.updateDefaultLabels();
        },
        error: (error) => {
          console.error("Error", error);
          this.errorHandlerService.showError = true;
          this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        },
        complete: () => console.info('Successful')
      });
    }
  }
  
  getTeamData() {
    this.showLoader = true;
    const orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable("teams/getTeamData");
    callable({OrganizationDomain: orgDomain, TeamId: this.teamId}).pipe(
      map(actions => {
        const data = actions.resultData as Team
        return data;
      })).subscribe({
        next: (data) => {
          this.team = data;
          data.TeamMembers.forEach((element: any) => {
            this.userService.checkAndAddToUsersUsingEmail(element);
          });
          this.userService.fetchUserData().subscribe(()=>{
            this.teamDataReady = true;
            this.showLoader = false
          });
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => console.info("Completed getting Team Data...")
      });
  }
  updateTeam(team: Team) {
    this.teamToUpdate = team;
    this.updateTeamEnabled = true;
  }
  addMember() {
    this.addMemberEnabled = true;
  }
  addedMember(data: { completed: boolean, memberEmail: string}) {
    this.addMemberEnabled = false;
  }

  removeMemberDB(remove: string) {
    this.enableLoader = true;
    const callable = this.functions.httpsCallable('teams/removeMember');
    if (this.organizationDomain == undefined) {
      this.organizationDomain = this.backendService.getOrganizationDomain();
    }
    
    callable({OrganizationDomain: this.organizationDomain, TeamName: this.team.TeamName, TeamMembers: this.team.TeamMembers, Remove: remove}).subscribe({
      next: (data) => {
        console.log(remove);
        this.enableLoader = false;
        const index = this.teamMembers.indexOf(remove);
        if (index != -1) {
          this.teamMembers.splice(index, 1);
          console.log("Successfully removed member");
        } else {
          console.log("Error- Cannot remove member. Member not found");
        }
        this.getTeamData();
      },
      error: (error) => {
        this.enableLoader = false;
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        
      },
      complete: () => console.info('Successful ')
    });
  }

  teamUpdated(data: { completed: boolean }) {
    this.updateTeamEnabled = false;
  }
  selectedAssignee(item) {
    console.log(item)
  }
  

  deleteTeam() {
    this.showLoader = true
    const orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable('teams/deleteTeam');
    callable({OrganizationDomain: orgDomain, TeamName: this.team.TeamName, TeamId: this.team.TeamId}).subscribe({
      next: (data) => {
        this.team.TeamStatus = -1;
        this.showLoader = false
      },
      error: (error) => {
        console.error("Error", error);
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
      },
      complete: () => console.info('Successful ')
    });
  }

  createDefaultLabels() {
    this.showLoader = true;
    const type: string[] = ["Bug", "Story", "Sub Task"];
    const statusLabels: string[] = ["Ice Box", "Ready to start", "Under Progress", "Blocked", "Completed"];
    const priorityLabels: string[] = ["High", "Medium", "Low"];
    const difficultyLabels: string[] = ["High", "Medium", "Low"];
    const milestoneStatusLabels: string[] = ["Ice Box", "Completed", "Under Progress", "Ready to start"];
    const scope: string[] = ["Type", "Priority", "Difficulty", "Status", "MilestoneStatus"];
    const orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable('teams/createDefaultLabels');
    console.log(orgDomain, this.team.TeamName, type, scope, difficultyLabels, milestoneStatusLabels, priorityLabels);
    callable({OrganizationDomain: orgDomain, TeamName: this.team.TeamName, Type: type, StatusLabels: statusLabels, PriorityLabels: priorityLabels, DifficultyLabels: difficultyLabels,  MilestoneStatusLabels: milestoneStatusLabels, Scope: scope}).subscribe({
      next: (data) => {
        this.showLoader = false
      },
      error: (error) => {
        console.error("Error", error);
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
      },
      complete: () => console.info('Successful ')
  });
  }
  close () {
    this.router.navigate(['ViewOrganizationDetails']);
  }

}
