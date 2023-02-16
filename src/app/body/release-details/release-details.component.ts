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

import { Component, OnInit } from '@angular/core';
import { ReleaseData } from 'src/app/Interface/ReleaseInterface';
import { Location } from '@angular/common';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ActivatedRoute } from '@angular/router';
import { GitData } from 'src/app/Interface/githubReleaseData';
import { TeamServiceService } from 'src/app/services/team/team-service.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { map } from 'rxjs';
import { GitCDMServiceService } from 'src/app/services/gitCDM-service/git-cdm-service.service';
 
 @Component({
   selector: 'app-release-details',
   templateUrl: './release-details.component.html',
   styleUrls: ['./release-details.component.css']
 })
 export class ReleaseDetailsComponent implements OnInit {
   componentName: string = "RELEASE DETAILS"

   releaseData: ReleaseData;
   releaseDataReady: boolean;
   showLoader: boolean;
   releaseId: string;
   editReleaseActive: boolean = false;
   releaseDescription: GitData[];
   bodyArray: Array<string>
   updatesArray: Array<string>
   versionName: string;
   releaseDate: string;
   deleteReleaseEnabled: boolean = false;
   teamId: string;
   releaseDesc: string

   constructor(public navbarHandler: NavbarHandlerService ,public backendService: BackendService,private gitService: GitCDMServiceService, private route: ActivatedRoute, private location: Location, public teamService: TeamServiceService, public errorHandlerService: ErrorHandlerService, public startService: StartServiceService) { }

   ngOnInit(): void {
     this.releaseId = this.route.snapshot.params['ReleaseId'];
     this.navbarHandler.addToNavbar(this.releaseId);
     if(this.teamService.teamsReady) {
      this.teamId = this.startService.selectedTeamId;
      this.getReleaseDetails();
      } else {
        this.teamService.teamDataStateObservable.subscribe({
          next: (data) => {
            if(data){
              this.teamId = this.startService.selectedTeamId;
              this.getReleaseDetails();
            }
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => {
            console.log("Completed getting Team Data");
          }
        });
      }
   }
 
   updateRelease(){
     this.editReleaseActive = true;
   }
 
   deleteRelease(id: string) {
    const bearerToken = atob(this.teamService.teamsDataJson[this.teamId].GitToken);
    this.gitService.deleteGithubRelease(id, bearerToken);
   }

   setDeleteRelease(){
     this.deleteReleaseEnabled = true;
   }
 
   backToReleases(){
     this.location.back()
   }
 
  getReleaseDetails(){
    const bearerToken = atob(this.teamService.teamsDataJson[this.teamId].GitToken);
    const projectLink=this.teamService.teamsDataJson[this.teamId].ProjectLink;
    this.gitService.getReleaseByReleaseId(this.releaseId, bearerToken, projectLink).pipe(map(data => {
      const objData = data as ReleaseData;
      return objData;
    })).subscribe({
      next: (data) => {
          this.releaseData = data;
          this.gitService.markdownGithubDoc(bearerToken, this.releaseData.body).subscribe({
            next: (data) => {
              this.releaseDesc=data;
            },
            error: (error) => {
              console.log(error);
            },  
            complete: () => {
              console.log("Successfull release markdown")
            }
          });
          this.releaseDataReady = true;
          this.showLoader = false;
      },
      error: (error) => {
        console.error(error);
      },
      complete() {
        console.log("Success");
      },
    });
  }
 
   editReleaseCompleted(){
     this.getReleaseDetails();
   }
 
 }