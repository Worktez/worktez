/***********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Sanjay Krishna <sanjaykrishna1203@gmail.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

 import { Component, OnInit } from "@angular/core";
 import { AngularFireFunctions } from "@angular/fire/compat/functions";
 import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
 import { map, Observable } from "rxjs";
 import { Milestones } from "src/app/Interface/MilestoneInterface";
import { ApplicationSettingsService } from "src/app/services/applicationSettings/application-settings.service";
 import { AuthService } from "src/app/services/auth/auth.service";
 import { BackendService } from "src/app/services/backend/backend.service";
 import { ErrorHandlerService } from "src/app/services/error-handler/error-handler.service";
 import { NavbarHandlerService } from "src/app/services/navbar-handler/navbar-handler.service";
import { PopupHandlerService } from "src/app/services/popup-handler/popup-handler.service";
 import { StartServiceService } from "src/app/services/start/start-service.service";
 @Component({
   selector: "app-milestone",
   templateUrl: "./milestone.component.html",
   styleUrls: ["./milestone.component.css"],
 })
 export class MilestoneComponent implements OnInit {
   componentName = "MILESTONES"
   milestoneData: Milestones[] = [];
   completedMilestoneData: Milestones[] = [];
   milestoneDataReady: boolean = false;
   addMilestoneActive: boolean = false;
   teamIds: string[] = [];
   public milestoneObservable: Observable<Milestones[]>;
   appkey:string
   showLoader: boolean = false;
   teamId: string;
   
   
   constructor(private functions: AngularFireFunctions, private router: Router, public startService: StartServiceService, public errorHandlerService: ErrorHandlerService, public authService: AuthService, public backendService: BackendService, public navbarHandler: NavbarHandlerService, public popupHandlerService: PopupHandlerService, public applicationSettingsService: ApplicationSettingsService, public cookieService: CookieService) { }
 
   ngOnInit(): void {
     this.showLoader = true;
     this.navbarHandler.resetNavbar();
     this.navbarHandler.addToNavbar(this.componentName);
     this.milestoneDataReady = false;
     if (this.startService.showTeams) {
     this.appkey = this.authService.getAppKey();
     this.backendService.getOrgDetails(this.appkey);
       this.teamIds = this.backendService.getOrganizationTeamIds();
       this.teamId = this.authService.getTeamId();
       this.getMilestoneData();
     } else {
       this.startService.userDataStateObservable.subscribe((data) => {
         if (data) {
           this.appkey = this.authService.getAppKey();
           this.backendService.getOrgDetails(this.appkey).subscribe(()=>{
            this.teamIds = this.backendService.getOrganizationTeamIds();
           });
           this.teamId = this.authService.getTeamId();
           this.getMilestoneData();
         }
       });
     }
   }
 
   acitivateAdd(){
     this.addMilestoneActive = true;
     this.popupHandlerService.addMilestoneActive = true;
   }
   
   updateSelectedTeamId(teamId: string) {
     this.showLoader = true;
     this.milestoneDataReady = false;
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
          this.getMilestoneData();
        })
    });
  }
 
   getMilestoneData() {
     this.showLoader = true;
     const orgDomain = this.backendService.getOrganizationDomain();
     const callable = this.functions.httpsCallable("milestone/getAllMilestones");
     callable({ OrgDomain: orgDomain, TeamId: this.startService.selectedTeamId  }).pipe(
       map(actions => {
         return actions.data as Milestones[];
       })).subscribe({
         next: (data) => {
           if (data) {
             this.milestoneData = data;
             this.milestoneData.forEach(milestone => {
              if(milestone.MilestoneStatus == "Completed"){
                this.completedMilestoneData.push(milestone);
              }
             })
           }
         },
         error: (error) => {
           console.error(error);
         },
         complete: () => {
           console.info("Fetched Milestones Data Successfully");
           this.showLoader = false;
           this.milestoneDataReady = true;
         }
       })
   }
 
   getMilestoneDetails(milestoneId: number) {
     this.router.navigate(['MilestoneDetails/', milestoneId]);
   }
 }