/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* 
* Author: Sanjay Krishna S R <sanjaykrishna1203@gmail.com>
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
import { TeamData } from 'src/app/Interface/TeamInterface'

@Injectable({
  providedIn: 'root'
})
export class TeamServiceService {
  teamData: TeamData[];
  constructor(private functions: AngularFireFunctions) { }

  getTeams(orgDomain) {
    const callable = this.functions.httpsCallable('teams/getAllTeams');
    callable({ OrganizationDomain: orgDomain }).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.info('Getting Team Data Successful')
      }
    });
  }

  getLabels(orgDomain) {
    const callable = this.functions.httpsCallable('teams/getAllLabels');
    callable({ OrganizationDomain: orgDomain }).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.info('Getting Label Data Successful')
      }
    });
  }
}
