import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { AuthService } from '../auth.service';
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

    const callable = this.functions.httpsCallable("tasks");
    this.tasksDataObservable = callable({ mode: "getTasksForDashboard", OrgDomain: orgDomain, FilterAssignee: userEmail}).pipe(
      map(actions => {
        return actions.data as Tasks[];
    }));

    return this.tasksDataObservable;
  }

  readAllTaskData(teamId, currentSprintNumber, filterAssignee, filterPriority, filterDifficulty, filterStatus, filterProject) {
    var orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable("tasks");
    this.tasksDataObservable = callable({ mode: "getAllTasks", OrgDomain: orgDomain, TeamId: teamId, SprintNumber: currentSprintNumber, FilterAssignee: filterAssignee, FilterPriority: filterPriority, FilterDifficulty: filterDifficulty, FilterStatus: filterStatus, FilterProject: filterProject }).pipe(
      map(actions => {
        return actions.data as Tasks[];
      }));
    return this.tasksDataObservable;
  }
}
