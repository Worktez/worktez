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
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ReleaseData } from 'src/app/Interface/ReleaseInterface';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { GithubServiceService } from 'src/app/services/github-service/github-service.service';
import { TeamServiceService } from 'src/app/services/team/team-service.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
 
 @Component({
   selector: 'app-edit-release',
   templateUrl: './edit-release.component.html',
   styleUrls: ['./edit-release.component.css']
 })
 export class EditReleaseComponent implements OnInit {
    componentName: string = "EDITRELEASE";

    @Input("releaseData") releaseData: ReleaseData;
    @Input("teamId") teamId: string;

    tagName: string
    description: string;
    targetBranch: string; 
    releaseId: string;
    releaseName: string;
    generateRelease: boolean;
    ifDraft: boolean;
    preRelease: boolean;
    choose: string[] = ["true", "false"];

    dataReady: boolean = false;

   enableLoader: boolean = false;
   showClose: boolean = false;
   @Output() editReleaseCompleted = new EventEmitter<{ completed: boolean }>();
   constructor(private validationService:ValidationService, public functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService, private githubService: GithubServiceService, public teamService: TeamServiceService) { }
 
   ngOnInit(): void {
     this.tagName = this.releaseData.tag_name;
     this.description = this.releaseData.body;
     this.targetBranch = this.releaseData.target_commitish;
     this.releaseId = this.releaseData.id;
     this.releaseName = this.releaseData.name;
     this.generateRelease = true;
     this.ifDraft = this.releaseData.draft;
     this.preRelease = this.releaseData.prerelease;

     this.dataReady = true;
   }
 
   editRelease() {
    this.enableLoader = true;
    const projectLink = this.teamService.teamsDataJson[this.teamId].ProjectLink;
    const bearerToken = atob(this.teamService.teamsDataJson[this.teamId].GitToken);
    this.githubService.updateGithubRelease(this.releaseId, bearerToken, this.tagName, this.targetBranch, this.releaseName, this.description, this.ifDraft, this.preRelease, this.generateRelease, projectLink).subscribe({
      next: () => {

      },
      error: () => {

      },
      complete: () => {
        console.info('Successful');
        this.enableLoader = false;
        this.showClose = true;
      }
    });
   }
 
  editReleaseDone() {
    this.editReleaseCompleted.emit({completed:true});
  }
 
  validateRelease() {
    let data = [
      { label: "tagName", value: this.tagName },
      { label: "targetBranch", value: this.targetBranch },
      { label: "description", value: this.description },
    ];
     this.validationService.checkValidity(this.componentName, data).then(
       res => {
         if(res) {
           console.log("Inputs are valid");
           this.editRelease();
         } else {
           console.log("Add Release failed due to validation error!");
         }
       }
     );
    }
 
 }