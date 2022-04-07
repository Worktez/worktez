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
import { MyEducationData, MyExperienceData } from 'src/app/Interface/UserInterface';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-edit-workexperience',
  templateUrl: './edit-workexperience.component.html',
  styleUrls: ['./edit-workexperience.component.css']
})
export class EditWorkexperienceComponent implements OnInit {

  @Input('uid') uid: string;
  @Input('displayName') displayName: string;
  @Input('email') email: string;
  @Input('workModalData') workModalData: MyExperienceData;
  @Input('workModalMode') workModalMode: string;

  enableLoader: boolean = false
  showClose: boolean = false
  organizationName: string
  position: string
  startDate: string
  endDate: string
  todayDate: string
  componentName:string = "PROFILE"
  @Output() editWorkCompleted = new EventEmitter<{ completed: boolean }>();

  constructor(private functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService,public validationService:ValidationService) { }

  ngOnInit(): void {
    if (this.workModalMode == "edit") {
      this.organizationName = this.workModalData.OrganizationName;
      this.position = this.workModalData.Position;
      this.startDate = this.workModalData.Start
      this.endDate = this.workModalData.End
    }
  }
  
  async addWork() {
    let labels = ['organizationName', 'position', 'startDate', 'endDate'];
    let values = [this.organizationName, this.position, this.startDate, this.endDate];
    let data = [{ label: "organizationName", value: this.organizationName },
    { label: "position", value: this.position },
    { label: "startDate", value: this.startDate },
    { label: "endDate", value: this.endDate }];
    
    var condition = await (this.validationService.checkValidity(this.componentName, data)).then(res => {
      
      return res;
    });
    if (condition) {
      console.log("Inputs are valid");
      this.submitaddWork();
    }
    else
      console.log("Edit Work Experience failed due to validation error");
  }

  async updateWork() {
    let labels = ['organizationName', 'position', 'startDate', 'endDate'];
    let values = [this.organizationName, this.position, this.startDate, this.endDate];
    let data = [{ label: "organizationName", value: this.organizationName },
    { label: "position", value: this.position },
    { label: "startDate", value: this.startDate },
    { label: "endDate", value: this.endDate }];
    
    var condition = await (this.validationService.checkValidity(this.componentName, data)).then(res => {
      
      return res;
    });
    if (condition) {
      console.log("Inputs are valid");
      this.submitupdatedWork();
    }
    else
      console.log("Log-Work failed due to validation error");
  }
  async submitaddWork() {
    this.enableLoader = true
    if(this.endDate == undefined){
      this.endDate = "Present";
    }
    const callable = this.functions.httpsCallable('users/addExperience');
    
      await callable({Uid: this.uid, DisplayName: this.displayName, Email: this.email, OrganizationName: this.organizationName, Position: this.position, Start: this.startDate, End: this.endDate }).subscribe({
        next: (data) => {
          console.log("Successful");
          this.showClose = true;
        },
        error: (error) => {
          console.log("error");
          this.enableLoader = false;
          this.errorHandlerService.showError = true;
          this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
          console.error(error);
        },
        complete: () => console.info('Successful updated Selected Team in db')
    });
  }
  
  async submitupdatedWork() {
    if(this.endDate == undefined || this.endDate == ""){
      this.endDate = "Present";
    }
    this.enableLoader = true
    console.log("Edit");
    const callable = this.functions.httpsCallable('users/updateExperience');
    
      await callable({Uid: this.uid, DisplayName: this.displayName, Email: this.email, OrganizationName: this.organizationName, Position: this.position, Start: this.startDate, End: this.endDate, ExperienceId: this.workModalData.ExperienceId }).subscribe({
        next: (data) => {
          console.log("Successful");
          this.showClose = true;
        },
        error: (error) => {
          console.log("error");
          this.enableLoader = false;
          this.errorHandlerService.showError = true;
          this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
          console.error(error);
        },
        complete: () => console.info('Successful edited work experience')
    });
  }

  editWorkDone() {
    this.editWorkCompleted.emit({ completed: true });
  }
}
