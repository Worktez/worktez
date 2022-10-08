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
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { UntypedFormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { CustomFilter } from 'src/app/Interface/TeamInterface';
import { StartServiceService } from 'src/app/services/start/start-service.service';

@Component({
  selector: 'app-filter-task',
  templateUrl: './filter-task.component.html',
  styleUrls: ['./filter-task.component.css']
})
export class FilterTaskComponent implements OnInit {

  @Output() filterProperty = new EventEmitter<{ Assignee: string, Priority: string, Difficulty: string, Status: string, Project: string, Sprint: number }>();
  @Input("defaultProject") defaultProject: string
  @Input("currentSprintNumber") currentSprintNumber: number
  assigneeName = new UntypedFormControl();
  filteredOptionsAssignee: Observable<string[]>;
  isAssigneeChecked: boolean
  isDifficultyChecked: boolean
  isPriorityChecked: boolean
  isStatusChecked: boolean
  isProjectChecked: boolean
  isSprintChecked: boolean
  teamIds: string[]
  filtersReady: boolean = true;
  teamMembers: string[] = []
  filters: CustomFilter[] = [];
  assignee: string
  project: string
  priority: string
  status: string
  difficulty: string
  sprint: number
  showLoader: boolean = false;
  teamName: string = ""

  constructor(public appSettings: ApplicationSettingsService, public backendService: BackendService, public startService: StartServiceService, public authService: AuthService, private functions: AngularFireFunctions) { }

  ngOnInit(): void {
    if(this.startService.showTeamsData) {
      this.project = this.authService.getTeamId();
      this.teamIds = this.backendService.getOrganizationTeamIds();
      this.getCustomFilter();
      this.readTeamData(this.project);
    } else {
      this.startService.userDataStateObservable.subscribe((data) => {
        if(data){
          this.startService.applicationDataStateObservable.subscribe((data) => {
            if(data) {
              this.appSettings.teamData.subscribe((data) => {
                if(data) {
                  this.project = this.authService.getTeamId();
                  this.teamIds = this.backendService.getOrganizationTeamIds();
                  this.getCustomFilter();
                  this.readTeamData(this.project);
                }
              });
            }
          });
        }
      });
    }
 
  }
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.teamMembers.filter(option => option.toLowerCase().includes(filterValue));
  }

  selectedAssignee(item) {
    if(item.selected == false){
      this.assigneeName.setValue("");
    } else {
      this.assigneeName.setValue(item.data);
    }
  }
  
  readTeamData(teamId: string){
    this.showLoader = true;
    this.appSettings.getTeamDetails(teamId).subscribe(team => {
      this.showLoader = false;
      this.teamMembers = team.TeamMembers;
      this.filteredOptionsAssignee = this.assigneeName.valueChanges.pipe(
        startWith(''),
        map((value) => {
          return this._filter(value)
        }),
      );
    })
 }

 getCustomFilter(){
   const orgDomain = this.backendService.getOrganizationDomain();
   this.teamName = this.startService.teamName;
   const callable = this.functions.httpsCallable('filters/getFilter');
   callable({OrganizationDomain: orgDomain, TeamName: this.teamName}).pipe(
    map(actions => {
      const data = actions.resultData as CustomFilter[]
      return data;
    })).subscribe({
      next: (data) => {
        this.filters = data;
        this.filtersReady = true;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => console.info("Completed getting Filter Data")
    });

 }

  onProjectChange() {
    this.showLoader = true;
    this.appSettings.getTeamDetails(this.project).subscribe(data => {
      this.showLoader = false;
    });
  }

  filterByProperties() {
    if (!this.isAssigneeChecked) {
      this.assignee = ""
    }
    if (!this.isProjectChecked) {
      this.project = this.defaultProject
    }
    if (!this.isPriorityChecked) {
      this.priority = ""
    }
    if (!this.isStatusChecked) {
      this.status = ""
    }
    if (!this.isDifficultyChecked) {
      this.difficulty = ""
    }
    if (!this.isSprintChecked) {
      this.sprint = this.currentSprintNumber
    }
    this.filterProperty.emit({ Assignee: this.assignee, Priority: this.priority, Difficulty: this.difficulty, Status: this.status, Project: this.project, Sprint: this.sprint });
  }

  customfilterByProperties(item) {
    for(let i of this.filters ){
      if(i['FilterName'] == item){
        if (!this.isAssigneeChecked) {
          this.assignee = i.FilterJson.Assignee;
        }
        if (!this.isProjectChecked) {
          this.project = this.defaultProject
        }
        if (!this.isPriorityChecked) {
          this.priority = i.FilterJson.Priority;
        }
        if (!this.isStatusChecked) {
          this.status = i.FilterJson.Status;
        }
        if (!this.isDifficultyChecked) {
          this.difficulty = i.FilterJson.Difficulty;
        }
        if (!this.isSprintChecked) {
          this.sprint = this.currentSprintNumber
        }       
        this.filterProperty.emit({ Assignee: this.assignee, Priority: this.priority, Difficulty: this.difficulty, Status: this.status, Project: this.project, Sprint: this.sprint });
      }
    }
  }
}