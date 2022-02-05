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
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { Router } from '@angular/router';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { AuthService } from 'src/app/services/auth.service';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { Team } from 'src/app/Interface/TeamInterface';
import { BackendService } from 'src/app/services/backend/backend.service';
import { DataTableService } from 'src/app/services/dataTable/data-table.service';
import { FilterTaskService } from 'src/app/services/filter-task/filter-task.service';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  componentName: string = "TASKS"

  currentSprintName: string
  teamId: string
  currentSprintNumber: number
  searchAssignee: string = ""
  tasksData: Tasks[]

  filterAssignee: string = ""
  filterPriority: string = ""
  filterDifficulty: string = ""
  filterStatus: string = ""
  filterProject: string = ""
  filterSprintNumber: number;
  showFilter: boolean = false
  teamData: Team;
  parentComponent: string = "Tasks"

  displayColoumns: string[] = []
  showLoader: boolean = true;

  constructor(public userService: UserServiceService, public startService: StartServiceService, public dataTableService: DataTableService, private route: ActivatedRoute, private router: Router, public navbarHandler: NavbarHandlerService, public authService: AuthService, public applicationSettingsService: ApplicationSettingsService,  public backendService: BackendService, public filterTaskService: FilterTaskService) { }

  ngOnInit(): void {
    this.teamId = this.route.snapshot.params['teamId'];
    this.currentSprintName = this.route.snapshot.params['currentSprintName'];

    this.navbarHandler.addToNavbar(this.teamId);

    if (this.currentSprintName == "S-1") {
      this.currentSprintNumber = -1;
    } else if (this.currentSprintName == "S-2") {
      this.currentSprintNumber = -2;
    } else {
      this.currentSprintNumber = parseInt(this.currentSprintName.slice(1));
    }

    if(this.startService.showTeams) {
      this.getFilterData();
    } else {
      this.startService.startApplication();
      this.startService.userDataStateObservable.subscribe((data) => {
        if(data){
          this.getFilterData();
        }
      });
    }

    // this.authService.afauth.user.subscribe(data => {
    //   this.authService.userAppSettingObservable.subscribe(data => {
    //     if (data.SelectedOrgAppKey) {
    //       this.backendService.organizationsData.subscribe(data => {
    //         this.getFilterData();
    //       });
    //     }
    //   });
    // });
  }

  backToDashboard() {
    this.router.navigate(['/Board']);
  }

  changeSprint(newSprintNumber: number) {
    if (newSprintNumber == 0) {
      this.applicationSettingsService.getTeamDetails(this.teamId).subscribe(teams => {
        this.teamData = teams;
        newSprintNumber = this.teamData.CurrentSprintId;
        this.currentSprintName = this.fullSprintName(newSprintNumber);
        this.changeRoute(this.teamId, this.currentSprintName);
      });
    } else {
      this.currentSprintNumber = newSprintNumber;
      this.currentSprintName = this.fullSprintName(newSprintNumber);
      this.changeRoute(this.teamId, this.currentSprintName);
    }
  }

  changeRoute(newTeamID: string, newSprintName: string) {
      this.router.navigate(['Tasks/', newTeamID, newSprintName]);
      this.getFilterData();
  }


  showFilterOptions() {
    this.showFilter = !this.showFilter
  }

  applyFilters(data: { Assignee: string, Priority: string, Difficulty: string, Status: string, Project: string, Sprint: number }) {
    this.filterTaskService.saveFilterData(data.Assignee, data.Project, data.Priority, data.Difficulty, data.Status, data.Sprint)
    if (data.Project != this.teamId) {
      this.teamId = data.Project
    }
    if (data.Sprint != this.currentSprintNumber) {
      this.currentSprintNumber = data.Sprint
      this.currentSprintName = this.fullSprintName(this.currentSprintNumber);
    }
      this.changeRoute(this.teamId, this.currentSprintName)
  }

  getFilterData() {
    this.showLoader = true
    this.filterAssignee = this.filterTaskService.filterAssignee
    this.filterPriority = this.filterTaskService.filterPriority
    this.filterDifficulty = this.filterTaskService.filterDifficulty
    this.filterStatus = this.filterTaskService.filterStatus
    this.dataTableService.readAllTaskData(this.teamId, this.currentSprintNumber, this.filterAssignee, this.filterPriority, this.filterDifficulty, this.filterStatus, this.filterProject).subscribe((data) =>{
      if(data.length) {
        this.tasksData = data;
        data.forEach(element => {
          this.userService.checkAndAddToUsersUsingEmail(element.Assignee);
          this.userService.checkAndAddToUsersUsingEmail(element.Reporter);
          this.userService.checkAndAddToUsersUsingEmail(element.Creator);
        });
        this.userService.fetchUserData().subscribe(()=>{
          this.displayColoumns = ['Priority', 'Id', 'Title', 'Assignee', 'Status', 'Difficulty', 'WorkDone'];
          this.showLoader = false;
        });
      }
    });

  }

  openTaskDetails(id: string) {
    this.router.navigate(['/TaskDetails', id]);
  }

  fullSprintName(sprintNumber: number) {
    if (sprintNumber == -1) {
      return "S" + sprintNumber
    } else if (sprintNumber == -2) {
      return "S" + sprintNumber
    } else {
      return "S" + sprintNumber
    }
  }

}
