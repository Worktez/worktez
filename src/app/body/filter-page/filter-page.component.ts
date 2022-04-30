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
import { Component, Input, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { map } from 'rxjs';
import { Team } from 'src/app/Interface/TeamInterface';
import { CustomFilter } from 'src/app/Interface/UserInterface';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.css']
})
export class FilterPageComponent implements OnInit {
  @Input('teamName') teamName:string;
  @Input('filterType') filterType: string;
  
  filters: CustomFilter[] = [];
  filtersReady: boolean = true;
  filterToDelete: CustomFilter = null;
  filterToEdit: CustomFilter = null;
  team: Team;
  showEditFilterProp: boolean = false;
  deletedFilterEnabled: boolean=false;

  public filterDataObservable: CustomFilter

  constructor(private functions: AngularFireFunctions, private backendService: BackendService , public errorHandlerService: ErrorHandlerService, private startService: StartServiceService, public applicationSettings: ApplicationSettingsService) { }

  ngOnInit(): void {
    if(this.startService.showTeamsData) {
      this.getTeamFiltersByScope();
    } else {
      this.startService.userDataStateObservable.subscribe((data) => {
        if(data){
          this.startService.applicationDataStateObservable.subscribe((data) => {
            if(data) {
              this.applicationSettings.teamData.subscribe((data) => {
                if(data) {
                  this.getTeamFiltersByScope();
                }
              });
            }
          });
        }
      });
    }
  }

  getTeamFiltersByScope(){
    const orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable("filterPage/getFilter");
    callable({}).pipe(
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
        complete: () => console.info("Completed getting Filter Data...")
      });
  }

  openEditFilterProperties(item: CustomFilter) {
    this.showEditFilterProp = true;
    this.filterToEdit = item;
    this.getTeamFiltersByScope();
  }

  setFilterToEdit(item: CustomFilter){
    this.filterToEdit=item;
    this.showEditFilterProp=true;
  }

  editFilterCompleted(){
    this.showEditFilterProp = false;
  }

  setFilterToDelete(item: CustomFilter){
    this.filterToDelete=item;
    this.deletedFilterEnabled=true;
  }

  deletedFilter(){
    if(this.filterToDelete != null) {
       const orgDomain = this.backendService.getOrganizationDomain();
       const callable = this.functions.httpsCallable("filterPage/deleteFilter");
       callable({OrgDomain: orgDomain, TeamName: this.team.TeamName, Id: this.filterToDelete.FilterId}).subscribe({
         next: (data) => {
           this.getTeamFiltersByScope();
           console.log("Successfull");
         },
         error: (error) => {
           console.log("Error", error);
           this.errorHandlerService.showError = true;
           this.errorHandlerService.getErrorCode("InternalError","Api");
           console.error(error);
         },
         complete: () => console.info("Successfully updated in db")
       });
       console.info("Deleting filter");
      }
  }

}
