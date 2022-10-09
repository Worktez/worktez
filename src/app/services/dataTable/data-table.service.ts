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
import { Tasks } from 'src/app/Interface/TasksInterface';
import { AuthService } from '../auth/auth.service';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class DataTableService {

  public tasksDataObservable: Observable<Tasks[]>;

  constructor(private backendService: BackendService, private authService: AuthService, private functions: AngularFireFunctions) {}

  readTaskDataForDashboard() {
    var orgDomain = this.backendService.getOrganizationDomain();
    var userEmail = this.authService.getUserEmail();

    const callable = this.functions.httpsCallable("tasks/getTasksForDashboard");
    this.tasksDataObservable = callable({OrgDomain: orgDomain, FilterAssignee: userEmail}).pipe(
      map(actions => {
        return actions.data as Tasks[];
    }));

    return this.tasksDataObservable;
  }

  readAllTaskData(teamId: string, currentSprintNumber: number, filterAssignee: string, filterPriority: string, filterDifficulty: string, filterStatus: string, filterProject: string) {
    var orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable("tasks/getAllTasks");
    this.tasksDataObservable = callable({OrgDomain: orgDomain, TeamId: teamId, SprintNumber: currentSprintNumber, FilterAssignee: filterAssignee, FilterPriority: filterPriority, FilterDifficulty: filterDifficulty, FilterStatus: filterStatus, FilterProject: filterProject }).pipe(
      map(actions => {
        return actions.data as Tasks[];
      }));
    return this.tasksDataObservable;
  }
}
