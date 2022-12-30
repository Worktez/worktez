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
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { UntypedFormControl, NgForm } from '@angular/forms';
import { ValidationService } from '../../services/validation/validation.service';
import { ToolsService } from '../../services/tool/tools.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { map, Observable, startWith } from 'rxjs';
import { Milestones } from 'src/app/Interface/MilestoneInterface';
import { MilestoneServiceService } from 'src/app/services/milestone/milestone-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-new-task',
  templateUrl: './create-new-task.component.html',
  styleUrls: ['./create-new-task.component.css']
})
export class CreateNewTaskComponent implements OnInit {

  assigneeName = new UntypedFormControl();
  filteredOptionsAssignee: Observable<string[]>;

  reporterName = new UntypedFormControl();
  filteredOptionsReporter: Observable<string[]>;

  @ViewChild('form') form: NgForm;
  @Output() taskCreated = new EventEmitter<{ completed: boolean }>();

  componentName: string = "CREATE-NEW-TASK";

  childTaskId: string
  title: string
  todayDate: string
  description: string
  watcherName: string[]
  creatorName : string
  estimatedTimeHrs: number
  estimatedTimeMins: number
  totalEstimatedTime: number
  project: string = null
  priority: string = null
  difficulty: string = null
  status: string = null
  sprintNumber: number
  storyPoint: number
  time: string 
  enableLoader: boolean = false
  valid: boolean = true
  task: Tasks
  teamIds: string[]
  teamMembers: string[] = []
  teamName: string
  statusLabels: string[]
  priorityLabels: string[]
  difficultyLabels: string[]
  type: string[]
  taskType: string=null
  parentTaskId: string
  showClose: boolean = false;
  currentSprintNumber: number
  backlogSprintNumber: number
  milestoneData:Milestones[] = []
  selectedMilestoneId:string = ""

  constructor(private functions: AngularFireFunctions, public validationService: ValidationService, public toolsService: ToolsService, public errorHandlerService: ErrorHandlerService, private backendService: BackendService, private authService: AuthService, public applicationSetting: ApplicationSettingsService, public popupHandlerService: PopupHandlerService, public milestoneService: MilestoneServiceService, private route: Router) { }
  ngOnInit(): void {
    this.teamIds=this.backendService.getOrganizationTeamIds();
    this.project = this.authService.getTeamId();
    this.creatorName=this.authService.getUserEmail();
    this.readTeamData(this.project);
    this.todayDate = this.toolsService.date();
    this.time = this.toolsService.time();
    this.parentTaskId = this.popupHandlerService.parentTaskId;
    this.title = this.popupHandlerService.quickNotesTitle;		
    this.description = this.popupHandlerService.quickNotesDescription;
    this.selectedMilestoneId = this.popupHandlerService.milestoneId;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.teamMembers.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  readTeamData(teamId :string) {
    this.enableLoader = true;
    this.applicationSetting.getTeamDetails(teamId);
    const team = this.applicationSetting.team;
    this.priorityLabels = team.Priority;
    this.statusLabels = team.Status;
    this.type = team.Type;
    this.difficultyLabels = team.Difficulty;
    this.teamMembers=team.TeamMembers;
    this.teamName=team.TeamName;
    this.sprintNumber = team.CurrentSprintId;
    this.currentSprintNumber=team.CurrentSprintId;
    this.backlogSprintNumber=-1;

    this.filteredOptionsAssignee = this.assigneeName.valueChanges.pipe(
      startWith(''),
      map((value) => {
        return this._filter(value)
      }),
    );

    this.filteredOptionsReporter = this.reporterName.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
    this.enableLoader = false;
  }

  showBacklog(){
    this.sprintNumber=this.backlogSprintNumber    
  }
    
  activeSprint(){
    this.sprintNumber=this.currentSprintNumber
  }
  
  selectedAssignee(item) {
    if(item.selected == false) {
      this.assigneeName.setValue("");
      this.close();
    } else {
      this.assigneeName.setValue(item.data);
    }
  }

  selectedReporter(item) {
    if(item.selected == false) {
      this.reporterName.setValue("");
      this.close();
    } else {
      this.reporterName.setValue(item.data);
    }
  }

  async submit() {
    if(this.estimatedTimeHrs == undefined && this.estimatedTimeMins != undefined){
      this.estimatedTimeHrs=0
      if(this.estimatedTimeMins<0){
        this.estimatedTimeMins=0
      }
    }
    else if(this.estimatedTimeMins == undefined && this.estimatedTimeHrs!= undefined){
      this.estimatedTimeMins=0
      if(this.estimatedTimeHrs<0){
        this.estimatedTimeHrs=0
      }
    }
    this.totalEstimatedTime=this.toolsService.changeToDecimalTime(this.estimatedTimeHrs,this.estimatedTimeMins)
    let data = [{ label: "title", value: this.title },
    { label: "status", value: this.status },
    { label: "taskType", value: this.taskType },
    { label: "priority", value: this.priority },
    { label: "estimatedTime", value: this.totalEstimatedTime },
    { label: "difficulty", value: this.difficulty },
    { label: "description", value: this.description },
    { label: "creator", value: this.creatorName },
    { label: "project", value: this.teamName },
    { label: "assignee", value: this.assigneeName.value },
    { label: "reporter", value: this.reporterName.value },
    { label: "creationDate", value: this.todayDate },
    { label: "sprintNumber", value: this.sprintNumber },
    { label: "storyPoint", value: this.storyPoint }];

    
    var condition = await (this.validationService.checkValidity(this.componentName, data)).then(res => {
      return res;
    });
    if (condition) {
      console.log("Inputs are valid");
      this.createNewTask();
    }
    else
      console.log("Task not created! Validation error");
  }

  createNewTask() {
    this.enableLoader = true;
    const appKey = this.backendService.getOrganizationAppKey();
    const teamId = this.authService.getTeamId();
    const parentTaskId = this.popupHandlerService.parentTaskId;
    const parentTaskUrl = this.popupHandlerService.parentTaskUrl;
    const callable = this.functions.httpsCallable('tasks/createNewTask');
    callable({TeamId: teamId, AppKey: appKey, Title: this.title, Description: this.description, Priority: this.priority, Difficulty: this.difficulty, Creator: this.creatorName, Assignee: this.assigneeName.value, Reporter: this.reporterName.value, EstimatedTime: this.totalEstimatedTime, Status: this.status, Project: this.teamName, SprintNumber: this.sprintNumber, StoryPointNumber: this.storyPoint, CreationDate: this.todayDate, Time: this.time, Uid: this.authService.userAppSetting.uid, Type: this.taskType, ParentTaskId: parentTaskId, ParentTaskUrl: parentTaskUrl, MilestoneId: this.selectedMilestoneId }).subscribe({
      next: (data) => {
        console.log("Successful created task");
        this.enableLoader=false;
        this.showClose=true;
      },
      error: (error) => {
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        console.error(error);
      },
      complete: () =>{
        const orgDomain = this.backendService.getOrganizationDomain();
        console.info('Successfully created task');
        const path = this.route.url;
      if (path.includes('/MilestoneDetails')) {
        this.milestoneService.getTasks(orgDomain, this.selectedMilestoneId);
      } 
      } 
    });

}

  close() {
    this.taskCreated.emit({ completed: true });
  }
}
