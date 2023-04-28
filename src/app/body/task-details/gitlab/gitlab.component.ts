/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* Author: Swapnil Bankar <swapnilbankar1010@gmail.com>
*
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/
import { PopupHandlerService } from './../../../services/popup-handler/popup-handler.service';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import { GitRepoData } from 'src/app/Interface/githubOrgData';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { Team } from 'src/app/Interface/TeamInterface';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { GithubServiceService } from 'src/app/services/github-service/github-service.service';
import { GitlabServiceService } from 'src/app/services/gitlab-service/gitlab-service.service';
import { TeamServiceService } from 'src/app/services/team/team-service.service';
import { GitDetails } from 'src/app/Interface/TeamInterface';

@Component({
  selector: 'app-gitlab',
  templateUrl: './gitlab.component.html',
  styleUrls: ['./gitlab.component.css']
})
export class GitlabComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @Input('taskId') taskId: string;
  @Input('orgDomain') orgDomain: string;
  @Input('prLink') prLink: string;
  @Input('prApiLink') prApiLink: string;
  @Input('PrNumber') PrNumber: number;
  @Input('prState') prState: string;
  @Input('task') task: Tasks
  @Output() addedPrLink = new EventEmitter<{ completed: boolean, prLink: string, prApiLink: string }>();
  componentName: string = "LINK"
  linkURL: string;
  linkType: string;
  enableLoader: boolean = false;
  showClose: boolean = false;
  prData: GitRepoData[] = [];
  prNumber: number;
  teamId:string;
  team: Team
  repoLink: string
  noRepoLinked: boolean = false;
  noPrExist: boolean = false;
  prLinked: boolean = false;
  prtitle: string;
  prTask: GitRepoData;
  prFound: boolean =false;
  WtId: string;
  gitData: GitDetails[];
  projectId: number;

  constructor(private githubService: GithubServiceService, public gitlabService: GitlabServiceService, public applicationSettingsService: ApplicationSettingsService, private startService: StartServiceService, private userService: UserServiceService, private backendService: BackendService, private functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService, public validationService: ValidationService, public PopupHandlerService: PopupHandlerService,
    public teamService: TeamServiceService) { }

  ngOnInit(): void {
    this.showClose = false;
    this.teamId = this.task.TeamId;
    if(this.startService.showTeams) {
      this.getTeamDetails(this.teamId);
    } else {
      this.startService.userDataStateObservable.subscribe((data) => {
        if(data){
          this.getTeamDetails(this.teamId);
        }
      });
    }
  }
  getTeamDetails(teamId: string) {
    this.applicationSettingsService.getTeamDetails(teamId);
    this.team = this.applicationSettingsService.team;
    this.repoLink=this.team.ProjectLink;
    if(this.repoLink!=""){
      this.getGitDetails();
      this.getPullRequests();
    } else {
      this.noRepoLinked=true;
    }
  }

  getGitDetails() {
    const orgDomain = this.backendService.getOrganizationDomain();
    const teamName = this.teamService.teamsDataJson[this.teamId].TeamName;
    const callable = this.functions.httpsCallable('teams/getGitDetails');
    callable({OrganizationDomain: orgDomain, TeamName: teamName}).subscribe({
      next: (data) => {
        this.projectId = data[0]['ProjectId'];
        return this.projectId;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.info('Getting Label Data Successful');
      }
    });
  }

  getPullRequests() {
    const orgDomain = this.backendService.getOrganizationDomain();
    const teamName = this.teamService.teamsDataJson[this.teamId].TeamName;
    const callable = this.functions.httpsCallable('teams/getGitDetails');
    callable({OrganizationDomain: orgDomain, TeamName: teamName}).subscribe({
      next: (data) => {
        this.projectId = data[0]['ProjectId'];
        this.gitlabService.getMergeRequests(this.projectId).pipe(map(data => {
          const prData = data as GitRepoData[];
          return prData;
        })).subscribe(data => {
          this.prData=data;
          if(this.prData.length==0){
            this.noPrExist=true;
        } else {
          this.autoCheckPr(this.prData);
        }
        })
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.info('Getting Label Data Successful');
      }
    });
  }

  autoCheckPr(prData:GitRepoData[]) {
    prData.forEach(element => {
      let body = element.body;     
      if(body) {
        const sp = body.indexOf("## WtId:")

        if(sp != -1){
          const ep = body.indexOf("## ",sp+4);
          var tp = body.slice(sp, ep);
          tp = tp.slice(tp.indexOf(":")+1, tp.lastIndexOf("\r"));

          if(tp.includes(this.taskId)){
            this.prFound = true;
            this.prTask = element;
            this.WtId = ` | WtId:${tp}`            
          }else{
            this.prFound = false;
            console.log("No pr Data found");
            
          }
        }      
      }
    });
  }

  addPrLink(apiUrl, prNumber) {
    // this.prLink = url;
    this.prApiLink=apiUrl;
    this.prNumber=prNumber;
    this.enableLoader = true;
    const callable = this.functions.httpsCallable('tasks/addPrLink');
    callable({ OrganizationDomain: this.orgDomain, TaskID: this.taskId, PrLink: "", PrApiLink: this.prApiLink, PrNumber: this.prNumber }).subscribe({
      next: (data) => {
        console.log("Successfully added PR link");
        this.prLinked = true;
        this.onAddingPr();
      },
      error: (error) => {
        console.error(error);
        this.enableLoader = false;
        this.showClose = true;
      },
      complete: () => console.info('Successfully created PR link')
    }) 
  }
  onAddingPr(){
    this.linkType = "PR";
    this.linkURL = this.prApiLink
    const callable = this.functions.httpsCallable('linker/setLink');
    callable({ OrgDomain: this.orgDomain, TaskID: this.taskId, LinkType: this.linkType, LinkURL: this.linkURL }).subscribe({
      next: (data) => {
        console.log("Successfully added Link");
        this.enableLoader = false;
        this.showClose = true;
        this.PopupHandlerService.addPrActive = false;
        return;
      },
      error: (error) => {
        this.enableLoader = false
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError", "Api");
        console.log("Error", error);
        console.error(error);
      },
      complete: () => console.info('Successfully created Link')
    });
  }
  
  close() {
    if(this.prLinked){
    this.addedPrLink.emit({ completed: this.prLinked, prLink: this.prLink, prApiLink: this.prApiLink});
  }
}
}
