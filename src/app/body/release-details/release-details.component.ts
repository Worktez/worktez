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
 import { map } from 'rxjs';
 import { ActivatedRoute } from '@angular/router';
 import { HttpServiceService } from 'src/app/services/http/http-service.service';
 import { GitData } from 'src/app/Interface/githubReleaseData';
import { TeamServiceService } from 'src/app/services/team/team-service.service';
 
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

   constructor(private functions: AngularFireFunctions, public backendService: BackendService, private httpService: HttpServiceService,private route: ActivatedRoute, private location: Location, public teamService: TeamServiceService) { }
 
   ngOnInit(): void {
     this.releaseId = this.route.snapshot.params['ReleaseId'];
     this.orgDomain = this.backendService.getOrganizationDomain();
     this.getReleaseDetails();
   }
 
   updateRelease(){
     this.editReleaseActive = true;
   }
 
   deleteRelease(tagName: string){
       this.httpService.getReleaseDetails().subscribe((data) => {
         for(let i in data){
           if(data[i].tag_name==tagName){
             const release_Id = data[i].id;
             this.bearerToken = this.teamService.teamsDataJson[this.releaseData.TeamId].GitToken;
             this.bearerToken = atob(this.bearerToken);
             this.httpService.deleteGithubRelease(release_Id, this.bearerToken);
             this.deleteGithubReleaseDb();
           }
         }
       });
   }

   setDeleteRelease(){
     this.deleteReleaseEnabled = true;
   }
 
   deleteGithubReleaseDb(){
     const callable = this.functions.httpsCallable('makeRelease/deleteRelease')
     callable({OrgDomain: this.orgDomain, ReleaseId: this.releaseId}).subscribe({
       next: (data) => {
         console.log("Successfull");
       },
       error: (error) => {
         console.log("Error", error);
         console.error(error);
       },
       complete: () => console.info("Successfully updated in db")
     });
     console.info("Deleting Release");
   }
 
   backToReleases(){
     this.location.back()
   }
 
   getReleaseDetails(){
     this.showLoader = true;
     const callable = this.functions.httpsCallable('makeRelease/getRelease')
 
     callable({ OrgDomain: this.orgDomain, ReleaseId: this.releaseId}).pipe(
       map(actions => {
         return actions.data as CreateReleaseData;
       })).subscribe({
         next: (data) => {
           this.releaseData = data;
           this.httpService.getReleaseDetails().subscribe((data) => {
             for(let i in data){
               if(data[i].tag_name==this.releaseData.TagName){
                 const release_Id = data[i].id;
                 const bearerToken = "";
                 this.httpService.getReleaseByReleaseId(release_Id, bearerToken).subscribe(data => {
                   const objData = data as GitData[];
                   this.releaseDescription=objData;
                   return this.releaseDescription;
                 })
               }
             }
             this.bodyArray = this.releaseData.Description.split("\n");
           });
         },
         error: (error) => {
           console.log(error);
         },
         complete: () => {
           console.info("Fetched Release Details Successfully");
           this.releaseDataReady = true;
           this.showLoader = false;
         },
       });
   }
 
   editReleaseCompleted(boolean){
     this.getReleaseDetails();
   }
 
 }