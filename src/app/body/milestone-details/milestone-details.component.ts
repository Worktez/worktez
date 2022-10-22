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

import { Component, ErrorHandler, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Milestones } from 'src/app/Interface/MilestoneInterface';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { BackendService } from 'src/app/services/backend/backend.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { MilestoneServiceService } from 'src/app/services/milestone/milestone-service.service';

@Component({
  selector: 'app-milestone-details',
  templateUrl: './milestone-details.component.html',
  styleUrls: ['./milestone-details.component.css']
})
export class MilestoneDetailsComponent implements OnInit {

  componentName: string = "MILESTONES";
  milestoneId: string;
  milestoneIdToEdit: string = "";
  fieldToEdit: string = "";
  orgDomain: string;
  teamIds: string[];
  allTasks: Tasks[];
  changedData: string = ""
  prevVal = []
  newVal = []
  project: string = ""
  milestoneStatus: string = "Ready to start"
  milestoneStatusLabels: string[]
  sprintNumber: number;
  milestoneData: Milestones
  taskDataReady: boolean;
  milestoneDataReady: boolean;
  showLoader: boolean;
  totalTasks: number = 0;
  totalCompletedTasks: number = 0;
  displayColoumns = ['Status', 'Priority', 'Difficulty', 'Id', 'Title', 'WorkDone'];
  modalDisplayColumsn = ['Id', 'Title'];
  appkey: string = "";
  addTaskActive: boolean = true;
  editMilestoneActive: boolean = false;

  public tasksObservable: Observable<Tasks[]>;
  public milestoneObservable: Observable<Milestones[]>
  constructor(private route: ActivatedRoute, private router: Router, private functions: AngularFireFunctions, public startService: StartServiceService, public backendService: BackendService, public navbarHandler: NavbarHandlerService, private location: Location, public authService: AuthService, public errorHandlerService: ErrorHandlerService, public toolsService: ToolsService, public popupHandlerService: PopupHandlerService, public applicationSetting: ApplicationSettingsService, public validationService: ValidationService, public milestoneService: MilestoneServiceService) {
  }

  ngOnInit(): void {
    this.milestoneId = this.route.snapshot.params['MilestoneId'];
    this.navbarHandler.addToNavbar(this.milestoneId);
    if (this.startService.showTeams) {
      this.project = this.authService.getTeamId();
      this.teamIds = this.backendService.getOrganizationTeamIds();
      this.readTeamData(this.project); 
      this.appkey = this.authService.getAppKey();
      this.backendService.getOrgDetails(this.appkey);
      this.orgDomain = this.backendService.getOrganizationDomain();
      this.showLoader = true;
      this.taskDataReady = false;
      this.milestoneDataReady = false;
      this.sprintNumber = this.startService.teamCurrentSprintNumber;
      this.getMilestoneDetails();
      this.milestoneService.getTasks(this.orgDomain, this.milestoneId);
      this.milestoneService.taskDataStateObservable.subscribe(()=>{
        this.getNumberData();
        this.taskDataReady = true;
      });
      this.prevVal = [this.milestoneData.MilestoneStatus];
    } else {
      this.startService.userDataStateObservable.subscribe((data) => {
        if (data) {
          this.appkey = this.authService.getAppKey();
          this.backendService.getOrgDetails(this.appkey).subscribe(()=>{
            this.orgDomain = this.backendService.getOrganizationDomain();
            this.showLoader = true;
            this.taskDataReady = false;
            this.milestoneDataReady = false;
            this.sprintNumber = this.startService.currentSprintNumber;
            this.getMilestoneDetails();
            console.log("hit in else");
            this.milestoneService.getTasks(this.orgDomain, this.milestoneId);
            this.milestoneService.taskDataStateObservable.subscribe(()=>{
                  this.getNumberData();
                  this.taskDataReady = true;
            });
            this.project = this.authService.getTeamId();
            this.teamIds = this.backendService.getOrganizationTeamIds();
            this.readTeamData(this.project); 
            this.prevVal = [this.milestoneData.MilestoneStatus];
          });
   
        }
      });
    }
  }

  backToMilestones() {
    this.location.back()
  }


  showEditMilestone(milestoneId: string, fieldToEdit: string) {
    this.milestoneIdToEdit = milestoneId;
    this.fieldToEdit = fieldToEdit;
  }

  getTasks() {
    this.milestoneService.getTasks(this.orgDomain, this.milestoneId);
      this.milestoneService.taskDataStateObservable.subscribe(()=>{
        this.getNumberData();
      });
  }
  activateAdd(){
    this.popupHandlerService.addTaskActive = true;
  this.getAllTasks();
  }

  getAllTasks(){
    this.showLoader = true;
    const callable = this.functions.httpsCallable("tasks/getAllTasks");

    callable({ OrgDomain: this.orgDomain, TeamId: this.milestoneData.TeamId, SprintNumber: this.sprintNumber, FilterStatus:"Incomplete"}).pipe(
      map(actions => {
        return actions.data as Tasks[];
      })).subscribe({
        next: (data) => {
          const temp = data;
          this.allTasks = temp.filter((element)=>{
            if(element.MilestoneId != this.milestoneId){
              return element;
            }
          });
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.info("Fetched All Tasks Successfully");
          this.taskDataReady = true;
          this.showLoader = false;
        }
      });
  }


  setMilestoneWidth = function () {
    //Calculations are adjusted for UI Improvisations
    var width = (100 / (this.milestoneService.taskData.length)).toString() + "%";
    return width;
  };
  setProgressWidth() {
    //Calculations are adjusted for UI Improvisations
    var width = ((((this.totalCompletedTasks - 1) / (this.totalTasks)) * 100)+3).toString() + "%";
    return width;
  }

  readTeamData(teamId :string){
    this.showLoader = true;
    this.applicationSetting.getTeamDetails(teamId).subscribe(team => {
         this.milestoneStatusLabels = team.MilestoneStatus;
         console.log(this.milestoneStatusLabels);
    });
    this.showLoader =false;
  }
 

  getMilestoneDetails() {
    this.showLoader = true;
    const callable = this.functions.httpsCallable('milestone/getMilestone')

    callable({ OrgDomain: this.orgDomain, MilestoneId: this.milestoneId }).pipe(
      map(actions => {
        return actions.data as Milestones;
      })).subscribe({
        next: (data) => {
          this.milestoneData = data;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.info("Fetched MilestoneDetails Successfully");
          this.milestoneDataReady = true;
          this.showLoader = false;
        },
      });
  }


  openTaskDetails(taskId) {
    this.router.navigate(['/TaskDetails', taskId]);
  }

  getNumberData() {
    this.totalTasks = this.milestoneService.taskData.length;
    this.milestoneService.taskData.forEach(element => {
      if (element.Status == "Completed") {
        this.totalCompletedTasks = this.totalCompletedTasks + 1;
      }
    });
  }

  createTask(){
    this.popupHandlerService.createNewTaskEnabled= true;
    this.popupHandlerService.resetTaskIds();
    this.popupHandlerService.milestoneId = this.milestoneId;
  }

  editMilestone(){
    this.editMilestoneActive = true;
  }

  editMilestoneCompleted(){
    this.getMilestoneDetails();
  }
}
