/***********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Simran Nigam <nigamsimran14@gmail.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

import { Component, Input } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { RoadmapEvent } from 'src/app/Interface/RoadmapInterface';
import { RoadmapRow } from 'src/app/Interface/RoadmapInterface';
@Component({
  selector: 'app-add-roadmap',
  templateUrl: './add-roadmap.component.html',
  styleUrls: ['./add-roadmap.component.css']
})
export class AddRoadmapComponent {
  componentName: string = "ADDROADMAP"

  @Input("teamId") teamId: string;
  milestoneName: string;
  description: string;
  startDate: string;
  endDate: string;
  taskName: string;
  showLoader: boolean = false;
  addRoadmapActive: boolean = true;

  constructor(public validationService: ValidationService, private functions: AngularFireFunctions, public toolService: ToolsService, public backendService: BackendService, public authService: AuthService, public popupHandlerService: PopupHandlerService, public applicationSetting: ApplicationSettingsService) { }

  ngOnInit(): void {

  }

  validateRoadmap() {

  }

  addRoadmap() {
    this.showLoader = true;
    const orgDomain = this.backendService.organizationDetails.OrganizationDomain;
    const uid = this.authService.getLoggedInUser();

    const callable = this.functions.httpsCallable('roadmap/addRoadmap');
    callable({ MilestoneName:this.milestoneName, Description:this.description, TaskName:this.taskName, StartDate:this.startDate, EndDate:this.endDate, TeamId: this.teamId, OrgDomain: orgDomain}).subscribe({
      next: (data) => {
        console.log("Successfull");
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.popupHandlerService.addRoadmapActive = false;
        this.showLoader = false;
      }
    });
  }
}