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
import { Component, Input, OnInit } from '@angular/core';
import { Team } from 'src/app/Interface/TeamInterface';
import { BackendService } from 'src/app/services/backend/backend.service';
import { GitCDMServiceService } from 'src/app/services/gitCDM-service/git-cdm-service.service';

@Component({
  selector: 'app-git-integration',
  templateUrl: './git-integration.component.html',
  styleUrls: ['./git-integration.component.css']
})
export class GitIntegrationComponent implements OnInit {

  @Input('team') team: Team

  teamToAddGithub: Team;
  addProjectEnabled1: boolean = false;
  addProjectEnabled2: boolean = false;
  typeLink: string;
  repoLink: string;
  repoLoc: string;
  bearerToken: string = "";
  organizationDomain:string
  projectLoc: string;
  projectLoc1: string ="github";
  projectLoc2: string ="gitlab";

  constructor(private backendService: BackendService,public gitCDMService:GitCDMServiceService) { }

  ngOnInit(): void {
    this.gitCDMService.checkGitProject(this.team.ProjectLink,this.team.ProjectLocation)
    this.gitCDMService.checkGitToken(this.team.GitToken);
    this.organizationDomain = this.backendService.getOrganizationDomain();

  }

  enableAddOrganisationLink(team: Team,loca:string) {
    this.teamToAddGithub = team;
    if(loca == 'github'){
      this.addProjectEnabled1 = true;
      this.addProjectEnabled2 = false;
      this.gitCDMService.showClose = false;
    }
    if(loca == 'gitlab'){
      this.addProjectEnabled2 = true;
      this.addProjectEnabled1 = false;
      this.gitCDMService.showClose = false;
    }
    this.typeLink = "Organisation";
  }

  addedProject1(data: { completed: boolean, memberEmail: string, projLink: string}) {
    this.projectLoc = "github";
    this.bearerToken ="";
    this.gitCDMService.gitTokenExists = false;
    this.gitCDMService.addedProject(data,this.team.TeamId,this.projectLoc);
  }

  addedProject2(data: { completed: boolean, memberEmail: string, projLink: string}) {
    this.projectLoc = "gitlab";
    this.bearerToken ="";
    this.gitCDMService.gitTokenExists = false;
    this.gitCDMService.addedProject(data,this.team.TeamId,this.projectLoc);
  }

  unLinkGithub(){
    this.gitCDMService.repoLink="";
    this.gitCDMService.addProjLink(this.repoLink,this.team.TeamName,this.organizationDomain,this.team.ProjectLocation)
  }

  addTokenEnable(){
    this.gitCDMService.enableAddToken = true;
  }

  back() {
    this.gitCDMService.enableAddToken = false;
    this.gitCDMService.showClose = false
  }

  addToken() {
    const gitToken = btoa(this.bearerToken)
    this.gitCDMService.addToken(this.team.TeamName,this.organizationDomain,gitToken);
  }

}