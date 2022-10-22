/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author: Vivek Kumar <vvksindia@gmail.com>
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
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-add-milestone',
  templateUrl: './add-milestone.component.html',
  styleUrls: ['./add-milestone.component.css']
})
export class AddMilestoneComponent implements OnInit {

  componentName: string = "MILESTONES"

  @Input("teamId") teamId: string;
  @Input("teamIds") teamIds: string[];
  @Output() getMilestones: EventEmitter<string> = new EventEmitter();

  title: string = ""
  description: string = ""
  showLoader: boolean = false;
  startDate: string
  endDate: string
  todayDate: string
  milestoneStatus: string
  addMilestoneActive: boolean = true;

  constructor(public validationService: ValidationService, private functions: AngularFireFunctions, public toolService: ToolsService, public backendService: BackendService, public authService: AuthService, public popupHandlerService: PopupHandlerService, public applicationSetting: ApplicationSettingsService) { }

  ngOnInit(): void {
    this.todayDate = this.toolService.date();
  }

  validateMilestone() {
    let labels = ['title','project', 'description', 'startDate', 'endDate', 'milestoneStatus'];
    let values = [this.title, this.teamId, this.description, this.startDate, this.endDate, this.milestoneStatus];
    let data = [{ label: "title", value: this.title },
    { label: "project", value: this.teamId },
    { label: "description", value: this.description },
    { label: "startDate", value: this.startDate },
    { label: "endDate", value: this.endDate },
    { label: "milestoneStatus", value: this.milestoneStatus},
  ];
    
    var condition = (this.validationService.checkValidity(this.componentName, data)).then(res => {
      
      return res;
    });
    if (condition) {
      console.log("Inputs are valid");
      this.addMilestone();
    }
    else
      console.log("Add Milestone Failed due to Validation Error");
  }

  addMilestone() {
    this.showLoader = true;
    const callable = this.functions.httpsCallable('milestone/addMilestone');
    const date = this.toolService.date();
    const time = this.toolService.time();
    const orgDomain = this.backendService.organizationDetails.OrganizationDomain;
    const uid = this.authService.getLoggedInUser();

    callable({ Uid: uid, OrgDomain: orgDomain, Title: this.title, Description: this.description, TeamId: this.teamId, CreationDate: date, CreationTime: time, StartDate:this.startDate, EndDate: this.endDate, MilestoneStatus: this.milestoneStatus }).subscribe({
      next: (data) => {
        console.log("Successful Next");
      },
      error: (error) => {

        console.error(error);
      },
      complete: () => {
        this.title = "";
        this.description = "";
        this.teamId = "";
        this.startDate = "";
        this.endDate = "";
        this.milestoneStatus = "";
        this.getMilestones.emit();
        // also make getMilestoneActive false
        this.popupHandlerService.addMilestoneActive = false
        this.showLoader = false;
      }
    });
  }

}
