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
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Router } from '@angular/router';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { AuthService } from 'src/app/services/auth.service';
import { ToolsService } from '../../../services/tool/tools.service';
import { Location } from '@angular/common';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent implements OnInit {
  @Input('task') task: Tasks
  @Output() editTaskCompleted = new EventEmitter<{ completed: boolean }>();

  componentName: string = "TASK-DETAILS"
  
  sprintName: string
  Id: string
  logWorkEnabled: boolean = false
  editTaskEnabled: boolean = false
  userLoggedIn: boolean = false
  todayDate: string
  time: string
  orgDomain: string
  showClose: boolean = false;
  enableLoader: boolean = false;
  uid: string = "";

  constructor(private router: Router, private functions: AngularFireFunctions, public authService: AuthService, private location: Location, public toolsService: ToolsService, public errorHandlerService: ErrorHandlerService, private backendService: BackendService) { }

  ngOnInit(): void {
    this.uid = this.authService.userAppSetting.uid;
  }

  async deleteTask() {
    this.enableLoader = true;
    const callable = this.functions.httpsCallable('tasks/deleteTask');
    const appKey = this.backendService.getOrganizationAppKey();
    
    await callable({AppKey: appKey, Id: this.task.Id, SprintNumber: this.task.SprintNumber, Project: this.task.Project, Status: this.task.Status, Date: this.todayDate, Time: this.time, Uid: this.uid }).subscribe({
      next: (data) => {
        this.router.navigate(['/']);
        console.log("Successful");
      },
      error: (error) => {
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        console.error(error);
      },
      complete: () => console.info('warning')
  }); 
    location.reload();
  }

  backToTasks() {
    this.location.back();
  }
}