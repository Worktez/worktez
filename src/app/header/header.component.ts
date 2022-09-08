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
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend/backend.service';
import { PopupHandlerService } from '../services/popup-handler/popup-handler.service';
import { User } from '../Interface/UserInterface';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { StartServiceService } from '../services/start/start-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  uid: string;
  isHomePage: boolean = false;
  userReady: boolean = false;

  constructor(public startService: StartServiceService, public functions: AngularFireFunctions, public router: Router, public backendService: BackendService, public authService: AuthService, public popupHandlerService: PopupHandlerService) { }

  ngOnInit(): void {
    if (this.router.url == '/') {
      this.isHomePage = true;
    } else {
      this.isHomePage = false;
    }
  }

  setNewOrg(orgDomain: string, orgAppKey: string, selectedTeam: string) {
    this.uid = this.authService.getLoggedInUser();
    const callable = this.functions.httpsCallable("users/setMyOrganization");
    callable({ Uid: this.uid, OrgDomain: orgDomain, OrgAppKey: orgAppKey, SelectedTeam: selectedTeam }).subscribe({
      next: (data) => {
        window.location.reload()
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => console.info('Successful')
    });
  }

  startNewSprint() {
    this.popupHandlerService.createNewSprintEnabled = true;
  }

  createNewTask() {
    this.popupHandlerService.createNewTaskEnabled = true;
    this.popupHandlerService.resetTaskIds();
  }

  ScheduleMeet(){
    this.popupHandlerService.scheduleMeetEnabled = true;
  }

  JoinMeet(){

  }

  Board() {
    this.router.navigate(['/Board']);
  }

  myDashBoard() {
    this.router.navigate(["/MyDashboard"])
  }

  createNewOrganization() {
    this.router.navigate(['/CreateNewOrganization']);
  }

  home() {
    this.router.navigate(['/Home']);
  }

  organizationDetails() {
    this.router.navigate(['/ViewOrganizationDetails']);
  }

  tasksEvaluation() {
    this.router.navigate(['/TasksEvaluation']);
  }

  socialPage() {
    this.router.navigate(['/Social']);
  }
  
  filterPage(){
    this.router.navigate(['/FilterPage']);
  }

  kanbanBoard() {
    this.router.navigate(['/KanbanBoard']);
  }
  milestoneGraph(){
    this.router.navigate(['/Milestones'])
  }

}


