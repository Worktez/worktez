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
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Router } from '@angular/router';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { StartServiceService } from 'src/app/services/start/start-service.service';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashBoardComponent implements OnInit {

  componentName: string = "MY-DASHBOARD"

  currentSprintName: string;

  selectedTeamId: string = "Dev";
  teamCurrentSprintNumber: number;
  teamIdExists: boolean = true;

  loadingCurrentSprintStatus: boolean = false

  constructor(private functions: AngularFireFunctions, public startService: StartServiceService, public router: Router, public authService: AuthService, public backendService: BackendService, public navbarHandler: NavbarHandlerService, public applicationSettingsService: ApplicationSettingsService) { }

  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
    this.navbarHandler.addToNavbar(this.componentName);

    if(this.startService.showTeamsData) {
      this.loadingCurrentSprintStatus = true;
    } else {
      this.startService.startApplication();
      this.startService.userDataStateObservable.subscribe((data) => {
        if(data){
          this.startService.applicationDataStateObservable.subscribe((data) => {
            if(data) {
              this.applicationSettingsService.teamData.subscribe((data) => {
                if(data) {
                  // this.readSprintData();
                  this.loadingCurrentSprintStatus = true;
                }
              });
            }
          });
        }
      });
    }
    // this.readUser();
  }

  createNewTeam() {
    this.teamIdExists = true;
    this.router.navigate(["CreateNewTeam"]);
  }

  async runSchedular() {
    try {
      const callable = this.functions.httpsCallable('scheduledFn');
      console.log("1")
      const result = await callable({}).toPromise();
      console.log("2")
      console.log("Created Schedular document");
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}
//   async runSchedular() {
//     try {
//       const callable = this.functions.httpsCallable('scheduledFn');
//       const result = await callable({}).toPromise();
//       console.log("Created Schedular document");
//       console.log(result);
//     } catch (error) {
//       console.log(error);
//     }
//   }
}
