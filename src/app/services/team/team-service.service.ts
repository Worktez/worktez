/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* 
* Author: Sanjay Krishna S R <sanjaykrishna1203@gmail.com>
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
import { Subject } from 'rxjs';
import { Team, TeamLabels } from 'src/app/Interface/TeamInterface'

@Injectable({
  providedIn: 'root'
})
export class TeamServiceService {
  private teamDataState: Subject<boolean> = new Subject<boolean>();
  public teamDataStateObservable = this.teamDataState.asObservable();
  private teamLabelDataState: Subject<boolean> = new Subject<boolean>();
  public teamLabelDataStateObservable = this.teamLabelDataState.asObservable();
  public teamsDataJson: Team[] = [];
  public teamsLabelsJson: TeamLabels[] = [];
  public labelsReady: boolean = false;
  public teamsReady: boolean = false;
  constructor(private functions: AngularFireFunctions) { }
  
  getTeams(orgDomain: string) {
    this.teamDataState.next(false);
    const callable = this.functions.httpsCallable('teams/getAllTeams');
    callable({ OrganizationDomain: orgDomain }).subscribe({
      next: (data) => {
        const teamsDataArray = data.resultData as Team[];
        teamsDataArray.forEach(element => {
          this.teamsDataJson[element.TeamId] = element as Team;
        });
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.teamDataState.next(true);
        this.teamsReady = true;
        console.info('Getting Team Data Successful')
      }
    });
    return this.teamDataStateObservable;
  }

  getTeamUsingId(teamId: string) {
    return this.teamsDataJson[teamId];
  }

  getLabelsByScope(teamId: string, scope: string) {
    const labelsArray = this.teamsLabelsJson[teamId][scope];
    return Object.keys(labelsArray);
  }

  getLabels(orgDomain: string) {
    this.teamLabelDataState.next(false);
    const callable = this.functions.httpsCallable('teams/getAllLabels');
    callable({ OrganizationDomain: orgDomain }).subscribe({
      next: (data) => {
        this.teamsLabelsJson = data as TeamLabels[];
        this.labelsReady = true;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.teamLabelDataState.next(true);
        console.info('Getting Label Data Successful')
      }
    });
    return this.teamLabelDataStateObservable;
  }
}
