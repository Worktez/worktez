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
import { map, Observable } from "rxjs";
import { Milestones } from "src/app/Interface/MilestoneInterface";
import { AuthService } from "src/app/services/auth.service";
import { BackendService } from "src/app/services/backend/backend.service";
import { ErrorHandlerService } from "src/app/services/error-handler/error-handler.service";
import { NavbarHandlerService } from "src/app/services/navbar-handler/navbar-handler.service";
import { StartServiceService } from "src/app/services/start/start-service.service";
@Component({
  selector: "app-milestone",
  templateUrl: "./milestone.component.html",
  styleUrls: ["./milestone.component.css"],
})
export class MilestoneComponent implements OnInit {
  componentName = "MILESTONES"
  milestoneData: Milestones[] = [];
  addMilestoneActive: boolean = false;
  teamIds: string[] = [];
  public milestoneObservable: Observable<Milestones[]>;
  appkey:string
  showLoader: boolean = false;
  teamId: string;
  
  constructor(private functions: AngularFireFunctions, private router: Router, public startService: StartServiceService, public errorHandlerService: ErrorHandlerService, public authService: AuthService, public backendService: BackendService, public navbarHandler: NavbarHandlerService) { }

  ngOnInit(): void {
    this.showLoader = true;
    this.navbarHandler.resetNavbar();
    this.navbarHandler.addToNavbar(this.componentName);
    if (this.startService.showTeams) {
    this.appkey = this.authService.getAppKey();
    this.backendService.getOrgDetails(this.appkey);
      this.teamIds = this.backendService.getOrganizationTeamIds();
      this.getMilestoneData();
      this.teamId = this.authService.getTeamId();
      this.showLoader = false;
    } else {
      this.startService.userDataStateObservable.subscribe((data) => {
        if (data) {
          this.appkey = this.authService.getAppKey();
          this.backendService.getOrgDetails(this.appkey);
          this.teamIds = this.backendService.getOrganizationTeamIds();
          this.getMilestoneData();
      this.teamId = this.authService.getTeamId();
          this.showLoader = false;
        }
      });
    }
  }

  acitivateAdd(){
    this.addMilestoneActive = true;
  }

  getMilestoneData() {
    this.showLoader = true;
    this.teamIds = this.backendService.getOrganizationTeamIds();
    const orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable("milestone/getAllMilestones");
    callable({ OrgDomain: orgDomain }).pipe(
      map(actions => {
        return actions.data as Milestones[];
      })).subscribe({
        next: (data) => {
          if (data) {
            this.milestoneData = data;
          }
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.info("Fetched Milestones Data Successfully");
          this.showLoader = false;
        }
      })
  }

  getMilestoneDetails(milestoneId: number) {
    this.router.navigate(['MilestoneDetails/', milestoneId]);
  }
}
