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
import { UntypedFormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-edit-milestone',
  templateUrl: './edit-milestone.component.html',
  styleUrls: ['./edit-milestone.component.css']
})
export class EditMilestoneComponent implements OnInit {

  componentName: string = "MILESTONES"
  @Input('title') title:string
  @Input('description') description:string;
  @Input('status') status:string
  @Input('startDate') startDate: any
  @Input('endDate') endDate: any
  @Input('statusLabels') statusLabels: any
  @Input('id') milestoneId:string
  @Input('colorCode') colorCodes:string
  colorCode = new UntypedFormControl();
  enableLoader:boolean =true;
  minDate: string;
  showClose:boolean;
  @Output() editMilestoneCompleted = new EventEmitter<{ completed: boolean }>();
  constructor(private validationService:ValidationService, private backendService: BackendService, public functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.enableLoader = false;
    this.minDate = this.startDate;
    console.log(this.colorCodes)
  }

  
  editMilestoneDone(){
    this.editMilestoneCompleted.emit({ completed: true });
  }

  editMilestone(){
      this.enableLoader=true;
      const orgDomain = this.backendService.getOrganizationDomain();
      const callable = this.functions.httpsCallable('milestone/editMilestone');
      callable({MilestoneId:this.milestoneId, OrgDomain:orgDomain,MilestoneStatus:this.status, Title: this.title, Description: this.description, StartDate: this.startDate, EndDate: this.endDate,ColorCode: this.colorCode.value}).subscribe({
        error: (error) => {
          this.errorHandlerService.showError = true;
          this.errorHandlerService.getErrorCode(this.componentName,"InternalError","Api");
          this.enableLoader = false;
          console.error(error);
        },
        complete: () => {
          console.info('Successful');
          this.enableLoader = false;
          this.showClose = true;
      }
      });
  }

  validateMilestone() {
    let data = [{ label: "title", value: this.title },
    { label: "description", value: this.description },
    { label: "startDate", value: this.startDate },
    { label: "endDate", value: this.endDate },
    { label: "milestoneStatus", value: this.status},
  ];
    
    this.validationService.checkValidity(this.componentName, data).then(res => {
      if (res) {
        console.log("Inputs are valid");
        this.editMilestone();
      }
      else
        console.log("Add Milestone Failed due to Validation Error");
    });
    
  }

  selectedColorName(item) {
    if(item.selected == false) {
      this.colorCode.setValue("");
    } else {
      var temp = item.data as string
      temp = temp.slice(1);
      this.colorCode.setValue(temp);
    }
  }
}
