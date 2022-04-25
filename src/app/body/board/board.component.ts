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
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Sprint } from 'src/app/Interface/TeamInterface';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { AuthService } from 'src/app/services/auth.service';
import { FeatureCardComponent } from './feature-card/feature-card.component';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @ViewChildren(FeatureCardComponent) child: QueryList<FeatureCardComponent>;

  componentName: string = "BOARD";
  showContent: boolean = false;
  sprintData: Sprint;
  currentSprintName: string;
  sprintNotExist: boolean = false;
  DaysUp: any;
  workPercentCalc: any;
  workPercentage: number;
  today: any = new Date();
  EDate: any;
  SDate: any;
  currentSprintNumber: number;

  constructor(public startService: StartServiceService, public authService: AuthService, public navbarHandler: NavbarHandlerService, public backendService: BackendService, public applicationSettingsService: ApplicationSettingsService, private functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
    this.navbarHandler.addToNavbar(this.componentName);

    if(this.startService.showTeamsData) {
      this.readSprintData();
    } else {
      this.startService.applicationDataStateObservable.subscribe((data) => {
        if(data) {
          this.applicationSettingsService.teamData.subscribe((data) => {
            if(data) {
              this.readSprintData();
            }
          });
        }
      });
    }
  }

  getSprintDetails(teamId: string) {
    this.sprintNotExist = false;
    this.showContent = false;
    this.applicationSettingsService.editedTeamId = teamId;
    this.startService.selectedTeamId = teamId;
    this.authService.userAppSetting.SelectedTeamId = teamId;
    this.startService.changeTeam = true;

    const callable = this.functions.httpsCallable('users/updateSelectedTeam');
    callable({Uid: this.startService.uid , SelectedTeam: this.startService.selectedTeamId}).subscribe({
        next: (data) => {
          this.readSprintData();
        },
        error: (error) => {
          this.errorHandlerService.showError = true;
          this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
          console.error(error);
        },
        complete: () => console.info('Successful updated Selected Team in db')
    });
  }

  readSprintData() {
    this.showContent = false;
    if (this.startService.teamCurrentSprintNumber != 0) {
      console.log("checking 0");
      if(this.startService.selectedTeamId == this.applicationSettingsService.team.TeamId) {
        this.applicationSettingsService.getSprintsDetails(this.startService.teamCurrentSprintNumber).subscribe(sprints => {
        this.child.forEach(child => {
          child.highlightSelectedTeam(this.startService.selectedTeamId);
        });
        if (sprints) {
          console.log("checking 1");
          this.sprintData = sprints;
          this.currentSprintNumber=this.sprintData.SprintNumber;
          
          this.currentSprintName = "S" + this.sprintData.SprintNumber;
          if(this.currentSprintNumber==-1){
      
            this.currentSprintName="Backlog";
          }
          else if(this.currentSprintNumber==-2){
            this.currentSprintName="Deleted";
          }
          this.EDate = new Date(this.sprintData.EndDate.replace('/','-'));
          this.SDate = new Date(this.sprintData.StartDate.replace('/','-'));
          this.DaysUp = Math.abs((this.today - this.SDate)/(1000 * 60 * 60 * 24));
          if(this.today > this.EDate) {
            this.workPercentCalc = 100;
          } else if(this.today < this.SDate) {
            this.workPercentCalc = 0;
          } else {
            this.workPercentCalc = Math.abs((parseInt(this.DaysUp)) /((this.EDate - this.SDate)/(1000 * 60 * 60 * 24)) * 100);
          }
          this.workPercentage = parseInt(this.workPercentCalc);
          this.showContent = true;
        } else {
          console.log("Not existing");
          this.showContent = true;
          this.sprintNotExist = true;
        }
      });
    } else {
      console.log("checking 2");
      this.startService.readApplicationData();
      this.startService.applicationDataStateObservable.subscribe((data) => {
        if(data) {
          this.applicationSettingsService.teamData.subscribe((data) => {
            if(data) {
              this.readSprintData();
            }
          });
        }
      });
    }
  } else {
      this.showContent = true
      this.changeSprintNumber(-1);
    }
  }

  changeSprintNumber(filterSprintNumber: any) {
    if(filterSprintNumber==0){
      filterSprintNumber=-1;
    }
    else if(filterSprintNumber<-2){
      filterSprintNumber=-2;
    }
    this.currentSprintNumber=filterSprintNumber;
    this.startService.teamCurrentSprintNumber = filterSprintNumber;
    this.currentSprintName = "S" + this.startService.teamCurrentSprintNumber;
    if(filterSprintNumber==-1){
      
      this.currentSprintName="Backlog";
    }
    else if(filterSprintNumber==-2){
      this.currentSprintName="Deleted";
    }
    
    this.applicationSettingsService.editedSprintId = filterSprintNumber;
    this.readSprintData();
  }
}
