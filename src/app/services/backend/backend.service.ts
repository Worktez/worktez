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
    const callable = this.functions.httpsCallable("organization");
    this.organizationsData = callable({mode: "getOrgData", AppKey: AppKey}).pipe(
      map(actions => {
        this.organizationDetails = actions.resultData as Organizations
        return actions.resultData as Organizations;
    }));
    return this.organizationsData;
  }

  getOrganizationDomain() {
    return this.organizationDetails.OrganizationDomain;
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

  getOrganizationName() {
    return this.organizationDetails.OrganizationName;
  }
}
