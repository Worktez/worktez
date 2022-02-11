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
import { MyOrganizationData, User } from '../Interface/UserInterface';
import { AngularFireFunctions } from '@angular/fire/compat/functions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  uid: string;
  isHomePage: boolean = false;
  userReady: boolean= false;
  myOrgCollData: MyOrganizationData[];
  myorgDataCollected: boolean = false;

  constructor(public functions: AngularFireFunctions, public router: Router, public backendService: BackendService, public authService: AuthService, public popupHandlerService: PopupHandlerService) { }

  ngOnInit(): void {
    if (this.router.url == '/')  {
      this.isHomePage = true;
    } else { 
      this.isHomePage = false;
    }
    this.authService.afauth.user.subscribe({
      next: (action) =>{
        const data = action as User;
      if(data) {
        this.uid = data.uid;
      }
      this.userReady = true;
    },
      error: (error) => {
        console.error(error);
      },
      complete: () => console.log("Getting User Data Complete")
    });
  
  }

  async setNewOrg(orgDomain: string, orgAppKey: string, selectedTeam: string) {
    const callable = this.functions.httpsCallable("users/setMyOrganization");
    await callable({Uid: this.uid, OrgDomain: orgDomain, OrgAppKey: orgAppKey, SelectedTeam: selectedTeam}).subscribe({
      next: (data) => {
        console.log("Successful ");
        window.location.reload()
      },
      error: (error) => {
       
      },
      complete: () => console.info('Successful ')
  });

  }

  startNewSprint() {
    this.popupHandlerService.createNewSprintEnabled= true;
  }

  createNewTask() {
    this.popupHandlerService.createNewTaskEnabled= true;
    this.popupHandlerService.resetTaskIds();
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
    this.router.navigate(['/']);
  }

  organizationDetails() {
    this.router.navigate(['/ViewOrganizationDetails']);
  }

  tasksEvaluation() {
    this.router.navigate(['/TasksEvaluation']);
  }

  socialPage() {
    this.router.navigate(['/SocialPage']);
  }

}


