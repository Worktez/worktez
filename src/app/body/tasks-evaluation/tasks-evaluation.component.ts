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
import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { Sprint } from 'src/app/Interface/TeamInterface';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-tasks-evaluation',
  templateUrl: './tasks-evaluation.component.html',
  styleUrls: ['./tasks-evaluation.component.css']
})
export class TasksEvaluationComponent implements OnInit {

  componentName: string = "TASKS-EVALUATION";
  tasks = [];
  upcomingSprintTasks = [];
  sprints: Sprint[] = []
  showLoader: boolean;
  selectedTeamId: string;
  selectedTeamName: string;
  todayDate: string;
  time: string;
  teamCurrentSprint: number;
  disableLoadMore: boolean = false;
  taskIdToEdit: string = "";
  fieldToEdit: string = "";
  expandedIcons: boolean = true ;
  toogleClosedSprint: number[] = [];

  nextSprintTasksToFetch: number;

  constructor(public userService: UserServiceService, public startService: StartServiceService, public navbarHandlerService: NavbarHandlerService, private functions: AngularFireFunctions, public backendService: BackendService, public applicationSettingsService: ApplicationSettingsService, public authService: AuthService, public toolsService: ToolsService, public errorHandlerService: ErrorHandlerService, private router: Router, public cookieService: CookieService) { }

  ngOnInit(): void {
    this.navbarHandlerService.resetNavbar();
    this.navbarHandlerService.addToNavbar(this.componentName);
    this.todayDate = this.toolsService.date();
    this.time = this.toolsService.time();

    if(this.startService.showTeamsData) {
      this.getData();
    } else {
      this.startService.applicationDataStateObservable.subscribe((data) => {
        if(data){
            this.getData();
        }
      });
    }
  }

  getData() {
    this.teamCurrentSprint = this.startService.currentSprintNumber;
    this.nextSprintTasksToFetch = this.teamCurrentSprint;
    this.selectedTeamId = this.startService.selectedTeamId;
    this.selectedTeamName = this.startService.teamName;
    this.readTasks(); 
  }
 
  updateSelectedTeamId(teamId: string) {
    this.applicationSettingsService.editedTeamId = teamId;
    this.startService.selectedTeamId = teamId;
    this.authService.userAppSetting.SelectedTeamId = teamId;
    this.startService.changeTeam = true;

    const callable = this.functions.httpsCallable('users/updateSelectedTeam');
    callable({Uid: this.startService.uid , SelectedTeam: this.startService.selectedTeamId}).subscribe({
        next: (data) => {
          this.tasks=[];
          this.upcomingSprintTasks = [];
          this.getData();
        },
        error: (error) => {
          this.errorHandlerService.showError = true;
          this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
          console.error(error);
        },
        complete: (() => {
          this.cookieService.set("userSelectedTeamId", teamId);
          console.info('Successful updated Selected Team in db');
        })
    });
  }

  readTasks() {
    this.showLoader = true;
    const orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable('tasksEvaluation/readTasksEvaluationData');
      let result;
      let pageToLoad = "";
      if (this.nextSprintTasksToFetch == this.teamCurrentSprint) {
        pageToLoad = "initial";
      } else {
        pageToLoad = "loadMore";
      }
      callable({OrganizationDomain: orgDomain, TeamId: this.selectedTeamId, PageToLoad: pageToLoad, SprintNumber: this.nextSprintTasksToFetch }).subscribe ({
        next: (data) => {
          result = data;
          if (result.BacklogTasks.length > 0) {
            this.tasks.push(result.BacklogTasks);
          }
          if(pageToLoad == "initial"){
            this.upcomingSprintTasks.push(result.UpcomingSprintTasks);
          }
          this.tasks.push(result.Tasks);
          this.nextSprintTasksToFetch -= 1;
          if (this.nextSprintTasksToFetch < 1) {
            this.disableLoadMore = true;
          }

          if(result.Tasks.length) {
            result.Tasks.forEach(element => {
              this.userService.checkAndAddToUsersUsingEmail(element.Assignee);
              this.userService.checkAndAddToUsersUsingEmail(element.Reporter);
              this.userService.checkAndAddToUsersUsingEmail(element.Creator);
            });
            this.userService.fetchUserData().subscribe(()=>{
              this.showLoader = false;
            });
          } else {
            this.showLoader = false;
          }
          console.log("read tasks successfully!")
        },
        error: (error) => {
          this.errorHandlerService.showError = true;
          this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        },
        complete: () => console.info("tasks read successfully")   
      }) 
  }

  getSprintName(sprintNumber: number) {
    if (sprintNumber == -2) {
      return "Deleted";
    } else if (sprintNumber == -1) {
      return "Backlog";
    } else {
      return "Sprint " + sprintNumber;
    }
  }

  editTask(task: Tasks, sprintNumber: number) {
    this.showLoader = false;
    let result;
    if (sprintNumber == null) {
      sprintNumber = task.SprintNumber;
    }
    const appKey = this.backendService.getOrganizationAppKey();
    const callable = this.functions.httpsCallable('tasks/editTask');
    return callable({Title: task.Title, Status: task.Status, AppKey: appKey, Id: task.Id, Description: task.Description, Priority: task.Priority, Difficulty: task.Difficulty, Assignee: task.Assignee, EstimatedTime: task.EstimatedTime, Project: task.Project, SprintNumber: sprintNumber, StoryPointNumber: task.StoryPointNumber, OldStoryPointNumber: task.StoryPointNumber, PreviousId: task.SprintNumber, CreationDate: task.CreationDate, Date: this.todayDate, Time: this.time, ChangedData: "", Uid: this.authService.user.uid, Type:task.Type, Reporter: task.Reporter, MilestoneId:task.MilestoneId }).subscribe({
      next: (data) => {
        result = data;
        if (result == "OK") {
          this.taskIdToEdit = "";
          task.LastUpdatedDate = this.todayDate;
          task.SprintNumber = sprintNumber;
          this.showLoader = false;
          this.tasks = this.tasks.filter(arr => arr.length > 0);
        }
        if(task.MilestoneId == undefined) {
          task.MilestoneId = "";
        }
      },
      error: (error) => {
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        this.showLoader = false;
      },
      complete: () => console.info("task edited successfully!")
    });
  } 

  onDrop(event: CdkDragDrop<Tasks[]>) {
    this.showLoader = false;
    console.log(event.previousContainer === event.container);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.showLoader = false;
    } else {
      // move to the dragged sprint
      this.editTask(event.previousContainer.data[event.previousIndex], event.container.data[0].SprintNumber);
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  onDropUpComingSprint(event: CdkDragDrop<Tasks[]>) {
    this.showLoader = false;
    console.log(event.previousContainer === event.container);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.showLoader = false;
    } else {
      // move to the dragged sprint
      this.editTask(event.previousContainer.data[event.previousIndex], this.teamCurrentSprint + 1);
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  showEditTask(taskId: string, fieldToEdit: string) {
    this.taskIdToEdit = taskId;
    this.fieldToEdit = fieldToEdit;
  }

  iconsToggle(sprintNumber){
    const index = this.toogleClosedSprint.indexOf(sprintNumber);
    if(index != -1) {
      const removed = this.toogleClosedSprint.splice(index, 1);
    } else {
      this.toogleClosedSprint.push(sprintNumber);
    }
    this.expandedIcons= !(this.expandedIcons);
  }
}
