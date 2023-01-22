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
 import { AngularFireFunctions } from '@angular/fire/compat/functions';
 import { CookieService } from 'ngx-cookie-service';
 import { map } from "rxjs";
 import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
 import { AuthService } from 'src/app/services/auth/auth.service';
 import { BackendService } from 'src/app/services/backend/backend.service';
 import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
 import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
 import { StartServiceService } from 'src/app/services/start/start-service.service';
 import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { TeamServiceService } from 'src/app/services/team/team-service.service';
import { GitData } from 'src/app/Interface/githubReleaseData'; 
import { GithubServiceService } from 'src/app/services/github-service/github-service.service';
 @Component({
   selector: 'app-release',
   templateUrl: './release.component.html',
   styleUrls: ['./release.component.css']
 })
 export class ReleaseComponent implements OnInit {
   componentName = "RELEASES"
   releaseData: GitData[];
   releaseDataReady: boolean;
   showLoader: boolean = false;
   teamIds: string[] = [];
   appkey:string;
   teamId: string;
   addReleaseActive: boolean = false;
   projectLink: string;
 
   constructor( public startService: StartServiceService, public navbarHandler: NavbarHandlerService, public authService: AuthService, public backendService: BackendService, public applicationSettingsService: ApplicationSettingsService, private functions: AngularFireFunctions, public cookieService: CookieService, public errorHandlerService: ErrorHandlerService,  public popupHandlerService: PopupHandlerService, public teamService: TeamServiceService, private githubService: GithubServiceService) { }
 
   ngOnInit(): void {
     this.navbarHandler.resetNavbar();
     this.navbarHandler.addToNavbar(this.componentName);
     this.releaseDataReady = false;
     if(this.teamService.teamsReady) {
      this.teamIds = this.backendService.getOrganizationTeamIds();
      this.teamId = this.startService.selectedTeamId;
      this.projectLink=this.teamService.teamsDataJson[this.teamId].ProjectLink;
      this.getReleaseDetails();
      } else {
        this.teamService.teamDataStateObservable.subscribe({
          next: (data) => {
            if(data){
              this.teamIds = this.backendService.getOrganizationTeamIds();
              this.teamId = this.startService.selectedTeamId;
              this.projectLink=this.teamService.teamsDataJson[this.teamId].ProjectLink;
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
 
   createRelease() {
     this.addReleaseActive = true;
     this.popupHandlerService.addReleaseActive = true;
   }
 
   updateSelectedTeamId(teamId: string) {
     this.showLoader = true;
     this.releaseDataReady = false;
     this.applicationSettingsService.editedTeamId = teamId;
     this.startService.selectedTeamId = teamId;
     this.authService.userAppSetting.SelectedTeamId = teamId;
     this.startService.readApplicationData();
     this.startService.changeTeam = true;
     this.teamId = teamId;
     this.projectLink=this.teamService.teamsDataJson[this.teamId].ProjectLink;
 
     const callable = this.functions.httpsCallable('users/updateSelectedTeam');
     callable({Uid: this.startService.uid , SelectedTeam: this.startService.selectedTeamId}).subscribe({
       error: (error) => {
         this.errorHandlerService.showError = true;
         this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
         console.error(error);
       },
       complete: (()=>{
         this.cookieService.set("userSelectedTeamId", teamId);
         this.showLoader = false;
         this.getReleaseDetails();
       })
     })
   }

  getReleaseDetails(){
    this.showLoader=true;
    const repoLink=this.teamService.teamsDataJson[this.teamId].ProjectLink;
    if(repoLink!="" && repoLink!=undefined){
      this.githubService.getProjectReleaseDetails(repoLink).pipe(map(data => {
        const objData = data as GitData[];
        return objData;
      })).subscribe({
        next: (data) => {
          this.releaseData=data;
        },
        error: (error) => {
          this.errorHandlerService.showError = true;
          this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        },
        complete: () => {
          this.showLoader = false;
          this.releaseDataReady = true;
        }
      });
    } else{
      this.releaseData=undefined;
      this.showLoader = false;
      this.releaseDataReady = true;
    }
  } 
 
 }