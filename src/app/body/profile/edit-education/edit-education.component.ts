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
import { MyEducationData } from 'src/app/Interface/UserInterface';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.css']
})
export class EditEducationComponent implements OnInit {

  @Input('uid') uid: string;
  @Input('displayName') displayName: string;
  @Input('email') email: string;
  @Input('educationModalData') educationModalData: MyEducationData;
  @Input('educationModalMode') educationModalMode: string;

  componentName: string = "PROFILE"
  enableLoader: boolean = false
  showClose: boolean = false
  instituteName: string
  degree: string
  startDate: string
  endDate: string
  todayDate: string

  @Output() editEducationCompleted = new EventEmitter<{ completed: boolean }>();

  constructor(private functions: AngularFireFunctions, public toolsService: ToolsService, public errorHandlerService: ErrorHandlerService,public validationService:ValidationService) { }

  ngOnInit(): void {
    this.todayDate = this.toolsService.date();
    if (this.educationModalMode == "edit") {
      this.instituteName = this.educationModalData.InstituteName;
      this.degree = this.educationModalData.Degree
      this.startDate = this.educationModalData.Start
      this.endDate = this.educationModalData.End
    }
  }

  async updateEducation() {
    let labels = ['instituteName', 'degree', 'startDate', 'endDate'];
    let values = [this.instituteName, this.degree, this.startDate, this.endDate];
    let data = [{ label: "instituteName", value: this.instituteName },
    { label: "degree", value: this.degree },
    { label: "startDate", value: this.startDate },
    { label: "endDate", value: this.endDate }];
   
    var condition = await (this.validationService.checkValidity(this.componentName, data)).then(res => {
     
      return res;
    });
    if (condition) {
      console.log("Inputs are valid");
      this.editEducation();
    }
    else
      console.log("Log-Work failed due to validation error");
  }


  async addEducation() {
    let labels = ['instituteName', 'degree', 'startDate', 'endDate'];
    let values = [this.instituteName, this.degree, this.startDate, this.endDate];
    let data = [{ label: "instituteName", value: this.instituteName },
    { label: "degree", value: this.degree },
    { label: "startDate", value: this.startDate },
    { label: "endDate", value: this.endDate }];
    
    var condition = await (this.validationService.checkValidity(this.componentName, data)).then(res => {
      
      return res;
    });
    if (condition) {
      console.log("Inputs are valid");
      this.submitaddEducation();
    }
    else
      console.log("Log-Work failed due to validation error");
  }


  submitaddEducation() {
    this.enableLoader = true
    if (this.endDate == undefined || this.endDate == "") {
      this.endDate = "Present";
    }
    const callable = this.functions.httpsCallable('users/addEducation');
    
    callable({Uid: this.uid, DisplayName: this.displayName, Email: this.email, InstituteName: this.instituteName, Degree: this.degree, Start: this.startDate, End: this.endDate }).subscribe({
      next: (data) => {
        console.log("Successful");
        this.showClose = true;
      },
      error: (error) => {
        this.enableLoader = false;
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        console.error(error);
      },
      complete: () => console.info('Successful ')
    });
    console.log("Successful");
    this.showClose = true;
  }

  editEducation() {
    this.enableLoader = true
    if (this.endDate == undefined || this.endDate == "") {
      this.endDate = "Present";
    }
    const callable = this.functions.httpsCallable('users/updateEducation');
    
    callable({Uid: this.uid, DisplayName: this.displayName, Email: this.email, InstituteName: this.instituteName, Degree: this.degree, Start: this.startDate, End: this.endDate, EducationId: this.educationModalData.EducationId }).subscribe({
      next: (data) => {
        console.log("Successful");
        this.showClose = true;
      },
      error: (error) => {
        this.enableLoader = false;
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        console.error(error);
      },
      complete: () => console.info('Successfully edited education')
    });
      console.log("Successful");
      this.showClose = true;
  }

  editEducationDone() {
    this.editEducationCompleted.emit({ completed: true });
  }
}
