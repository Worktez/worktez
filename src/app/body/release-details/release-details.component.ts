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
import { GithubServiceService } from 'src/app/services/github-service/github-service.service';
import { map } from 'rxjs';
import { GitlabServiceService } from 'src/app/services/gitlab-service/gitlab-service.service';
import { GitDetails } from 'src/app/Interface/TeamInterface';
 
 @Component({
   selector: 'app-release-details',
   templateUrl: './release-details.component.html',
   styleUrls: ['./release-details.component.css']
 })
 export class ReleaseDetailsComponent implements OnInit {
   componentName: string = "RELEASE DETAILS"

   releaseData: ReleaseData;
   releaseDataReady: boolean = false;
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
   releaseDesc: string;
   provider: string;
   gitData: GitDetails[];
   projectId: number;

   constructor(public navbarHandler: NavbarHandlerService ,public backendService: BackendService, private githubService: GithubServiceService, private route: ActivatedRoute, private location: Location, public teamService: TeamServiceService, public errorHandlerService: ErrorHandlerService, public startService: StartServiceService, private gitlabService: GitlabServiceService) { }

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
    if (this.provider=="Github") {
      this.githubService.deleteGithubRelease(id, bearerToken);
    } else if (this.provider=="gitlab") {
      const orgDomain = this.backendService.getOrganizationDomain();
      const teamName = this.teamService.teamsDataJson[this.teamId].TeamName;
      this.gitData=this.teamService.getGitDetails(orgDomain, teamName);
      this.projectId = this.gitData['ProjectId'];
      this.gitlabService.deleteGitlabRelease(this.projectId, this.releaseData.tag_name, bearerToken).subscribe({
        next: (data) => {
          console.log("Successfull");
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log("Successfull");
        }
      });
    }
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
    this.provider = this.teamService.teamsDataJson[this.teamId].ProjectLocation;
    if (this.provider == "Github") {
      this.githubService.getReleaseByReleaseId(this.releaseId, bearerToken, projectLink).pipe(map(data => {
        const objData = data as ReleaseData;
        return objData;
      })).subscribe({
        next: (data) => {
            this.releaseData = data;
            this.githubService.markdownGithubDoc(bearerToken, this.releaseData.body).subscribe({
              next: (data) => {
                this.releaseDesc=data;
                this.formatReleaseDescription();
                this.releaseDataReady = true;
                this.showLoader = false;
              },
              error: (error) => {
                console.log(error);
              },  
              complete: () => {
                console.log("Successfull release markdown")
              }
            });
        },
        error: (error) => {
          console.error(error);
        },
        complete() {
          console.log("Success");
        },
      });
    } else if (this.provider == "gitlab") {
      const orgDomain = this.backendService.getOrganizationDomain();
      const teamName = this.teamService.teamsDataJson[this.teamId].TeamName;
      this.gitData=this.teamService.getGitDetails(orgDomain, teamName);
      this.projectId = this.gitData['ProjectId'];
      console.log(this.projectId);
      this.gitlabService.getReleaseByTagName(this.projectId, bearerToken, this.releaseId).pipe(map(data => {
        const objData = data as ReleaseData;
        return objData;
      })).subscribe({
        next: (data) => {
          this.releaseData = data;
          this.releaseDataReady = true;
          this.showLoader = false;
        },
        error: (error) => {
          console.error(error);
        },
        complete() {
          console.log("Success");
        },
      })
    }
  }

  formatReleaseDescription(){
    const regExp1 = new RegExp('.com</a>', 'g');
    this.releaseDesc = this.releaseDesc.replace(regExp1, '.com</a><br>');
    const regExp2 = new RegExp('<a href="mailto', 'g')
    this.releaseDesc = this.releaseDesc.replace(regExp2, ': <a href="mailto');
  }
 
   editReleaseCompleted(){
     this.getReleaseDetails();
   }
 
 }