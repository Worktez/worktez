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
import { AuthService } from 'src/app/services/auth/auth.service';
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
  componentName = "MILESTONES"
  constructor(public popupHandlerService: PopupHandlerService, public toolsService:ToolsService, public backendService:BackendService, private functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService, public authService: AuthService) { }

  ngOnInit(): void {
  }

   addTask(task){
    this.showLoader = true
    const todayDate = this.toolsService.date();
    const time = this.toolsService.time();
    const orgDomain = this.backendService.getOrganizationDomain();
      const callable = this.functions.httpsCallable('milestone/addTask');
      callable({TaskId: task.Id, Uid: this.authService.user.uid, MilestoneId: this.milestoneId, Time:time, Date:todayDate, OrgDomain: orgDomain}).subscribe({

        next: (data) => {
          this.showLoader = false;
        },
        error: (error) => {
          this.errorHandlerService.showError = true;
          this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
          this.showLoader = false;
          console.error(error);
        },  
        complete: (() =>{ this.getTasks.emit()
        this.popupHandlerService.addTaskActive = false;
        })
    });
    
  }

}
