/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* Author : Swapnil Bankar <swapnilbankar1010@gmail.com>
*    
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/ 
import { Component, Input, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Team } from 'src/app/Interface/TeamInterface';
import { BackendService } from 'src/app/services/backend/backend.service';
import { TeamServiceService } from 'src/app/services/team/team-service.service';

@Component({
  selector: 'app-git-integration',
  templateUrl: './git-integration.component.html',
  styleUrls: ['./git-integration.component.css']
})
export class GitIntegrationComponent implements OnInit {

  @Input('team') team: Team

  teamToAddGit: Team;
  addProjectEnabled: boolean = false;
  addProjectEnabled1: boolean = false;
  addProjectEnabled2: boolean = false;
  typeLink: string;
  repoLink: string;
  repoLoc: string;
  bearerToken: string = "";
  organizationDomain:string;
  projectLoc1: string ="github";
  projectLoc2: string ="gitlab";
  projectLinked: boolean= false;
  gitTokenExists: boolean = false;
  enableAddToken: boolean = false;
  showClose: boolean = false;
  enableLoader: boolean = false;

  constructor(private backendService: BackendService,private teamService: TeamServiceService,private functions: AngularFireFunctions) { }

  ngOnInit(): void {
    this.checkGitProject(this.team.ProjectLink,this.team.ProjectLocation)
    this.checkGitToken(this.team.GitToken);
    this.organizationDomain = this.backendService.getOrganizationDomain();

  }

  enableAddOrganisationLink(team: Team,loca:string) {
    this.teamToAddGit = team;
    if(loca == 'github'){
      this.addProjectEnabled1 = true;
      this.addProjectEnabled2 = false;
      this.showClose = false;
    }
    if(loca == 'gitlab'){
      this.addProjectEnabled2 = true;
      this.addProjectEnabled1 = false;
      this.showClose = false;
    }
    this.typeLink = "Organisation";
  }

  
  checkGitToken(gitToken: string){
    if(gitToken!=undefined){
      if(gitToken==""){
        this.gitTokenExists=false;
      }
      else{
        this.gitTokenExists=true;
      }
    }
  }
  
  checkGitProject(ProjectLink:string,ProjectLocation:string){
    if(ProjectLink!=undefined){
      if(ProjectLink==""){
        this.projectLinked=false;
      }
      else{
        this.projectLinked=true;
        this.repoLink=ProjectLink;
        this.repoLoc=ProjectLocation;
      }
    }
  }
  
  unLinkGithub(){
    this.repoLink="";
    this.addProjLink(this.repoLink,this.team.TeamName,this.organizationDomain,this.team.ProjectLocation)
  }

  addTokenEnable(){
    this.enableAddToken = true;
  }

  back() {
    this.enableAddToken = false;
    this.showClose = false
  }

  addedGithubProject(data: { completed: boolean, memberEmail: string, projLink: string}) {
    this.addProjectEnabled = false;
    this.bearerToken ="";
    this.gitTokenExists = false;
    if(data.completed==true){
      this.projectLinked=data.completed;
      this.repoLink=data.projLink;
      this.repoLoc=this.projectLoc1;
      this.teamService.teamsDataJson[this.team.TeamId].ProjectLink = this.repoLink;
      this.teamService.teamsDataJson[this.team.TeamId].ProjectLocation = this.repoLoc;
    }
  }

  addedGitlabProject(data: { completed: boolean, memberEmail: string, projLink: string}) {
    this.addProjectEnabled = false;
    this.bearerToken ="";
    this.gitTokenExists = false;
    if(data.completed==true){
      this.projectLinked=data.completed;
      this.repoLink=data.projLink;
      this.repoLoc=this.projectLoc2;
      this.teamService.teamsDataJson[this.team.TeamId].ProjectLink = this.repoLink;
      this.teamService.teamsDataJson[this.team.TeamId].ProjectLocation = this.repoLoc;
    }
  }

  addProjLink(projLink: string,teamName: string,organizationDomain: string,projLocation:string){
    this.enableLoader=true;
    const callable = this.functions.httpsCallable('teams/addProjLink');
    callable({OrganizationDomain: organizationDomain, TeamName: teamName , ProjLink: projLink, ProjLocation: projLocation}).subscribe({
      next: (data) => {
        this.enableLoader=false;
        this.showClose = true;
      },
      error: (error) => {
        console.error(error);
        this.enableLoader=false;
        this.showClose = true;
      },
      complete: () => console.info('Successfully created project link')
    })
  }

  addToken() {
    const gitToken = btoa(this.bearerToken)
    this.enableLoader=true;
    const callable = this.functions.httpsCallable('teams/addGitToken');
    callable({OrganizationDomain: this.organizationDomain, TeamName: this.team.TeamName, Token: gitToken}).subscribe({
      next: (data) => {
        this.checkGitToken(gitToken);
        this.enableLoader=false;
        this.showClose = true;
      },
      error: (error) => {
        console.error(error);
        this.enableLoader=false;
        this.showClose = true;
      },
      complete: () => console.info('Successfully Added Token')
    });
  }

}