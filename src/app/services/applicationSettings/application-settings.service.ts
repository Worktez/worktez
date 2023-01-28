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
import { Team, Sprint } from '../../Interface/TeamInterface';
import { AuthService } from '../auth/auth.service';
import { BackendService } from '../backend/backend.service';
import { TeamServiceService } from '../team/team-service.service';
import { UserServiceService } from '../user-service/user-service.service';

@Injectable({
  providedIn: 'root'
})

export class ApplicationSettingsService {
  public editedTeamId: string = "";
  public editedSprintId: number = 0;
  public team: Team;

  public status: string[] = []
  public priority: string[] = []
  public difficulty: string[] = []
  public type: string[] = []
  public milestoneStatus: string[] = []
  public project: string[] = []

  // public labels: Label[] = []

  // public teamData: Observable<Team>;

  public sprintDataObservable: Observable<Sprint>;

  public newNotificationListObservable: Observable<Notification[]>;
  public oldNotificationListObservable: Observable<Notification[]>;

  public projectLink: string;

  teamDataReady: boolean = false;
  teamAvailable: boolean = false;

  labelDataReady: boolean = true;

  constructor(private teamService: TeamServiceService, private userService: UserServiceService, private backendService: BackendService, private functions: AngularFireFunctions, private authService: AuthService) { }

  getTeamDetails(teamId: string) {
      this.teamDataReady = false;
      this.team = this.teamService.teamsDataJson[teamId];
      this.teamAvailable = true;
      this.status = this.team.Status;
      this.priority = this.team.Priority;
      this.difficulty = this.team.Difficulty;
      this.milestoneStatus = this.team.MilestoneStatus;
      this.type = this.team.Type;
      this.project = this.backendService.organizationDetails.TeamsId;
      this.projectLink= this.team.ProjectLink;
      this.teamService.teamsDataJson[teamId].TeamMembers.forEach(element => {
        this.userService.checkAndAddToUsersUsingEmail(element);
      });
      if(!this.userService.userReady) {
        this.userService.fetchUserData().subscribe(()=>{
          this.teamDataReady = true;
        });
      } else {
        this.teamDataReady = true;
      }
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
