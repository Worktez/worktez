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
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BackendService } from 'src/app/services/backend/backend.service';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @Input("teamName") teamName: string;
  @Input("teamMembers") teamMembers: string[];
  @Input("teamManager") teamManager: string;
  @Input("teamDescription") teamDescription: string;
  @Input("teamId") teamId: string;
  @Input("isUpdateTeam") isUpdateTeam: boolean;
  @Output() addedMember = new EventEmitter<{ completed: boolean, memberEmail: string }>();

  componentName: string = "ADD-MEMBER";
  organizationDomain: string
  memberEmail: string
  enableLoader: boolean = false;
  showClose: boolean = false;
  add: boolean = false;

  constructor(private startService: StartServiceService, public backendService: BackendService, private functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService, public authservice: AuthService, public validationService: ValidationService) { }

  ngOnInit(): void {
  }

  async submit() {
    let data = [{ label: "teamManagerEmail", value: this.memberEmail}]; 
    var condition = await (this.validationService.checkValidity(this.componentName, data)).then(res => {
      return res;
    });

    if (condition) {
      if (this.memberEmail) {
        this.teamMembers.push(this.memberEmail);
        if (this.isUpdateTeam == true) {
          this.addUpdateTeam();
        } else {
          this.addCreateTeam();
        }
      }

    }
    else {
      console.log("input is invalid");
    }
  }


  addUpdateTeam() {
    this.organizationDomain = this.backendService.getOrganizationDomain();
    this.enableLoader = true;
    const callable = this.functions.httpsCallable('teams/addMember');

    callable({ OrganizationDomain: this.organizationDomain, TeamName: this.teamName, TeamMembers: this.teamMembers, Add: this.memberEmail, TeamManager: this.authservice.user.email, TeamDescription: this.teamDescription, TeamId: this.teamId }).subscribe({
      next: (data) => {
        this.enableLoader = false;
        this.showClose = true;
        console.log("Successful added member");
      },
      error: (error) => {
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError", "Api");
        this.enableLoader = false;
        console.error("Error", error);
      },
      complete: () => console.info('Successful added member ')
    });
  }

  addCreateTeam() {
    this.add = true;
    this.showClose = true;
  }

  added() {
    this.addedMember.emit({ completed: true, memberEmail: this.memberEmail });
  }

  close(){
    this.showClose= false;
    this.added();
  }
}
