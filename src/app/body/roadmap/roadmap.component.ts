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

import { Component, Input, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { CookieService } from 'ngx-cookie-service';
import { RoadmapEvent, RoadmapRow, MonthAxis, RoadmapMileStone } from 'src/app/Interface/RoadmapInterface';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { DateServiceService } from 'src/app/services/dateService/date-service.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { TeamServiceService } from 'src/app/services/team/team-service.service';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent {
  componentName = "ROADMAP"
  rows: RoadmapRow[];
  showLoader: boolean = false;
  teamId: string;
  projectLink: string;
  featuresExpanded: boolean = false;
  arrowDirection: string = "expand_more";
  roadmapDataReady: boolean = false;
  @Input() startDate: Date = new Date('2021-01-01');
  @Input() endDate: Date = new Date('2021-08-30');
  chartPeriodDays: number;
  monthAxis: MonthAxis[];
  colourPallete = ['#7C4DFF',
                  '#81c784',
                  '#e53935',
                  '#FF8A80',
                  '#303F9F',
                  '#40C4FF',
                  '#006064',
                  '#FF8A65']


  constructor(public dateService: DateServiceService, public startService: StartServiceService, public errorHandlerService: ErrorHandlerService, public authService: AuthService, public backendService: BackendService, public navbarHandler: NavbarHandlerService, public popupHandlerService: PopupHandlerService, public applicationSettingsService: ApplicationSettingsService, public cookieService: CookieService, private functions: AngularFireFunctions, public teamService: TeamServiceService) {
    this.rows = [
      {name: 'Roadmap Implementation', startDate: new Date('2021-01-01'),  endDate: new Date('2021-08-31'), events:  [
                        {name: 'Investigation', startDate: new Date('2021-01-01'),  endDate: new Date('2021-01-31')} as RoadmapEvent,
                        {name: 'Planning', startDate: new Date('2021-02-03'),  endDate: new Date('2021-02-17')} as RoadmapEvent,
                        {name: 'Implementation Phase1', startDate: new Date('2021-03-01'),  endDate: new Date('2021-03-31')} as RoadmapEvent,
                        {name: 'Implementation Phase2', startDate: new Date('2021-05-01'),  endDate: new Date('2021-06-31')} as RoadmapEvent,
                        {name: 'testing', startDate: new Date('2021-04-05'),  endDate: new Date('2021-04-19')} as RoadmapEvent,
                        {name: 'Bug Fix', startDate: new Date('2021-06-01'),  endDate: new Date('2021-07-31')} as RoadmapEvent,
                        {name: 'testing2', startDate: new Date('2021-07-05'),  endDate: new Date('2021-07-19')} as RoadmapEvent,
                        {name: 'Release', startDate: new Date('2021-08-01'),  endDate: new Date('2021-08-31')} as RoadmapEvent,
                        
                      ],
                        mileStones: [
                                    {name:'Feature complete', date: new Date('2021-04-15')} as RoadmapMileStone]
      } as RoadmapRow,
      {name: 'Market activation', startDate: new Date('2021-01-01'),  endDate: new Date('2021-03-31'), events:  [
                                    {name: 'Market activity', startDate: new Date('2021-02-15'),  endDate: new Date('2021-02-28')} as RoadmapEvent
                                    ],
        mileStones: [{name:'Funding round complete', date: new Date('2021-01-28')} as RoadmapMileStone]
      } as RoadmapRow,
      {name: 'Google ads campaign', startDate: new Date('2021-01-01'),  endDate: new Date('2021-03-31'), events:  [
                                    {name: 'Busy period', startDate: new Date('2021-03-02'),  endDate: new Date('2021-03-15')} as RoadmapEvent
                              ]      
      } as RoadmapRow,
      {name: 'Client feedback', startDate: new Date('2021-01-01'),  endDate: new Date('2021-03-31'), events:  [
                                    {name: 'Manual collection', startDate: new Date('2021-03-15'),  endDate: new Date('2021-03-30')} as RoadmapEvent
                              ]      
      } as RoadmapRow,
      {name: 'Implementation window', startDate: new Date('2021-01-01'),  endDate: new Date('2021-03-31'), events:  [
                                    {name: 'Busy period', startDate: new Date('2021-02-15'),  endDate: new Date('2021-05-30')} as RoadmapEvent
                              ]      
      } as RoadmapRow,
      {name: 'Market activation', startDate: new Date('2021-01-01'),  endDate: new Date('2021-03-31'), events:  [
        {name: 'Market activity', startDate: new Date('2021-05-15'),  endDate: new Date('2021-07-28')} as RoadmapEvent
        ],
        mileStones: [{name:'Funding round complete', date: new Date('2021-01-28')} as RoadmapMileStone]
        } as RoadmapRow,

    ]

    this.chartPeriodDays = DateServiceService.dateDifference(this.endDate, this.startDate, true);
    this.monthAxis = this.getMonths(this.startDate, this.endDate);
  }

  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
    this.navbarHandler.addToNavbar(this.componentName);
    console.log(this.rows[0].events[0].name);
  }

    /** Given an event calculate the percentage of days over the total gantt chart period */
    getEventDurationPercentage(event: RoadmapEvent): number {
      console.log(event.endDate, event.startDate);
      const eventDays = DateServiceService.dateDifference(event.endDate, event.startDate);
      return (eventDays/this.chartPeriodDays) * 100;
  
    }

      /** Given an date the percentage of days over the total gantt chart period */
  getEventOffsetPercentage(eventStartDate: Date): number {
    console.log(eventStartDate);
    const daysPriorToEventStart = DateServiceService.dateDifference(eventStartDate, this.startDate);
    return ((daysPriorToEventStart-1)/this.chartPeriodDays)*100;
  }

  changeArrowDirection(rowName: string) {
    if(this.featuresExpanded){
      this.featuresExpanded = false;
      this.arrowDirection = "expand_more"
    } else {
      this.featuresExpanded = true;
      this.arrowDirection = "expand_less";
    }
  }

  /** Given a start and end date will return full months between period along with month names and 
   * relative duration percentages for each month
   */
   getMonths(startDate: Date, endDate: Date): MonthAxis[] {
    const startMonth = startDate.getMonth();
    const endMonth= endDate.getMonth();
    const totalDurationDays = DateServiceService.dateDifference(startDate, endDate, true);
    let months: MonthAxis[] = new Array();
    for(var i = 0; i<= endMonth - startMonth; i++) {
      const adjustedStartDate = DateServiceService.addMonths(startDate, i);
      const monthName = DateServiceService.getMonthName(adjustedStartDate);
      const daysInMonth = DateServiceService.daysInMonth(adjustedStartDate);
      const monthDurationPercentage = daysInMonth/totalDurationDays * 100;
      months.push({monthName: monthName, monthDurationPercentage: monthDurationPercentage});
    }
    return months;
  }

  getColour(rowIndex: number): string {
    console.log(rowIndex);
    if(this.rows.length < rowIndex) {
      return '#64b5f6';
    }

    return this.colourPallete[rowIndex];
  }

  updateSelectedTeamId(teamId: string) {
    this.showLoader = true;
    this.roadmapDataReady = false;
    this.applicationSettingsService.editedTeamId = teamId;
    this.startService.selectedTeamId = teamId;
    this.authService.userAppSetting.SelectedTeamId = teamId;
    this.startService.readApplicationData();
    this.startService.changeTeam = true;
    this.teamId = teamId;
     this.projectLink=this.teamService.teamsDataJson[this.teamId].ProjectLink;
 
     const callable = this.functions.httpsCallable('users/updateSelectedTeam');
     callable({Uid: this.startService.uid , SelectedTeam: this.startService.selectedTeamId}).subscribe({
       error: (error) => {
         this.errorHandlerService.showError = true;
         this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
         console.error(error);
       },
       complete: (()=>{
         this.cookieService.set("userSelectedTeamId", teamId);
         this.showLoader = false;
        //  this.getReleaseDetails();
       })
     })
  }

}
