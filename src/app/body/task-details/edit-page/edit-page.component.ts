/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* 
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { FormControl, NgForm } from '@angular/forms';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { Router } from '@angular/router';
import { ValidationService } from '../../../services/validation/validation.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service'
import { ToolsService } from 'src/app/services/tool/tools.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { AuthService } from 'src/app/services/auth.service';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { map, Observable, startWith } from 'rxjs';
import { Milestones } from 'src/app/Interface/MilestoneInterface';
@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

  assigneeName = new FormControl();
  filteredOptionsAssignee: string[];

  reporterName = new FormControl();
  filteredOptionsReporter: string[];

  componentName: string = "EDIT-TASK";

  @ViewChild('form') form: NgForm;
  @Input('task') task: Tasks
  @Output() editTaskCompleted = new EventEmitter<{ completed: boolean }>();

  editTask: Tasks
  previousSprintId: number
  enableLoader: boolean = false;
  todayDate: string
  time: string
  changedData: string = ""
  prevVal = []
  newVal = []
  showClose: boolean = false;
  teamMembers: string[]
  teamName: string
  previousAssignee:string
  sprintNumber: number
  currentSprintNumber: number
  backlogSprintNumber: number
  milestoneData=[]
  milestoneId:string

  constructor(private functions: AngularFireFunctions,  public applicationSetting: ApplicationSettingsService,private authService: AuthService,private router: Router, public validationService: ValidationService, public toolsService: ToolsService, public errorHandlerService: ErrorHandlerService, private backendService: BackendService) { }

  ngOnInit(): void {
    this.todayDate = this.toolsService.date();
    this.time = this.toolsService.time();
    this.readTeamMembers(this.task.TeamId);
    this.previousAssignee = this.task.Assignee;
    this.getMilestoneData(this.task.TeamId);
    this.assigneeName.setValue(this.task.Assignee);
    this.reporterName.setValue(this.task.Reporter);
    this.editTask = this.task;
    this.previousSprintId = this.task.SprintNumber;
    this.prevVal = [this.task.Description, this.task.Assignee, this.task.EstimatedTime, this.task.Priority, this.task.Difficulty, this.task.StoryPointNumber, this.task.Type, this.task.Status, this.task.Title, this.task.Reporter, this.task.MilestoneId];
  }
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.teamMembers.filter(option => option.toLowerCase().includes(filterValue));
  }

  readTeamMembers(teamId :string){
    this.applicationSetting.getTeamDetails(teamId).subscribe(team => {
          this.teamMembers=team.TeamMembers;
          this.teamName=team.TeamName;
          this.currentSprintNumber=team.CurrentSprintId;
          this.backlogSprintNumber=-1;


          this.assigneeName.valueChanges.pipe(
            startWith(''),
            map((value) => {
              return this._filter(value)
            }),
          ).subscribe({
            next :(data) => {
              this.filteredOptionsAssignee = data
            },
            error:(error) => {
              console.error(error)
            },
            complete:() => console.info("Getting filtered options Assignee was successfull")
          });

          this.reporterName.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value)),
          ).subscribe({
            
            next :(data) => {
              this.filteredOptionsReporter = data
            },
            error:(error) => {
              console.error(error)
            },
            complete:() => console.info("Getting filtered options Assignee was successfull")
          });
    }); 
  }

  selectedAssignee(item) {
    if(item.selected == false) {
      this.assigneeName.setValue("");
      this.editTaskDone();
    } else {
      this.assigneeName.setValue(item.data);
    }
  }

  selectedReporter(item) {
    if(item.selected == false) {
      this.reporterName.setValue("");
      this.editTaskDone();
    } else {
      this.reporterName.setValue(item.data);
    }
  }

  async submit() {
    let data = [{ label: "priority", value: this.editTask.Priority },
    { label: "estimatedTime", value: this.editTask.EstimatedTime },
    { label: "difficulty", value: this.editTask.Difficulty },
    { label: "description", value: this.editTask.Description },
    { label: "assignee", value: this.assigneeName.value},
    { label: "sprintNumber", value: this.editTask.SprintNumber },
    { label: "storyPoint", value: this.editTask.StoryPointNumber }];
    var condition = await (this.validationService.checkValidity(this.componentName, data)).then(res => {
      return res;
    });
    if (condition) {
      this.newVal = [this.editTask.Description, this.assigneeName.value, this.editTask.EstimatedTime, this.editTask.Priority, this.editTask.Difficulty, this.editTask.StoryPointNumber, this.editTask.Type, this.editTask.Status, this.editTask.Title, this.reporterName.value, this.milestoneId];
      this.generateChanges();
      console.log("Inputs are valid");
      this.editPage();
    }
    else
      console.log("Page not edited due to validation error");
  }

  async generateChanges() {
    if (this.prevVal[0] != this.newVal[0])
      this.changedData = this.changedData + " description,";
    if (this.prevVal[1] != this.newVal[1])
      this.changedData = this.changedData + " assignee,";
    if (this.prevVal[2] != this.newVal[2])
      this.changedData = this.changedData + " estimated-time,";
    if (this.prevVal[3] != this.newVal[3])
      this.changedData = this.changedData + " priority,";
    if (this.prevVal[4] != this.newVal[4])
      this.changedData = this.changedData + " difficulty,";
    if (this.prevVal[5] != this.newVal[5])
      this.changedData = this.changedData + " story-point,";
    if (this.prevVal[6] != this.newVal[6])
      this.changedData = this.changedData + " type,";
    if (this.prevVal[7] != this.newVal[7])
      this.changedData = this.changedData + " status,";
    if (this.prevVal[8] != this.newVal[8])
      this.changedData = this.changedData + " title,";
    if(this.prevVal[9] != this.newVal[9])
      this.changedData = this.changedData + " reporter,";
    if(this.prevVal[10] != this.newVal[10])
      this.changedData = this.changedData + " milestoneId"
    if (this.changedData != "")
      this.changedData = "Edited-" + this.changedData;
    this.changedData = this.changedData.substring(0, this.changedData.length - 1) + "."
  }

  async editPage() {
    this.enableLoader = true
    

      const appKey = this.backendService.getOrganizationAppKey();
      if (!(this.task.Status === "Completed")) {
        const callable = this.functions.httpsCallable('tasks/editTask');
        await callable({Title: this.editTask.Title, Status: this.editTask.Status, AppKey: appKey, Id: this.editTask.Id, Description: this.editTask.Description, Priority: this.editTask.Priority, Difficulty: this.editTask.Difficulty, Assignee: this.assigneeName.value, EstimatedTime: this.editTask.EstimatedTime, Project: this.task.Project, SprintNumber: this.editTask.SprintNumber, StoryPointNumber: this.editTask.StoryPointNumber, OldStoryPointNumber: this.prevVal[5], PreviousId: this.previousSprintId, CreationDate: this.editTask.CreationDate, Date: this.todayDate, Time: this.time, ChangedData: this.changedData, Uid: this.authService.user.uid, Type:this.editTask.Type, Reporter: this.reporterName.value, MilestoneId: this.milestoneId}).subscribe({
          next: (data) => {
            this.enableLoader = false;
            this.showClose = true;
          },
          error: (error) => {
            this.errorHandlerService.showError = true;
            this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
            this.enableLoader = false;
            console.error(error);
          },
          complete: () => console.info('Successful ')
      });
      } else {
        console.log("Task is Completed , Cannot Update");
      }
  }

  showBacklog(){
    
    this.editTask.SprintNumber=this.backlogSprintNumber    
  }
    
  activeSprint(){
    
    this.editTask.SprintNumber=this.currentSprintNumber 
  }
  

  editTaskDone() {
    if(this.editTask.Assignee === "")this.editTask.Assignee = this.previousAssignee;
    this.editTaskCompleted.emit({ completed: true });
  }

  backToTaskDetails() {
    window.location.reload();
  }

  getMilestoneData(teamId) {
    console.log(teamId);
    const orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable("milestone/getAllMilestones");
    callable({ OrgDomain: orgDomain, TeamId: teamId }).pipe(
      map(actions => {
        return actions.data as Milestones[];
      })).subscribe({
        next: (data)=>{
          if (data) {
            this.milestoneData = data;
          }
        },
        error:(error)=>{
          console.error(error);
        },
        complete:()=>{
          console.log(this.milestoneData);
          console.info("Fetched Milestones Data Successfully");
        }
      })
  }

}


