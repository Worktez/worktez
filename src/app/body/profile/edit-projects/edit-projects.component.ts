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
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { MyProjectData } from 'src/app/Interface/UserInterface';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

@Component({
  selector: 'app-edit-projects',
  templateUrl: './edit-projects.component.html',
  styleUrls: ['./edit-projects.component.css']
})
export class EditProjectsComponent implements OnInit {

  @Input('uid') uid: string;
  @Input('displayName') displayName: string;
  @Input('email') email: string;
  @Input('projectModalData') projectModalData: MyProjectData;
  @Input('projectModalMode') projectModalMode: string;
  componentName:string = "PROFILE"
  enableLoader: boolean = false
  showClose: boolean = false

  startDate: string
  endDate: string
  projectName: string
  description: string
  
  @Output() editProjectCompleted = new EventEmitter<{ completed: boolean }>();

  constructor(private functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    // this.todayDate = this.toolsService.date();
    if (this.projectModalMode == "edit") {
      console.log(this.projectModalData);
      this.projectName = this.projectModalData.ProjectName;
      this.description = this.projectModalData.Description;
      this.startDate = this.projectModalData.Start
      this.endDate = this.projectModalData.End
    }
  }

  async addProject() {
    this.enableLoader = true
    if(this.endDate == undefined){
      this.endDate = "Present";
    }
    const callable = this.functions.httpsCallable('users/addProject');
    try {
      await callable({Uid: this.uid, DisplayName: this.displayName, Email: this.email, ProjectName: this.projectName, Description: this.description, Start: this.startDate, End: this.endDate }).toPromise();
      console.log("Successful");
      this.showClose = true;
    } catch (error) {
      console.log("error");
      this.enableLoader = false;
      this.errorHandlerService.showError = true;
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
    }
  }
  
  async updateProject() {
    if(this.endDate == undefined || this.endDate == ""){
      this.endDate = "Present";
    }
    this.enableLoader = true
    console.log("Edit");
    const callable = this.functions.httpsCallable('users/updateProject');
    try {
      await callable({Uid: this.uid, DisplayName: this.displayName, Email: this.email, ProjectName: this.projectName, Description: this.description, Start: this.startDate, End: this.endDate, ProjectId: this.projectModalData.ProjectId }).toPromise();
      console.log("Successful");
      this.showClose = true;
    } catch (error) {
      console.log("error");
      this.enableLoader = false;
      this.errorHandlerService.showError = true;
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
    }
  }

  editProjectDone() {
    this.editProjectCompleted.emit({ completed: true });
  }
}
