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
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { ToolsService } from 'src/app/services/tool/tools.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  @Input("allTasks") allTasks: Task[];
  @Input("milestoneId") milestoneId:string;
  @Output() getTasks: EventEmitter<string> = new EventEmitter();
  showLoader: boolean = false;
  constructor(public popupHandlerService: PopupHandlerService, public toolsService:ToolsService, public backendService:BackendService, private functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService, public authService: AuthService) { }

  ngOnInit(): void {
  }

  async addTask(task){
    this.showLoader = true
    const todayDate = this.toolsService.date();
    const time = this.toolsService.time();
    const appKey = this.backendService.getOrganizationAppKey();
      const callable = this.functions.httpsCallable('tasks/editTask');
      await callable({Title: task.Title, Status: task.Status, AppKey: appKey, Id: task.Id, Description: task.Description, Priority: task.Priority, Difficulty: task.Difficulty, Assignee: task.Assignee, EstimatedTime: task.EstimatedTime, Project: task.Project, SprintNumber: task.SprintNumber, StoryPointNumber: task.StoryPointNumber, OldStoryPointNumber: task.StoryPointNumber, PreviousId: task.SprintNumber, CreationDate: task.CreationDate, Date: todayDate, Time: time, ChangedData: "Milestone Added", Uid: this.authService.user.uid, Type:task.Type, Reporter: task.reporterName, MilestoneId: this.milestoneId}).subscribe({

        next: (data) => {
          this.showLoader = false;
        },
        error: (error) => {
          this.errorHandlerService.showError = true;
          this.errorHandlerService.getErrorCode("Milestone", "InternalError","Api");
          this.showLoader = false;
          console.error(error);
        },  
        complete: (() =>{ this.getTasks.emit()
        this.popupHandlerService.addTaskActive = false;
        })
    });
    
  }

}
