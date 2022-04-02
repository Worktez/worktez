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
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { Team } from 'src/app/Interface/TeamInterface';
import { User } from 'src/app/Interface/UserInterface';
import { ApplicationSettingsService } from '../applicationSettings/application-settings.service';
import { AuthService } from '../auth.service';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class StartServiceService {

  accessLevel: number;
  uid: string;
  userEmail: string;
  selectedTeamId: string;
  teams: string[];
  showTeams: boolean = false;
  showTeamsData: boolean = false;
  teamData: Team;
  teamCurrentSprintNumber: number = -100;
  currentSprintNumber: number = 0;
  changeTeam: boolean = false;
  teamMembers: string[];
  teamIdExists: boolean = true;
  teamName: string;
  managerEmail: string;
  role: string;
  userReady: boolean = false
  user: User
  currentUrl: string = ''
  applicationStarted: boolean = false
  userAppSettingsReady: boolean = false

  private userDataState: Subject<boolean> = new Subject<boolean>();
  public userDataStateObservable = this.userDataState.asObservable();

  private applicationDataState: Subject<boolean> = new Subject<boolean>();
  public applicationDataStateObservable = this.applicationDataState.asObservable();

  constructor(private cookieService: CookieService, private router: Router, public authService: AuthService, public applicationSettingsService: ApplicationSettingsService, public backendService: BackendService) { }

  startApplication() {
    this.applicationStarted = true
    this.currentUrl = window.location.pathname;
    this.userDataState.next(false);
    this.accessLevel = 0;
    this.authService.afauth.user.subscribe({
      next: (action) => {
        const data = action as User;
        if (data) {
          this.userReady = true;
          this.uid = data.uid;
          this.userEmail = data.email;
          this.user = data
          this.authService.user = data;
          this.authService.getUserSettings();
          this.loadUserAppSettings();
        } else {
          this.userReady = false;
          if(this.currentUrl == '/')
            this.router.navigate(['/Home']);
        }
        this.authService.completedLoadingApplication = true;
      },
      error: (error) => {
        console.error(error);
        this.userReady = false;
        if(this.currentUrl == '/')
          this.router.navigate(['/Home']);
      },
      complete: () => console.log("Getting User Data Complete")
    });
  }

  loadUserAppSettings() {
    const userSelectedOrgAppKeyCookie = this.cookieService.get("userSelectedOrgAppKey");
    const userSelectedTeamId = this.cookieService.get("userSelectedTeamId");

    if(userSelectedOrgAppKeyCookie && userSelectedTeamId) {
      const userUid = this.cookieService.get("useruid");
      const userAppTheme = this.cookieService.get("userAppTheme");
      this.loadNext(userSelectedOrgAppKeyCookie, userSelectedTeamId, userUid, userAppTheme);
    }

    this.authService.userAppSettingObservable.subscribe(data => {
      this.authService.userAppSetting = data;

      if(userSelectedOrgAppKeyCookie != data.SelectedOrgAppKey || userSelectedTeamId != data.SelectedTeamId) {
        this.cookieService.set("userSelectedOrgAppKey", data.SelectedOrgAppKey);
        this.cookieService.set("userSelectedTeamId", data.SelectedTeamId);
        this.cookieService.set("useruid", data.uid);
        this.cookieService.set("userAppTheme", data.AppTheme);
        this.loadNext(data.SelectedOrgAppKey, data.SelectedTeamId, data.uid, data.AppTheme);
      }
    });
  }

  loadNext(SelectedOrgAppKey, SelectedTeamId, uid, AppTheme) {
    this.userAppSettingsReady = true;
    this.authService.landingToSocial = false
    if (SelectedOrgAppKey != "") {
      this.authService.organizationAvailable = true;
      this.authService.getListedOrganizationData(uid);
      this.backendService.getOrgDetails(SelectedOrgAppKey);
      this.authService.getMyOrgCollectionDocs(uid, SelectedOrgAppKey);
      this.authService.themeService.changeTheme(AppTheme);
    } else {
      this.authService.organizationAvailable = false;
    }
    if (SelectedOrgAppKey) {
      if(!this.authService.landingToSocial) {
        this.authService.landingToSocial = true;
        if(this.currentUrl == '/') {
          this.router.navigate(['/MyDashboard']);
        }
          
      }
      if(SelectedTeamId != "") {
        this.selectedTeamId = SelectedTeamId;
        this.teamIdExists = true;
        
        this.authService.getListedTeams(this.uid, SelectedOrgAppKey);
        this.accessLevel = 1;
        if (this.applicationSettingsService.editedTeamId != SelectedTeamId && this.applicationSettingsService.editedTeamId != "") {
          this.selectedTeamId = this.applicationSettingsService.editedTeamId;
        } else {
          this.selectedTeamId = SelectedTeamId;
          this.applicationSettingsService.editedTeamId = this.selectedTeamId;
        }
        this.backendService.organizationsData.subscribe(data => {
          this.readApplicationData();
        });
        this.authService.myTeamsListObservable.subscribe(data => {
          this.teams = data;
          this.showTeams = true;
          this.userDataState.next(true);
        });
      } else {
        this.teamIdExists = false;
        console.log("TeamId doesn't exists");
      }
    }
  }

  readApplicationData() {
    this.showTeamsData = false;
    this.applicationDataState.next(false);
    this.applicationSettingsService.team = undefined;
    this.applicationSettingsService.teamAvailable = false;
    this.applicationSettingsService.getTeamDetails(this.selectedTeamId).subscribe(teams => {
      this.teamData = teams;
      if (this.teamData.TeamId == this.selectedTeamId) {
        if (this.applicationSettingsService.editedSprintId != this.teamData.CurrentSprintId && this.changeTeam == false && this.applicationSettingsService.editedSprintId != 0 ) {
          this.teamCurrentSprintNumber = this.applicationSettingsService.editedSprintId;
          this.currentSprintNumber = this.teamData.CurrentSprintId;
        } else {
          this.teamCurrentSprintNumber = this.teamData.CurrentSprintId;
          this.currentSprintNumber = this.teamData.CurrentSprintId;
          this.applicationSettingsService.editedSprintId = this.currentSprintNumber;
          this.changeTeam = false;
        }
        this.teamMembers = this.teamData.TeamMembers;
      }
      this.teamName = teams.TeamName;
      this.managerEmail = teams.TeamManagerEmail;
      if (teams.TeamManagerEmail == this.userEmail) {
        this.role = "Manager";
      } else {
        this.role = "Member";
      }
      this.showTeamsData = true;
      this.applicationDataState.next(true);
      return this.teamData;
    });
  }

  stopApplication() {
    this.applicationStarted = false;
  }
}
