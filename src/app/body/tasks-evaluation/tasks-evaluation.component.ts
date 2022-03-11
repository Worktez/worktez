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
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { Router } from '@angular/router';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Component({
  selector: 'app-tasks-evaluation',
  templateUrl: './tasks-evaluation.component.html',
  styleUrls: ['./tasks-evaluation.component.css']
})
export class TasksEvaluationComponent implements OnInit {

  componentName: string = "TASKS-EVALUATION";
  tasks = [];
  sprints: Sprint[] = []
  showLoader: boolean;
  selectedTeamId: string;
  selectedTeamName: string;
  todayDate: string;
  time: string;
  teamIds: string[];
  statusLabels: string[];
  priorityLabels: string[];
  difficultyLabels: string[];
  teamMembers: string[];
  teamCurrentSprint: number;
  disableLoadMore: boolean = false;
  taskIdToEdit: string = "";
  fieldToEdit: string = "";
  expandedIcons: boolean = true ;
  

  assigneeName = new FormControl();
  filteredOptionsAssignee: Observable<string[]>;

  nextSprintTasksToFetch: number;

  constructor(private startService: StartServiceService, public navbarHandlerService: NavbarHandlerService, private functions: AngularFireFunctions, public backendService: BackendService, public applicationSettingsService: ApplicationSettingsService, public authService: AuthService, public toolsService: ToolsService, public errorHandlerService: ErrorHandlerService, private router: Router) { }

  ngOnInit(): void {
    this.navbarHandlerService.resetNavbar();
    this.navbarHandlerService.addToNavbar(this.componentName);
    this.todayDate = this.toolsService.date();
    this.time = this.toolsService.time();


    if(this.startService.showTeamsData) {
      this.getData();
    } else {
      this.startService.userDataStateObservable.subscribe((data) => {
        if(data){
          this.startService.applicationDataStateObservable.subscribe((data) => {
            if(data) {
              this.applicationSettingsService.teamData.subscribe((data) => {
                if(data) {
                  console.log("check1")
                  this.getData();
                }
              });
            }
          });
        }
      });
    }
  }

  getData() {
    this.teamCurrentSprint = this.startService.currentSprintNumber;
    this.nextSprintTasksToFetch = this.teamCurrentSprint;
    this.selectedTeamId = this.startService.selectedTeamId;
    this.selectedTeamName = this.startService.teamName;
    this.statusLabels = this.applicationSettingsService.status;
    this.priorityLabels = this.applicationSettingsService.priority;
    this.difficultyLabels = this.applicationSettingsService.difficulty;
    this.teamMembers = this.applicationSettingsService.team.TeamMembers;

    this.filteredOptionsAssignee = this.assigneeName.valueChanges.pipe(
      startWith(''),
      map((value) => {
        return this._filter(value)
      }),
    );
    this.readTasks(); 
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.teamMembers.filter(option => option.toLowerCase().includes(filterValue));
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
          this.getData();
        },
        error: (error) => {
          this.errorHandlerService.showError = true;
          this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
          console.error(error);
        },
        complete: () => console.info('Successful updated Selected Team in db')
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
          this.tasks.push(result.Tasks);
          this.nextSprintTasksToFetch -= 1;
          if (this.nextSprintTasksToFetch < 1) {
            this.disableLoadMore = true;
          }
          this.showLoader = false;
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

  async editTask(task: Tasks, sprintNumber: number) {
    this.showLoader = true;
    let result;
    if (sprintNumber == null) {
      sprintNumber = task.SprintNumber;
    }
        const appKey = this.backendService.getOrganizationAppKey();
        const callable = this.functions.httpsCallable('tasks/editTask');
        await callable({Title: task.Title, Status: task.Status, AppKey: appKey, Id: task.Id, Description: task.Description, Priority: task.Priority, Difficulty: task.Difficulty, Assignee: task.Assignee, EstimatedTime: task.EstimatedTime, Project: task.Project, SprintNumber: sprintNumber, StoryPointNumber: task.StoryPointNumber, OldStoryPointNumber: task.StoryPointNumber, PreviousId: task.SprintNumber, CreationDate: task.CreationDate, Date: this.todayDate, Time: this.time, ChangedData: "", Uid: this.authService.user.uid, Type:task.Type, Reporter: task.Reporter}).subscribe({
          next: (data) => {
            result = data;
            if (result == "OK") {
              this.taskIdToEdit = "";
              task.LastUpdatedDate = this.todayDate;
              task.SprintNumber = sprintNumber;
              this.showLoader = false;
            }
          },
          error: (error) => {
            this.errorHandlerService.showError = true;
            this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
            this.showLoader = false;
          },
          complete: () => console.info("task edited successfully!")
        })
  } 

  onDrop(event: CdkDragDrop<Tasks[]>) {
    this.showLoader = true;
    console.log(event.previousContainer === event.container);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.showLoader = false;
    } else {
      // move to the dragged sprint
      this.editTask(event.previousContainer.data[event.previousIndex], event.container.data[0].SprintNumber).then(() => {
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
          this.tasks = this.tasks.filter(arr => arr.length > 0);
          this.showLoader = false;
      });
    }
  }

  showEditTask(taskId: string, fieldToEdit: string) {
    this.taskIdToEdit = taskId;
    this.fieldToEdit = fieldToEdit;
  }

  selectedAssignee(item, task: Tasks) {
    if(item.selected == false) {
      this.assigneeName.setValue("");
      this.taskIdToEdit = "";
    } else {
      this.assigneeName.setValue(item.data);
      task.Assignee = this.assigneeName.value;
      this.editTask(task, null);
    }
  }
   openTaskDetails(id: string) {
    this.router.navigate(['/TaskDetails', id]);
  }
  iconsToggle(){
    this.expandedIcons= !(this.expandedIcons);
    console.log("icon toggled")
  }
}
