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
import { Team, TeamLabels, GitDetails } from 'src/app/Interface/TeamInterface'

@Injectable({
  providedIn: 'root'
})
export class TeamServiceService {
  private teamDataState: Subject<boolean> = new Subject<boolean>();
  public teamDataStateObservable = this.teamDataState.asObservable();
  private teamLabelDataState: Subject<boolean> = new Subject<boolean>();
  public teamLabelDataStateObservable = this.teamLabelDataState.asObservable();
  private teamGitDataState: Subject<boolean> = new Subject<boolean>();
  public teamGitDataStateObservable = this.teamGitDataState.asObservable();
  public teamsDataJson: Team[] = [];
  public teamsLabelsJson: TeamLabels[] = [];
  public teamsGitDataJson: GitDetails[] = [];
  public gitDataReay: boolean = false;
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

  addGitDetails(organizationDomain: string, teamName: string, addedOn: string, owner: string, bearerToken: string, projectId: number, projLink: string, projectUrl: string, projectLocation: string) {
    const callable = this.functions.httpsCallable('teams/addGitDetails');
    callable({OrgDomain: organizationDomain, TeamName: teamName, AddedOn: addedOn, Owner: owner, BearerToken: bearerToken, ProjectId: projectId, ProjectLink: projLink, ProjectUrl: projectUrl, ProjectLocation: projectLocation}).subscribe({
      next: (data) => {
        console.log("Successfully added project link");
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => console.info('Successfully created project link')
    })
  }

  updateGitDetails( organizationDomain: string, teamName: string, gitToken: string) {
    const callable = this.functions.httpsCallable('teams/updateGitDetails');
    callable({OrganizationDomain: organizationDomain, TeamName: teamName, Token: gitToken}).subscribe({
      next: (data) => {
        console.log("Successfully added Token");
      }, 
      error: (error) => {
        console.error(error);
      },
      complete: () => console.info('Successfully Added Token')
    })
  }

  getGitDetails(orgDomain: string, teamName: string) {
    this.gitDataReay=false;
    this.teamGitDataState.next(false);
    const callable = this.functions.httpsCallable('teams/getGitDetails');
    callable({OrganizationDomain: orgDomain, TeamName: teamName}).subscribe({
      next: (data) => {
        console.log(data);
        this.teamsGitDataJson = data[0] as GitDetails[];
        this.gitDataReay = true;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.gitDataReay=true;
        this.teamGitDataState.next(true);
        console.info('Getting Git Data Successful');
      }
    });
    return this.teamsGitDataJson;
  }

  getLabels(orgDomain: string) {
    this.labelsReady = false
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
        this.labelsReady = true;
        this.teamLabelDataState.next(true);
        console.info('Getting Label Data Successful')
      }
    });
    return this.teamLabelDataStateObservable;
  }

  reorderLabels(orgDomain: string, teamName: string, scope: string, labelsArray: string[]){
       const callable = this.functions.httpsCallable('teams/reOrderLabels');
       callable({OrgDomain: orgDomain, TeamName: teamName, Scope: scope, LabelsArray: labelsArray}).subscribe({
         next:() => {
           console.log("Labels ReOrdered");
         },
         error: (error) =>{
           console.error(error);
         },
         complete: () => {
           console.log("Successfully ReOrdered Label");
         }
       });
  }

}
