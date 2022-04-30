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
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Location } from '@angular/common';
import { Label, Team } from 'src/app/Interface/TeamInterface';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {
  ComponentName: string;

  teamId: string;
  teamDataReady: boolean = false;
  componentName:string ="TEAM-DETAILS";
  team: Team;
  teamToUpdate: Team;
  updateTeamEnabled: boolean = false;
  addMemberEnabled: boolean = false;

  showLoader: boolean = false;

  constructor(private applicationSettingsService: ApplicationSettingsService, private startService: StartServiceService, private userService: UserServiceService, private location: Location, private backendService: BackendService, private route: ActivatedRoute, private navbarHandler: NavbarHandlerService, private functions: AngularFireFunctions,  public errorHandlerService: ErrorHandlerService) { }

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
          });
          this.showLoader = false
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
    const orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable('teams/createDefaultLabel');
    const type: string[] = ["Bug", "Story", "Sub Task"];
    const statusLabels: string[] = ["Ice Box", "Ready to start", "Under Progress", "Blocked", "Completed"];
    const priorityLabels: string[] = ["High", "Medium", "Low"];
    const difficultyLabels: string[] = ["High", "Medium", "Low"];
    callable({OrganizationDomain: orgDomain, TeamName: this.team.TeamName, Type: type, StatusLabels: statusLabels, PriorityLabels: priorityLabels, DifficultyLabels: difficultyLabels}).subscribe({
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
    this.location.back()
  }

}
