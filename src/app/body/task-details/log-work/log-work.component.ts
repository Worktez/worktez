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
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ValidationService } from '../../../services/validation/validation.service';
import { ToolsService } from '../../../services/tool/tools.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { AuthService } from '../../../services/auth/auth.service';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';

@Component({
  selector: 'app-log-work',
  templateUrl: './log-work.component.html',
  styleUrls: ['./log-work.component.css']
})
export class LogWorkComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @Input('task') task: Tasks
  @Output() logWorkCompleted = new EventEmitter<{ completed: boolean }>();
  
  componentName: string = "LOG-WORK";
  Id: string
  logWork: Tasks
  logWorkDone: number
  logWorkStatus: string
  totalLoggedTime: number
  loggedTimeHrs: number
  loggedTimeMins: number
  logWorkComment: string
  todayDate: string
  time: string
  enableLoader: boolean = false;
  showClose: boolean = false;

  constructor(public applicationSettingService: ApplicationSettingsService, private functions: AngularFireFunctions, public validationService: ValidationService, public toolsService: ToolsService, public errorHandlerService: ErrorHandlerService, public backendService: BackendService,  private authService: AuthService) { }

  ngOnInit(): void {
    this.todayDate = this.toolsService.date();
    this.time = this.toolsService.time();
    this.logWorkStatus = this.task.Status;
    this.logWorkDone = this.task.WorkDone;
  }
  async submit() {
    if(this.loggedTimeHrs == undefined && this.loggedTimeMins != undefined){
      this.loggedTimeHrs=0
      if(this.loggedTimeMins<0){
        this.loggedTimeMins=0
      }
    }
    else if(this.loggedTimeMins == undefined && this.loggedTimeHrs!= undefined){
      this.loggedTimeMins=0
      if(this.loggedTimeHrs<0){
        this.loggedTimeHrs=0
      }
    }
    this.totalLoggedTime=this.toolsService.changeToDecimalTime(this.loggedTimeHrs,this.loggedTimeMins);
    let labels = ['status', 'logHours', 'workCompleted', 'comment'];
    let values = [this.logWorkStatus, this.totalLoggedTime, this.logWorkDone, this.logWorkComment];
    let data = [{ label: "status", value: this.logWorkStatus },
    { label: "logHours", value: this.totalLoggedTime },
    { label: "workCompleted", value: this.logWorkDone },
    { label: "comment", value: this.logWorkComment }];
    
    if(this.logWorkStatus=="Completed"){
      this.logWorkDone=100;
    }
    
    var condition = await (this.validationService.checkValidity(this.componentName, data)).then(res => {
      return res;
    });
    if (condition) {
      console.log("Inputs are valid");
      this.submitLogWorkPage();
    }
    else
      console.log("Log-Work failed due to validation error");
  }

  async submitLogWorkPage() {
    this.enableLoader = true;
    const callable = this.functions.httpsCallable('tasks/log');
    const appKey = this.backendService.getOrganizationAppKey();

    await callable({AppKey: appKey, Assignee:this.task.Assignee, SprintNumber: this.task.SprintNumber, LogTaskId: this.task.Id, LogHours: this.totalLoggedTime, LogWorkDone: this.logWorkDone, LogWorkStatus: this.logWorkStatus, LogWorkComment: this.logWorkComment, Date: this.todayDate, Time: this.time, Uid: this.authService.user.uid }).subscribe({
      next: (data) => {
        this.enableLoader = false;
        this.showClose = true;
        return;
      },
      error: (error) => {
        this.enableLoader = false;
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        console.log("Error", error);
        
      },
      complete: () => console.info('Successful ')
  });

  }

  workDone() {
    this.logWorkCompleted.emit({ completed: true });
  }
}
