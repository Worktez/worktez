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

  constructor(private functions: AngularFireFunctions, public toolsService: ToolsService, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.todayDate = this.toolsService.date();
    if (this.educationModalMode == "edit") {
      this.instituteName = this.educationModalData.InstituteName;
      this.degree = this.educationModalData.Degree
      this.startDate = this.educationModalData.Start
      this.endDate = this.educationModalData.End
    }
  }

  async addEducation() {
    this.enableLoader = true
    if (this.endDate == undefined || this.endDate == "") {
      this.endDate = "Present";
    }
    const callable = this.functions.httpsCallable('users/addEducation');
    try {
      await callable({Uid: this.uid, DisplayName: this.displayName, Email: this.email, InstituteName: this.instituteName, Degree: this.degree, Start: this.startDate, End: this.endDate }).toPromise();
      console.log("Successful");
      this.showClose = true;
    } catch (error) {
      console.log("error");
      this.enableLoader = false;
      this.errorHandlerService.showError = true;
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
    }
  }

  async updateEducation() {
    this.enableLoader = true
    if (this.endDate == undefined || this.endDate == "") {
      this.endDate = "Present";
    }
    const callable = this.functions.httpsCallable('users/updateEducation');
    try {
      await callable({Uid: this.uid, DisplayName: this.displayName, Email: this.email, InstituteName: this.instituteName, Degree: this.degree, Start: this.startDate, End: this.endDate, EducationId: this.educationModalData.EducationId }).toPromise();
      console.log("Successful");
      this.showClose = true;
    } catch (error) {
      console.log("error");
      this.enableLoader = false;
      this.errorHandlerService.showError = true;
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
    }
  }

  editEducationDone() {
    this.editEducationCompleted.emit({ completed: true });
  }
}
