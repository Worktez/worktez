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

import { Time } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { AngularFireFunctions } from "@angular/fire/compat/functions";
import { ActivatedRoute, Router } from "@angular/router";
import { error } from "firebase-functions/logger";
import { map, Observable } from "rxjs";
import { Milestones } from "src/app/Interface/MilestoneInterface";
import { AuthService } from "src/app/services/auth.service";
import { BackendService } from "src/app/services/backend/backend.service";
import { ErrorHandlerService } from "src/app/services/error-handler/error-handler.service";
import { NavbarHandlerService } from "src/app/services/navbar-handler/navbar-handler.service";
import { StartServiceService } from "src/app/services/start/start-service.service";
import { ToolsService } from "src/app/services/tool/tools.service";
import { ValidationService } from 'src/app/services/validation/validation.service';
@Component({
  selector: "app-milestone",
  templateUrl: "./milestone.component.html",
  styleUrls: ["./milestone.component.css"],
})
export class MilestoneComponent implements OnInit {
  componentName = "MILESTONES"
  milestoneData: Milestones[] = [];
  addMilestoneActive: boolean = true;
  teamIds: string[] = [];
  public milestoneObservable: Observable<Milestones[]>;
  appkey:string
  teamId: string;
  title: string = ""
  description: string = ""
  showLoader: boolean = false;
  startDate: string
  endDate: string
  constructor(private functions: AngularFireFunctions, private route: ActivatedRoute, private router: Router, public startService: StartServiceService, public errorHandlerService: ErrorHandlerService, public authService: AuthService, public backendService: BackendService, public toolService: ToolsService, public navbarHandler: NavbarHandlerService, public validationService: ValidationService) { }

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

  // setMilestoneWidth = function () {
  //   var width = (100 / this.milestoneList.length).toString() + "%";
  //   return width;
  // };

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

  async validateMilestone() {
    let labels = ['title','project', 'description', 'startDate', 'endDate'];
    let values = [this.title, this.teamId, this.description, this.startDate, this.endDate];
    let data = [{ label: "title", value: this.title },
    { label: "project", value: this.teamId },
    { label: "description", value: this.description },
    { label: "startDate", value: this.startDate },
    { label: "endDate", value: this.endDate }];
    
    var condition = await (this.validationService.checkValidity(this.componentName, data)).then(res => {
      
      return res;
    });
    if (condition) {
      console.log("Inputs are valid");
      this.addMilestone();
    }
    else
      console.log("Log-Work failed due to validation error");
  }

  addMilestone() {
    this.showLoader = true;
    const callable = this.functions.httpsCallable('milestone/addMilestone');
    const date = this.toolService.date();
    const time = this.toolService.time();
    const orgDomain = this.backendService.organizationDetails.OrganizationDomain;
    const uid = this.authService.getLoggedInUser();

    callable({ Uid: uid, OrgDomain: orgDomain, Title: this.title, Description: this.description, TeamId: this.teamId, CreationDate: date, CreationTime: time, StartDate:this.startDate, EndDate: this.endDate }).subscribe({
      next: (data) => {
        console.log("Successful Next");
      },
      error: (error) => {

        console.error(error);
      },
      complete: () => {
        this.addMilestoneActive = false;
        this.title = "";
        this.description = "";
        this.teamId = "";
        this.startDate = "";
        this.endDate = "";
        this.getMilestoneData();
        this.showLoader = false;
      }
    });


  }


}
