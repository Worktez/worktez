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
import { Router } from '@angular/router';
import { Team } from 'src/app/Interface/TeamInterface';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { BackendService } from 'src/app/services/backend/backend.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

@Component({
  selector: 'app-teams-card',
  templateUrl: './teams-card.component.html',
  styleUrls: ['./teams-card.component.css']
})
export class TeamsCardComponent implements OnInit {

  @Input('team') team: Team

  @Output() updatedDetails = new EventEmitter<boolean>();

  addMemberEnabled: boolean = false
  updateTeamEnabled: boolean = false
  teamToAddMember: Team
  teamToUpdate: Team
  componentName:string ="ORGANIZATION-DETAILS"
  constructor(public router: Router, private functions: AngularFireFunctions, public backendService: BackendService, public popupHandlerService: PopupHandlerService, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {}

  updateTeam(team: Team) {
    this.teamToUpdate = team;
    this.updateTeamEnabled = true;
  }

  async deleteTeam() {
    const orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable('teams/deleteTeam');
    await callable({OrganizationDomain: orgDomain, TeamName: this.team.TeamName, TeamId: this.team.TeamId}).subscribe({
      next: (data) => {
        this.team.TeamStatus = -1;
      },
      error: (error) => {
        console.error("Error", error);
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
      },
      complete: () => console.info('Successful ')
  });
  }

  openTeamDetails() {
    this.router.navigate(['TeamDetails', this.team.TeamId]);
  }

  enableAddMember(team: Team) {
    this.teamToAddMember = team;
    this.addMemberEnabled = true;
  }

  addedMember(data: { completed: boolean, memberEmail: string }) {
    this.updatedDetails.emit(true);
    this.addMemberEnabled = false;
  }

  teamUpdated(data: { completed: boolean }) {
    this.updateTeamEnabled = false;
  }
}
