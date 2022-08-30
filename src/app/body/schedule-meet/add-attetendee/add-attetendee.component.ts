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

import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

@Component({
  selector: 'app-add-attetendee',
  templateUrl: './add-attetendee.component.html',
  styleUrls: ['./add-attetendee.component.css']
})
export class AddAttetendeeComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @Input("title") title:string;
  @Input("teamMembers") teamMembers: string[];
  @Input("hostName") hostName: string;
  @Input("teamId") teamId: string;
  @Input("description") description: string;
  @Input("isUpdateMeet") isUpdateMeet
  @Output() addedAttendee = new EventEmitter<{ completed: boolean, attendeeEmail: string }>();

  componentName: string = "ADD-ATTENDEE";
  attendeeEmail: string;
  orgDomain: string
  enableLoader: boolean = false;
  showClose: boolean = false;
  add: boolean = false;

  constructor(private functions: AngularFireFunctions ,public backendService: BackendService, public errorHandlerService: ErrorHandlerService, public authservice:AuthService) { }

  ngOnInit(): void {
  }

  submit(){
    if(this.attendeeEmail){
      if(this.isUpdateMeet == true){
        this.addUpdateMeet();
      } else {
        this.addScheduleMeet();
      }
    }
  }

  addUpdateMeet(){
    this.orgDomain = this.backendService.getOrganizationDomain();
    this.enableLoader = true;
    const callable = this.functions.httpsCallable('meet/addAttendee');
    callable({OrgDomain:this.orgDomain, Title:this.title, TeamMembers:this.teamMembers, Add: this.attendeeEmail, Host: this.authservice.user.email, Description:this.description, TeamId: this.teamId}).subscribe({
      next: (data) => {
        this.enableLoader = false;
        this.showClose = true;
        console.log("Successfully added attendee");
      },
      error: (error) => {
        this.errorHandlerService.showError=true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        this.enableLoader = false;
        console.error("Error", error);
      },
      complete: () => console.info('Successfully added attendee')
    });
  }

  addScheduleMeet(){
    this.add = true;
    this.showClose = true;
  }

  added(){
    this.addedAttendee.emit({ completed: true, attendeeEmail: this.attendeeEmail});
  }

}
