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
 import { BackendService } from 'src/app/services/backend/backend.service';
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
 
   componentName: string = "EDITRELEASE"
   @Input('tagName') tagName: string
   @Input('description') description: string;
   @Input('targetBranch') targetBranch: string; 
   @Input('id') releaseId: string;
   @Input('teamId') teamId: string;
   @Input('releaseName') releaseName: string;
   @Input('generateRelease') generateRelease:string;
   @Input('ifDraft') ifDraft:string;
   @Input('preRelease') preRelease:string;
   response1: boolean;
   response2: boolean;
   response3: boolean;
   teamIds: string[] = [];
   choose: string[] = ["true", "false"];
   bearerToken: string;
 
   enableLoader: boolean = true;
   showClose: boolean;
   @Output() editReleaseCompleted = new EventEmitter<{ completed: boolean }>();
   constructor(private validationService:ValidationService, private backendService: BackendService, public functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService, private githubService: GithubServiceService, public teamService: TeamServiceService) { }
 
   ngOnInit(): void {
     this.enableLoader = false;
     this.teamIds = this.backendService.getOrganizationTeamIds();
   }
 
   editRelease(){
    // the implementation is not correct

    //  this.httpService.getReleaseDetails().subscribe((data) => {
    //    for(let i in data){
    //      if(data[i].tag_name==this.tagName){
    //        const release_Id = data[i].id;
    //        this.bearerToken = this.teamService.teamsDataJson[this.teamId].GitToken;
    //        this.bearerToken = atob(this.bearerToken);
    //        this.httpService.updateGithubRelease(release_Id, this.bearerToken, this.tagName, this.targetBranch, this.releaseName, this.description, this.response1, this.response2, this.response3);
    //        this.editReleaseInDb();
    //      }
    //    }
    //  })
   }
 
    editReleaseDone() {
      this.editReleaseCompleted.emit({completed:true});
    }
 
   validateRelease() {
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
           this.editRelease();
         } else {
           console.log("Add Release failed due to validation error!");
         }
       }
     );
   }
 
 }