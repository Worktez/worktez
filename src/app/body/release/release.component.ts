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
 import { Team } from 'src/app/Interface/TeamInterface';
 import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
 import { AuthService } from 'src/app/services/auth/auth.service';
 import { BackendService } from 'src/app/services/backend/backend.service';
 import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
 import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
 import { StartServiceService } from 'src/app/services/start/start-service.service';
 import { CreateReleaseData } from "src/app/Interface/ReleaseInterface";
 import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { TeamServiceService } from 'src/app/services/team/team-service.service';
 
 @Component({
   selector: 'app-release',
   templateUrl: './release.component.html',
   styleUrls: ['./release.component.css']
 })
 export class ReleaseComponent implements OnInit {
   componentName = "RELEASES"
   releaseData: CreateReleaseData[] = [];
   releaseDataReady: boolean;
   showLoader: boolean;
   teamIds: string[] = [];
   appkey:string;
   teamId: string;
   addReleaseActive: boolean = false;
   projectLink: string;
   team: Team;
 
   constructor( public startService: StartServiceService, public navbarHandler: NavbarHandlerService, public authService: AuthService, public backendService: BackendService, public applicationSettingsService: ApplicationSettingsService, private functions: AngularFireFunctions, public cookieService: CookieService, public errorHandlerService: ErrorHandlerService,  public popupHandlerService: PopupHandlerService, public teamService: TeamServiceService) { }
 
   ngOnInit(): void {
     this.showLoader = true;
     this.navbarHandler.resetNavbar();
     this.navbarHandler.addToNavbar(this.componentName);
     this.releaseDataReady = false;
     if (this.startService.showTeams) {
       this.appkey = this.authService.getAppKey();
       this.backendService.getOrgDetails(this.appkey);
       this.teamIds = this.backendService.getOrganizationTeamIds();
       this.getReleaseData();
       this.teamId = this.authService.getTeamId();
       this.applicationSettingsService.getTeamDetails(this.teamId);
       this.team = this.applicationSettingsService.team;
       this.projectLink=this.team.ProjectLink;
     } else {
       this.startService.userDataStateObservable.subscribe((data) => {
         if (data) {
           this.appkey = this.authService.getAppKey();
           this.backendService.getOrgDetails(this.appkey).subscribe((data) => {
             this.teamIds = this.backendService.getOrganizationTeamIds();
           });
           this.getReleaseData();
           this.teamId = this.authService.getTeamId();
           this.applicationSettingsService.getTeamDetails(this.teamId);
           this.team = this.applicationSettingsService.team;
           this.projectLink=this.team.ProjectLink;
         }
       })
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
       })
     })
   }
 
   getReleaseData() {
     this.showLoader = true;
     const orgDomain = this.backendService.getOrganizationDomain();
     this.teamIds = this.backendService.getOrganizationTeamIds();
     const callable = this.functions.httpsCallable("makeRelease/getAllReleases");
     callable({OrgDomain: orgDomain, TeamId: this.startService.selectedTeamId}).pipe(
       map( actions => {
         return actions.data as CreateReleaseData[];
       })).subscribe({
         next: (data) => {
           if(data){
             this.releaseData = data;
           }
         },
         error: (error) => {
           console.error(error);
         },
         complete: () => {
           console.info("Releases fetched successfully");
           this.showLoader = true;
           this.releaseDataReady = true;
         }
       })
   }
 
   getReleaseDetails(releaseId: number){
     
   }
 
 }