
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

import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { NgForm, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

declare var jQuery:any;

@Component({
  selector: 'app-schedule-meet',
  templateUrl: './schedule-meet.component.html',
  styleUrls: ['./schedule-meet.component.css']
})
export class ScheduleMeetComponent implements OnInit {
  hostName = new UntypedFormControl();
  filteredOptionsHost: Observable<string[]>;
  
  @ViewChild('form') form: NgForm;
  @Output() meetScheduled = new EventEmitter<{ completed: boolean }>();

  componentName: string = "SCHEDULE-MEET";
  orgDomain: string;
  date: string;
  todayDate: string;
  estimatedTimeHrs: number
  estimatedTimeHrs1: number
  totalEstimatedTime: number
  showClose: boolean = false
  addAttendeeEnabled: boolean = false;
  selectedTeamId: string;
  project: string = null;
  teamIds:string[]
  time: string
  title: string;
  description: string;
  teamMembers: string[] =[]
  enableLoader: boolean = false;
  isUpdateMeet: boolean = false;
  link: string;

  constructor(public popupHandlerService: PopupHandlerService, public toolsService: ToolsService, private backendService: BackendService,  private authService: AuthService , public applicationSetting: ApplicationSettingsService, private functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService, public validationService: ValidationService, private router: Router) { }

  ngOnInit(): void {
    this.teamIds = this.backendService.getOrganizationTeamIds();
    this.title = this.popupHandlerService.quickNotesTitle;
    this.description = this.popupHandlerService.quickNotesDescription;
    this.todayDate = this.toolsService.date();
    this.project = this.authService.getTeamId();
    this.time = this.toolsService.time();
    this.readTeamData(this.project);
  }

  private _filter(value:string): string[] {
    const filterValue = value.toLowerCase();
    return this.teamMembers.filter(option => option.toLowerCase().includes(filterValue))
  }

  readTeamData(teamId: string){
    this.enableLoader = true;
    this.applicationSetting.getTeamDetails(teamId).subscribe(team => {
      this.teamMembers = team.TeamMembers;
      
      this.filteredOptionsHost = this.hostName.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
      this.enableLoader=false;
    });  
  }

  selectedHost(item){
    if(item.selected == false){
      this.hostName.setValue("");
      this.close();
    } else {
      this.hostName.setValue(item.data);
    }
  }

  addAttendee(){
    this.addAttendeeEnabled = true;
  }

  addedAttendee(data: {completed: boolean, attendeeEmail: string}){
    if(data.attendeeEmail){
      this.teamMembers.push(data.attendeeEmail);
    }
    this.addAttendeeEnabled=false;
  }

  removeAttendee(remove: string){
    const index = this.teamMembers.indexOf(remove);
    if(index!=-1){
      this.teamMembers.splice(index, 1);
    } else {
      console.error("Error - Cannot remove attendee.Attendee not found");
    }
  }

  async submit(){
    const startTime = this.estimatedTimeHrs ;
    const endTime = this.estimatedTimeHrs1 ;
    let data = [{ label: "title", value: this.title}, 
                {label: "description", value: this.description}, 
                {label: "startTime" , value: startTime},
                {label: "endTime" , value: endTime} ];
    var condition = await (this.validationService.checkValidity(this.componentName, data)).then(res => {
      return res;
    });
    if(condition){
      console.log("Inputs are valid");
      this.createNewMeet();
    } else{
      console.log("Meet not scheduled! Validation error");
    }
  }

  createNewMeet(){
    const startTime = this.estimatedTimeHrs ;
    const endTime = this.estimatedTimeHrs1 ;
    const uid = this.authService.user.uid;
    this.enableLoader = true;
    const teamId = this.authService.getTeamId();
    const callable = this.functions.httpsCallable('meet/scheduleMeet');
      if (this.orgDomain == undefined) {
        this.orgDomain = this.backendService.getOrganizationDomain();
      callable({OrgDomain:this.orgDomain, TeamId:teamId, TeamMembers:this.teamMembers, Title:this.title, Description:this.description, HostName:this.hostName.value, Date: this.date, StartTime: startTime, EndTime: endTime, Uid: uid}).subscribe({
        next: (data) => {
          this.enableLoader = false;
          this.showClose = true;
          console.log("Successful scheduled meet");
        },
        error: (error) => {
          this.errorHandlerService.showError = true;
          this.errorHandlerService.getErrorCode(this.componentName, "InternalError", "Api");
        },
        complete: () => {
          console.info(' successfully scheduled meet')
        }
      })
    }
  }
  

  close(){
      jQuery('#scheduleMeet').modal('hide');
      jQuery('#form').trigger("reset");
      this.meetScheduled.emit({ completed: true });
  }
}
