/***********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Simran Nigam <nigamsimran14@gmail.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

import { Component } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { CookieService } from 'ngx-cookie-service';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { MilestoneServiceService } from 'src/app/services/milestone/milestone-service.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { TeamServiceService } from 'src/app/services/team/team-service.service';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent {
  componentName = "ROADMAP"
  showLoader: boolean = false;
  teamId: string;
  projectLink: string;

  constructor(public milestoneService: MilestoneServiceService, public startService: StartServiceService, public authService: AuthService, public backendService: BackendService, public navbarHandler: NavbarHandlerService, public applicationSettingsService: ApplicationSettingsService, public cookieService: CookieService, private functions: AngularFireFunctions, public teamService: TeamServiceService) {
  }

  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
    this.navbarHandler.addToNavbar(this.componentName);

    this.showLoader = true;
    if(this.startService.showTeams) {
      this.milestoneService.getAllMilestoneData();
    } else {
      this.startService.applicationDataStateObservable.subscribe((data) => {
        if(data){
          this.milestoneService.getAllMilestoneData();
        }
      });
    }
  }

  updateSelectedTeamId(teamId: string) {
    this.showLoader = true;
    this.applicationSettingsService.editedTeamId = teamId;
    this.startService.selectedTeamId = teamId;
    this.authService.userAppSetting.SelectedTeamId = teamId;
    this.startService.readApplicationData();
    this.startService.changeTeam = true;
    this.teamId = teamId;
    this.projectLink=this.teamService.teamsDataJson[this.teamId].ProjectLink;

    const callable = this.functions.httpsCallable('users/updateSelectedTeam');
    callable({Uid: this.startService.uid , SelectedTeam: this.startService.selectedTeamId}).subscribe({
      error: (error) => {
        console.error(error);
      },
      complete: (()=>{
        this.cookieService.set("userSelectedTeamId", teamId);
        this.showLoader = false;
      })
    });
  }
}
