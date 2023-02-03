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

import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { GitData } from 'src/app/Interface/githubReleaseData'
import { ValidationService } from 'src/app/services/validation/validation.service';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { TeamServiceService } from 'src/app/services/team/team-service.service';
import { Router } from '@angular/router';
import { GithubServiceService } from 'src/app/services/github-service/github-service.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

@Component({
  selector: 'app-add-release',
  templateUrl: './add-release.component.html',
  styleUrls: ['./add-release.component.css']
})
export class AddReleaseComponent implements OnInit {

  componentName: string = "ADDRELEASES"

  @Input("teamId") teamId: string;
  @Input("teamIds") teamIds: string[];
  @Output() getReleases: EventEmitter<string> = new EventEmitter();

  gitData: GitData[] = [];
  minDate:string;
  showLoader: boolean = false;
  addReleaseActive: boolean = true;
  generateRelease: string = "true";
  preRelease: string = "true";
  ifDraft: string = "false";
  releaseDate: string;
  description: string = "";
  bearerToken: string;
  tagName: string;
  repoName: string;
  releaseName: string;
  ownerName: string;
  targetBranch: string;
  dataFetched: boolean = false;
  choose: string[] = ["true", "false"];
  response1: boolean;
  response2: boolean;
  response3: boolean;
  enableAddToken : boolean = false;
  githubTokenExists: boolean = false;
  teamName: string;
  gitToken: string;
  title: string;
  tokenExpired: boolean =false;

  constructor(public popupHandlerService: PopupHandlerService,  public toolService: ToolsService, public backendService: BackendService, public authService: AuthService,  private githubService: GithubServiceService, public validationService: ValidationService, private functions: AngularFireFunctions, public teamService: TeamServiceService, public router: Router, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.releaseDate = this.toolService.date();
    const dateArray = this.releaseDate.split('-');
    this.minDate = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
    this.checkGitTokenExists();
  }

  generateToken(){
    this.router.navigate(['TeamDetails', this.teamId]);
  }

  addReleaseDetailsToDB(){
    this.showLoader = true;
    const orgDomain = this.backendService.organizationDetails.OrganizationDomain;
    const callable = this.functions.httpsCallable('makeRelease/addRelease');
    callable({ReleaseName: this.releaseName, TagName: this.tagName, TargetBranch: this.targetBranch, Description: this.description, IfDraft: this.ifDraft, PreRelease: this.preRelease, GenerateRelease: this.generateRelease, ReleaseDate: this.releaseDate, TeamId: this.teamId, OrgDomain: orgDomain, Title: this.title}).subscribe({
      next: (data) => {
        console.log("Successful Next");
        this.showLoader = false;
      },
      error: (error) => {
        console.log(error);
      }, 
      complete: () => {
        this.releaseName = "";
        this.description = "";
        this.tagName = "";
        this.targetBranch = "";
        this.ifDraft = "";
        this.preRelease = "";
        this.generateRelease = "";
        this.releaseDate = "";
        this.teamId = "";
        this.title = "";
        this.getReleases.emit();
        this.popupHandlerService.addReleaseActive = false;
        this.showLoader = false;
      }
    });
  }

  checkGitTokenExists(){
    if(this.teamService.teamsDataJson[this.teamId].GitToken != undefined && this.teamService.teamsDataJson[this.teamId].GitToken != "" && this.teamService.teamsDataJson[this.teamId].GitToken != null) {
      this.githubTokenExists=true;
    }
  }

  validateRelease() {
    if(this.githubTokenExists){
    if(this.generateRelease=="true"){
      this.response1=true;
    } else {
      this.response1=false
    }
    if(this.ifDraft == "true"){
      this.response2=true;
    } else {
      this.response2=false;
    }
    if(this.preRelease == "true"){
      this.response3=true;
    } else{
      this.response3=false;
    }
    let data = [{ label: "tagName", value: this.tagName },
    { label: "targetBranch", value: this.targetBranch },
    { label: "description", value: this.description },
  ];
    this.validationService.checkValidity(this.componentName, data).then(
      res => {
        if(res) {
          console.log("Inputs are valid");
          this.addRelease();
        } else {
          console.log("Add Release failed due to validation error!");
        }
      }
    );
    }
  }

  addRelease() {
    this.showLoader = false;
    const projectLink=this.teamService.teamsDataJson[this.teamId].ProjectLink;
    this.gitToken = this.teamService.teamsDataJson[this.teamId].GitToken;
    this.gitToken = atob(this.teamService.teamsDataJson[this.teamId].GitToken);
    this.githubService.createGithubRelease(this.gitToken, this.releaseName, this.tagName, this.targetBranch, this.description, this.response2, this.response3, this.response1, projectLink).subscribe({
      next: (data) => {
        // this.addReleaseDetailsToDB();
        if(data['status']==201){
        this.popupHandlerService.addReleaseActive = false;
        this.showLoader = false;
        }
      },
      error: (data) => {
        if(data['status']==403){
          console.log("Token is expired");
          this.tokenExpired=true;
          this.showLoader = false;
          let errorType = this.componentName + "_VALIDATION_TITLE";
          this.errorHandlerService.addError(errorType, "Token expired")
          return (false);
        } else if(data['status']==401) {
          let errorType = this.componentName + "_VALIDATION_TITLE";
          this.errorHandlerService.addError(errorType, "Bad Credentials-check the permissions given to git token")
        } else {
          let errorType = this.componentName + "_VALIDATION_TITLE";
          this.errorHandlerService.addError(errorType, "All Fields are mandatory")
        }
      },
      complete: () => {
        console.log("successful");
        this.getReleases.emit();
        this.popupHandlerService.addReleaseActive = false;
        this.showLoader = false;
      }
    });
    // this.releaseName = "";
    // this.description = "";
    // this.tagName = "";
    // this.targetBranch = "";
    // this.ifDraft = "";
    // this.preRelease = "";
    // this.generateRelease = "";
    // this.releaseDate = "";
    // this.teamId = "";
    // this.title = "";
    // this.getReleases.emit();
    // this.popupHandlerService.addReleaseActive = false;
    // this.showLoader = false;
  }
}
