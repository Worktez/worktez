/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* 
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* Author: Simran Nigam <nigamsimran14@gmail.com>
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/
import { Component,Input, Output, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import {  UntypedFormControl, NgForm, FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { FilterTaskService } from 'src/app/services/filter-task/filter-task.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-create-filter',
  templateUrl: './create-filter.component.html',
  styleUrls: ['./create-filter.component.css']
})
export class CreateFilterComponent implements OnInit {

  componentName: string = "CREATE-FILTER";

  @ViewChild('form') form: NgForm;
  @Output() createFilterCompleted = new EventEmitter<{ completed:boolean }>();
  @Input() getTeamFilters = new EventEmitter();


  assigneeName = new UntypedFormControl();
  filteredOptionsAssignee: Observable<string[]>;

  reporterName = new UntypedFormControl();
  filteredOptionsReporter: Observable<string[]>;

  defaultProject: string
  currentSprintNumber: number
  assignee: string = ""
  project: string = ""
  priority: string = null
  status: string = null
  difficulty: string = null
  sprint: number = 0 
  description: string = "Empty"
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

  constructor(public backendService: BackendService, public validationService: ValidationService, private functions: AngularFireFunctions, public userService: UserServiceService, public startService: StartServiceService, private route: ActivatedRoute, public navbarHandler: NavbarHandlerService, public authService: AuthService, public appSettings: ApplicationSettingsService, public filterTaskService: FilterTaskService, ) { }

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

 async submit(){
   this.enableLoader=true;


   console.log(this.priority)
   let data = [{ label: "filterName", value: this.filterName },]  

   if(this.difficulty==null){
    this.difficulty = "All"
  }
  

  if(this.priority==null){
    this.priority= "All"
  }

  if(this.assignee==null){
    this.assignee= "All"
  }

  if(this.status==null){
    this.status = "All"
  }

  if(this.description==null){
    this.status = "All"
  }


  if(this.sprint==null){
    this.sprint = 0
  }


  if(this.description==null){
    this.description = "Null"
  }


  
    var condition = await (this.validationService.checkValidity(this.componentName, data)).then(res => {
      console.log(condition)
      return res;
     
    });
    if (condition) {
      console.log("Inputs are valid");
      this.createFilter();
    }
    else
      console.log("Filter not created! Validation error");
      this.enableLoader=false;
}




createFilter(){
  const orgDomain = this.backendService.getOrganizationDomain();
  const callable = this.functions.httpsCallable('filters/createFilter');
  callable({FilterName:this.filterName, Description:this.description, Difficulty: this.difficulty, Priority: this.priority, Status: this.status, SprintNumber: this.sprintNumber, OrgDomain: orgDomain, TeamName: this.teamName, Assignee: this.assigneeName.value}).subscribe({
    next:() => {
      this.enableLoader = true;
      this.assignee = ""
      this.project = ""
      this.priority = null
      this.status = null
      this.difficulty = null
      this.sprint = null
      this.description = null
      this.filterName =""
      console.log("Added New Filter");
      this.createFilterDone();
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

createFilterDone(){
  console.log(this.getTeamFilters);
  this.createFilterCompleted.emit({ completed:true });
}


  onProjectChange(){
    console.log("update teams");
    this.readTeamData(this.project);
  }
}
