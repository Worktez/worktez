import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { NgForm } from '@angular/forms';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { Router } from '@angular/router';
import { ValidationService } from '../../../services/validation/validation.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service'
import { ToolsService } from 'src/app/services/tool/tools.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { AuthService } from 'src/app/services/auth.service';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

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

  constructor(private functions: AngularFireFunctions,  public applicationSetting: ApplicationSettingsService,private authService: AuthService,private router: Router, public validationService: ValidationService, public toolsService: ToolsService, public errorHandlerService: ErrorHandlerService, private backendService: BackendService) { }

  ngOnInit(): void {
    this.todayDate = this.toolsService.date();
    this.time = this.toolsService.time();
    this.readTeamMembers(this.task.TeamId);
    this.previousAssignee = this.task.Assignee;

    this.editTask = this.task;
    this.previousSprintId = this.task.SprintNumber;
    this.prevVal = [this.task.Description, this.task.Assignee, this.task.EstimatedTime, this.task.Priority, this.task.Difficulty, this.task.StoryPointNumber, this.task.Type, this.task.Status, this.task.Title];
  }
  readTeamMembers(teamId :string){
    this.applicationSetting.getTeamDetails(teamId).subscribe(team => {
          this.teamMembers=team.TeamMembers;
          this.teamName=team.TeamName;
    }); 
  }

  async submit() {
    if(this.editTask.Assignee!==this.previousAssignee){
    this.editTask.Assignee = this.toolsService.getEmailString(this.editTask.Assignee);
    }
    let data = [{ label: "priority", value: this.editTask.Priority },
    { label: "estimatedTime", value: this.editTask.EstimatedTime },
    { label: "difficulty", value: this.editTask.Difficulty },
    { label: "description", value: this.editTask.Description },
    { label: "assignee", value: this.editTask.Assignee },
    { label: "sprintNumber", value: this.editTask.SprintNumber },
    { label: "storyPoint", value: this.editTask.StoryPointNumber }];
    var condition = await (this.validationService.checkValidity(this.componentName, data)).then(res => {
      return res;
    });
    if (condition) {
      this.newVal = [this.editTask.Description, this.editTask.Assignee, this.editTask.EstimatedTime, this.editTask.Priority, this.editTask.Difficulty, this.editTask.StoryPointNumber, this.editTask.Type, this.editTask.Status, this.editTask.Title];
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
    if (this.changedData != "")
      this.changedData = "Edited-" + this.changedData;
    this.changedData = this.changedData.substring(0, this.changedData.length - 1) + "."
  }

  async editPage() {
    this.enableLoader = true
    

    try {
      const appKey = this.backendService.getOrganizationAppKey();
      if (!(this.task.Status === "Completed")) {
<<<<<<< HEAD
        const callable = this.functions.httpsCallable('tasks/editTask');
        const result = await callable({AppKey: appKey, Id: this.editTask.Id, Description: this.editTask.Description, Priority: this.editTask.Priority, Difficulty: this.editTask.Difficulty, Assignee: this.editTask.Assignee, EstimatedTime: this.editTask.EstimatedTime, Project: this.task.Project, SprintNumber: this.editTask.SprintNumber, StoryPointNumber: this.editTask.StoryPointNumber, OldStoryPointNumber: this.prevVal[5], PreviousId: this.previousSprintId, CreationDate: this.editTask.CreationDate, Date: this.todayDate, Time: this.time, ChangedData: this.changedData, Uid: this.authService.user.uid, Type:this.editTask.Type}).toPromise();
=======
        const result = await callable({ mode: "edit", AppKey: appKey, Id: this.editTask.Id, Description: this.editTask.Description, Priority: this.editTask.Priority, Difficulty: this.editTask.Difficulty, Assignee: this.editTask.Assignee, EstimatedTime: this.editTask.EstimatedTime, Project: this.task.Project, SprintNumber: this.editTask.SprintNumber, StoryPointNumber: this.editTask.StoryPointNumber, Status: this.editTask.Status, Title: this.editTask.Title, OldStoryPointNumber: this.prevVal[5], PreviousId: this.previousSprintId, CreationDate: this.editTask.CreationDate, Date: this.todayDate, Time: this.time, ChangedData: this.changedData, Uid: this.authService.user.uid, Type:this.editTask.Type}).toPromise();
>>>>>>> f7701dc2d3ff2601f092e0b0135001580c16e847
        this.enableLoader = false;
        this.showClose = true;
      } else {
        console.log("Task is Completed , Cannot Update");
      }
    } catch (error) {
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError");
      this.enableLoader = false;
    }
  }

  editTaskDone() {
    if(this.editTask.Assignee === "")this.editTask.Assignee = this.previousAssignee;
    this.editTaskCompleted.emit({ completed: true });
  }

  backToTaskDetails() {
    window.location.reload();
  }
}
