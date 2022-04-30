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
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { FilterTaskService } from 'src/app/services/filter-task/filter-task.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-create-filter',
  templateUrl: './create-filter.component.html',
  styleUrls: ['./create-filter.component.css']
})
export class CreateFilterComponent implements OnInit {

  componentName: string = "CREATE-FILTER";

  @ViewChild('form') form: NgForm;

  assigneeName = new FormControl();
  filteredOptionsAssignee: Observable<string[]>;

  reporterName = new FormControl();
  filteredOptionsReporter: Observable<string[]>;

  defaultProject: string
  currentSprintNumber: number
  assignee: string = ""
  project: string = ""
  priority: string = ""
  status: string = ""
  difficulty: string = ""
  sprint: number = 0 
  description: string = ""
  filterName: string = ""
  teamName: string = ""
  teamIds: string[]

  statusLabels: string[]
  priorityLabels: string[]
  difficultyLabels: string[]
  type: string[]
  teamMembers: string[] = []
  sprintNumber: number
  backlogSprintNumber: number

  enableLoader: boolean = false;

  constructor(public backendService: BackendService, private functions: AngularFireFunctions, public userService: UserServiceService, public startService: StartServiceService, private route: ActivatedRoute, public navbarHandler: NavbarHandlerService, public authService: AuthService, public appSettings: ApplicationSettingsService, public filterTaskService: FilterTaskService, ) { }

  ngOnInit(): void {
    if(this.startService.showTeamsData) {
      this.project = this.authService.getTeamId();
      this.teamIds = this.backendService.getOrganizationTeamIds(); 
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
    if(item.selected == false) {
      this.assigneeName.setValue("");
    } else {
      this.assigneeName.setValue(item.data);
    }
  }

  readTeamData(teamId :string){
    this.enableLoader = true;
    this.appSettings.getTeamDetails(teamId).subscribe(team => {
          this.priorityLabels = team.Priority;
          this.statusLabels = team.Status;
          this.type = team.Type;
          this.difficultyLabels = team.Difficulty;
          this.teamMembers=team.TeamMembers;
          this.teamName=team.TeamName;
          this.sprintNumber = team.CurrentSprintId;
          this.currentSprintNumber=team.CurrentSprintId;
          this.backlogSprintNumber=-1;

          this.filteredOptionsAssignee = this.assigneeName.valueChanges.pipe(
            startWith(''),
            map((value) => {
              return this._filter(value)
            }),
          );

          this.filteredOptionsReporter = this.reporterName.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value)),
          );
          this.enableLoader = false;
    }); 
  }

 submit(){
   this.enableLoader=true;
   const orgDomain = this.backendService.getOrganizationDomain();
   console.log(this.filterName);
   console.log(this.description);
   console.log(this.assigneeName.value);
   console.log(this.priority);
   console.log(this.difficulty);
   console.log(this.status);
   console.log(this.sprintNumber);
   this.addFilter();
  
}

addFilter(){
  this.enableLoader=true;
  const orgDomain = this.backendService.getOrganizationDomain();
  console.log(orgDomain);
  const callable = this.functions.httpsCallable('filterPage/createFilter');
  callable({FilterName:this.filterName, Description:this.description, orgDomain:orgDomain}).subscribe({
    next:() => {
      console.log("Added New Filter");
    },
    error: (error) => {
      console.error(error);
    },
    complete: () => {
      console.log("Successfully added Filter");
      this.enableLoader=false;
    }
  })
}

onProjectChange(){
  console.log("update teams");
}
}
