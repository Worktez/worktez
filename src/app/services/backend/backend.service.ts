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
import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Organizations } from '../../Interface/OrganizationInterface';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  organizationDetails: Organizations

  organizationsData: Observable<Organizations>

  currentSprintNumber: number = 0;
  currentSprintName: string;

  selectedTaskId: string = "";

  constructor(private functions: AngularFireFunctions) { }

  getOrgDetails(AppKey: string) {
    const callable = this.functions.httpsCallable("organization/getOrgData");
    this.organizationsData = callable({ AppKey: AppKey}).pipe(
      map(actions => {
        this.organizationDetails = actions.resultData as Organizations
        return actions.resultData as Organizations;
    }));
    return this.organizationsData;
  }

  getOrganizationDomain() {
    if(this.organizationDetails)
      return this.organizationDetails.OrganizationDomain;
    
    return;
  }

  getOrganizationAppKey() {
    return this.organizationDetails.AppKey;
  }

  getOrganizationId() {
    return this.organizationDetails.OrganizationId;
  }
  
  getOrganizationTeamIds(){
    return this.organizationDetails.TeamsId;
  }
  getOrganizationTeamNames(){
    return this.organizationDetails.TeamsName;
  }

  getOrganizationName() {
    return this.organizationDetails.OrganizationName;
  }
}
