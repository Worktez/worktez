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
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { NgForm } from '@angular/forms';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { Team } from 'src/app/Interface/TeamInterface';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { GitCDMServiceService } from 'src/app/services/gitCDM-service/git-cdm-service.service';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { TeamServiceService } from 'src/app/services/team/team-service.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-create-git-issue',
  templateUrl: './create-git-issue.component.html',
  styleUrls: ['./create-git-issue.component.css']
})
export class CreateGitIssueComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @Input('taskId') taskId: string;
  @Input('orgDomain') orgDomain: string;
  @Input('task') task: Tasks
  title: string;
  description: string;
  gitToken:string;
  team: Team;
  enableLoader: boolean = false;
  showClose: boolean = false;
  teamId:string;
  repoLink: string;
  
  @Output() createIssue = new EventEmitter<{ completed: boolean }>();
  componentName:string = "Create Issue";

  constructor(private functions: AngularFireFunctions,private startService: StartServiceService,private gitService: GitCDMServiceService,public applicationSettingsService: ApplicationSettingsService, public errorHandlerService: ErrorHandlerService, public validationService: ValidationService,public teamService: TeamServiceService) { }

  ngOnInit(): void {
    this.title=this.task.Title;
    this.description=this.task.Description;
    this.gitToken=this.teamService.teamsDataJson[this.task.TeamId].GitToken;
    this.gitToken=atob(this.teamService.teamsDataJson[this.task.TeamId].GitToken);
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
  }

  submit() {
    this.gitService.createGitIssue(this.title,this.description,this.repoLink,this.gitToken,this.team.ProjectLocation);
    this.showClose = true;
  }
  
  close() {
    this.createIssue.emit({ completed: true });
  }
}

