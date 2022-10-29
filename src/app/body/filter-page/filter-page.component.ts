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
import { Component, Input, OnInit, Output } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { map } from 'rxjs';
import { CustomFilter } from 'src/app/Interface/TeamInterface';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { database } from 'firebase-functions/v1/firestore';

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.css']
})
export class FilterPageComponent implements OnInit {
  componentName: string  = "Custom-Filters"
  teamName: string = ""
  filters: CustomFilter[] = [];
  filtersReady: boolean = true;
  showEditFilterProp: boolean = false;
  deletedFilterEnabled: boolean=false;
  filterToDelete: CustomFilter =null;
  filterToEdit: CustomFilter = null;
  public filterDataObservable: CustomFilter

  constructor(private navbarHandlerService: NavbarHandlerService, private functions: AngularFireFunctions, private backendService: BackendService , public errorHandlerService: ErrorHandlerService, private startService: StartServiceService, public applicationSettings: ApplicationSettingsService,  public authService: AuthService) { }

  ngOnInit(): void {
    this.navbarHandlerService.resetNavbar();
    this.navbarHandlerService.addToNavbar(this.componentName);
    if(this.startService.showTeamsData) {
      this.getTeamFilters();
    } else {
      this.startService.userDataStateObservable.subscribe((data) => {
        if(data){
          this.startService.applicationDataStateObservable.subscribe((data) => {
            if(data) {
              this.getTeamFilters();
              // this.applicationSettings.teamData.subscribe((data) => {
              //   if(data) {
              //     this.getTeamFilters();
              //   }
              // });
            }
          });
        }
      });
    }
  }

  getTeamFilters(){
    const orgDomain = this.backendService.getOrganizationDomain();
    this.teamName =  this.startService.teamName;
    const callable = this.functions.httpsCallable("filters/getFilter");
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
        complete: () => console.info("Completed getting Filter Data...")
      });
  }

  openEditFilterProperties(item: CustomFilter) {
    this.showEditFilterProp = true;
    this.filterToEdit = item;
    this.getTeamFilters();
  }

  setFilterToEdit(item: CustomFilter){
    this.filterToEdit=item;
    this.showEditFilterProp=true;
  }

  editFilterCompleted(){
    this.showEditFilterProp = false;
    this.getTeamFilters();
  }

  setFilterToDelete(item: CustomFilter){
    this.filterToDelete=item;
    this.deletedFilterEnabled=true;
   
  }

  createFilterCompleted(data:{ completed : boolean}){
    if (data.completed == true ){
      this.getTeamFilters();
    }
   
  }
  deletedFilter(){
    if(this.filterToDelete != null) {
       const orgDomain = this.backendService.getOrganizationDomain();
       this.teamName =  this.startService.teamName;
       const callable = this.functions.httpsCallable("filters/deleteFilter");
       callable({OrgDomain: orgDomain, TeamName: this.teamName, Id: this.filterToDelete.Id}).subscribe({
         next: (data) => {
           this.getTeamFilters();
           console.log(this.getTeamFilters);
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


