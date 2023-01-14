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

 import { Component, OnInit, Input, Output } from '@angular/core';
 import { AngularFireFunctions } from '@angular/fire/compat/functions';
 import { CreateReleaseData } from 'src/app/Interface/ReleaseInterface';
 import { Location } from '@angular/common';
 import { BackendService } from 'src/app/services/backend/backend.service';
 import { ActivatedRoute } from '@angular/router';
 import { HttpServiceService } from 'src/app/services/http/http-service.service';
 import { GitData } from 'src/app/Interface/githubReleaseData';
 import { TeamServiceService } from 'src/app/services/team/team-service.service';
 import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
 import { AuthService } from 'src/app/services/auth/auth.service';
 
 @Component({
   selector: 'app-release-details',
   templateUrl: './release-details.component.html',
   styleUrls: ['./release-details.component.css']
 })
 export class ReleaseDetailsComponent implements OnInit {
   componentName: string = "RELEASEDETAILS"
   releaseData: CreateReleaseData;
   releaseDataReady: boolean;
   showLoader: boolean;
   orgDomain: string;
   releaseId: string;
   editReleaseActive: boolean = false;
   releaseDescription: GitData[];
   bearerToken: string;
   bodyArray: Array<string>
   updatesArray: Array<string>
   versionName: string;
   releaseDate: string;
   deleteReleaseEnabled: boolean = false;
   teamId: string;

   constructor(private functions: AngularFireFunctions, public backendService: BackendService, private httpService: HttpServiceService,private route: ActivatedRoute, private location: Location, public teamService: TeamServiceService, public errorHandlerService: ErrorHandlerService, private authService: AuthService) { }
 
   ngOnInit(): void {
     this.releaseId = this.route.snapshot.params['ReleaseId'];
     this.orgDomain = this.backendService.getOrganizationDomain();
     this.teamId = this.authService.getTeamId();
     this.getReleaseDetails();
   }
 
   updateRelease(){
     this.editReleaseActive = true;
   }
 
   deleteRelease(tagName: string){
    const projectLink=this.teamService.teamsDataJson[this.teamId].ProjectLink;
       this.httpService.getProjectReleaseDetails(projectLink).subscribe((data) => {
         for(let i in data){
           if(data[i].tag_name==tagName){
             const release_Id = data[i].id;
             this.bearerToken = this.teamService.teamsDataJson[this.teamId].GitToken;
             this.bearerToken = atob(this.bearerToken);
             this.httpService.deleteGithubRelease(release_Id, this.bearerToken, projectLink);
           }
         }
         this.getReleaseDetails();
       });
   }

   setDeleteRelease(){
     this.deleteReleaseEnabled = true;
   }
 
   backToReleases(){
     this.location.back()
   }
 
  getReleaseDetails(){
    this.bearerToken = this.teamService.teamsDataJson[this.teamId].GitToken;
    this.bearerToken = atob(this.bearerToken);
    const projectLink=this.teamService.teamsDataJson[this.teamId].ProjectLink;
    this.httpService.getReleaseByReleaseId(this.releaseId, this.bearerToken, projectLink).subscribe((data) => {  
    const objData = data as CreateReleaseData
    this.releaseData = objData;
    this.releaseDataReady = true;
    this.showLoader = false;
   })
  }
 
   editReleaseCompleted(boolean){
     this.getReleaseDetails();
   }
 
 }