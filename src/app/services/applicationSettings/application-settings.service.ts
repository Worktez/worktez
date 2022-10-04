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
import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Notification } from 'src/app/Interface/NotificationInterface';
import { Team, Sprint, Label } from '../../Interface/TeamInterface';
import { AuthService } from '../auth.service';
import { BackendService } from '../backend/backend.service';
import { UserServiceService } from '../user-service/user-service.service';

@Injectable({
  providedIn: 'root'
})

export class ApplicationSettingsService {
  public editedTeamId: string = "";
  public editedSprintId: number = 0;
  team: Team;

  public status: string[] = []
  public priority: string[] = []
  public difficulty: string[] = []
  public type: string[] = []
  public milestoneStatus: string[] = []
  public project: string[] = []

  public labels: Label[] = []

  public teamData: Observable<Team>;

  public sprintDataObservable: Observable<Sprint>;

  public newNotificationListObservable: Observable<Notification[]>;
  public oldNotificationListObservable: Observable<Notification[]>;

  public projectLink: string;

  teamDataReady: boolean = false;
  teamAvailable: boolean = false;

  labelDataReady: boolean = false;

  constructor(private userService: UserServiceService, private backendService: BackendService, private functions: AngularFireFunctions, private authService: AuthService) { }

  getTeamDetails(teamId: string) {
      this.teamDataReady = false;
      const orgDomain = this.backendService.organizationDetails.OrganizationDomain;
      const callable = this.functions.httpsCallable("teams/getTeamData");
      this.teamData = callable({OrganizationDomain: orgDomain, TeamId: teamId}).pipe(
        map(actions => {
          const data = actions.resultData as Team
          if(this.team == undefined) {
            this.team = data
            this.teamAvailable = true;
            this.status = this.team.Status;
            this.priority = this.team.Priority;
            this.difficulty = this.team.Difficulty;
            this.milestoneStatus = this.team.MilestoneStatus;
            this.type = this.team.Type;
            this.project = this.backendService.organizationDetails.TeamsId;
            this.projectLink= this.team.ProjectLink;
            this.getLabelProperties(this.team.Scope, this.team.TeamName);
          }

          data.TeamMembers.forEach(element => {
            this.userService.checkAndAddToUsersUsingEmail(element);
          });
          if(!this.userService.userReady) {
            this.userService.fetchUserData().subscribe(()=>{
              this.teamDataReady = true;
            });
          } else {
            this.teamDataReady = true;
          }
          return data;
      }));
    
    return this.teamData;
  }

  getLabelProperties(scope: string[], teamName: string) {
    const orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable("teams/getLabelsInScopes");
    callable({OrganizationDomain: orgDomain, TeamName: teamName, Scope: scope}).pipe(map(actions => {
        return actions.resultData as Label[];
    })).subscribe({
      next: (data) => {
        this.labels = data;
        this.labelDataReady = true;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.info("completed fetching labels");
      }
    });
  }

  getSprintsDetails(SprintNumber: number) {
    const orgDomain = this.backendService.getOrganizationDomain();
    const teamName = this.team.TeamName;
    const callable = this.functions.httpsCallable("sprints/getSprintDetails");
    this.sprintDataObservable = callable({OrgDomain: orgDomain, TeamName: teamName, SprintNumber: SprintNumber}).pipe(map(actions => {
        return actions.sprintData as Sprint;
    }));
    return this.sprintDataObservable;
  }

  getNotificationsList(notificationStatus: number) {
    const orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable("notifications/getNotifications");
    if(notificationStatus==1){
      this.newNotificationListObservable = callable({Uid: this.authService.user.uid, OrgDomain: orgDomain, NotificationStatus: notificationStatus}).pipe(map(actions => {
          return actions as Notification[];
      }));
      return this.newNotificationListObservable;   
    }

    if(notificationStatus==0){
      this.oldNotificationListObservable = callable({Uid: this.authService.user.uid, OrgDomain: orgDomain, NotificationStatus: notificationStatus}).pipe(map(actions => {
        return actions as Notification[];
      }));
      return this.oldNotificationListObservable;   
    }
  }
}
