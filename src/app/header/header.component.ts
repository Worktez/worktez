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
import { AuthService } from '../services/auth/auth.service';
import { BackendService } from '../services/backend/backend.service';
import { PopupHandlerService } from '../services/popup-handler/popup-handler.service';
import { User } from '../Interface/UserInterface';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { StartServiceService } from '../services/start/start-service.service';
import { RBAService } from '../services/RBA/rba.service';
import { RoadmapRow } from '../Interface/RoadmapInterface';
import {RoadmapMileStone } from '../Interface/RoadmapInterface';
import { RoadmapEvent } from '../Interface/RoadmapInterface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  uid: string;
  isHomePage: boolean = false;
  userReady: boolean = false;
  title = 'gantt-chart';
  rows: RoadmapRow[];
  constructor(public startService: StartServiceService, public functions: AngularFireFunctions, public router: Router, public backendService: BackendService, public authService: AuthService, public popupHandlerService: PopupHandlerService, public rbaService :RBAService) {
    this.rows = [
      {name: 'Sprint plan', events:  [
                        {name: 'Design sprint', startDate: new Date('2021-01-01'),  endDate: new Date('2021-01-31')} as RoadmapEvent,
                        {name: 'Sprint 1', startDate: new Date('2021-02-03'),  endDate: new Date('2021-02-17')} as RoadmapEvent,
                        {name: 'Design sprint', startDate: new Date('2021-03-01'),  endDate: new Date('2021-03-31')} as RoadmapEvent,
                        {name: 'Sprint 2', startDate: new Date('2021-04-05'),  endDate: new Date('2021-04-19')} as RoadmapEvent
                        
                      ],
                        mileStones: [
                                    {name:'Feature complete', date: new Date('2021-04-15')} as RoadmapMileStone]
      } as RoadmapRow,
      {name: 'Market activation', events:  [
                                    {name: 'Market activity', startDate: new Date('2021-02-15'),  endDate: new Date('2021-02-28')} as RoadmapEvent
                                    ],
        mileStones: [{name:'Funding round complete', date: new Date('2021-01-28')} as RoadmapMileStone]
      } as RoadmapRow,
      {name: 'Google ads campaign', events:  [
                                    {name: 'Busy period', startDate: new Date('2021-03-02'),  endDate: new Date('2021-03-15')} as RoadmapEvent
                              ]      
      } as RoadmapRow,
      {name: 'Client feedback', events:  [
                                    {name: 'Manual collection', startDate: new Date('2021-03-15'),  endDate: new Date('2021-03-30')} as RoadmapEvent
                              ]      
      } as RoadmapRow,
      {name: 'Implementation window', events:  [
                                    {name: 'Busy period', startDate: new Date('2021-04-15'),  endDate: new Date('2021-04-30')} as RoadmapEvent
                              ]      
      } as RoadmapRow

    ]
   }

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

  Board() {
    this.router.navigate(['/Board']);
  }

  releases() {
    this.router.navigate(['/Releases']);
  }

  myDashBoard() {
    this.router.navigate(["/MyDashboard"])
  }

  pipeline(){
    this.router.navigate(["/Pipeline"])
  }
  
  roadmap(){
    this.router.navigate(["/Roadmap"])
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
    this.router.navigate(['/techverse']);
  }

  kanbanBoard() {
    this.router.navigate(['/KanbanBoard']);
  }
  milestoneGraph(){
    this.router.navigate(['/Milestones'])
  }

}


