import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { map, Subject } from 'rxjs';
import { Tasks } from '../../Interface/TasksInterface';

@Injectable({
  providedIn: 'root'
})
export class MilestoneServiceService {

  taskData: Tasks[];
  completedTasks: any[] = [];
  incompleteTasks: any[] = [];
  private taskDataState: Subject<boolean> = new Subject<boolean>();
  public taskDataStateObservable = this.taskDataState.asObservable();
  constructor(private functions: AngularFireFunctions) { }


  getTasks(orgDomain, milestoneId) {
    this.taskDataState.next(false)
    const callable = this.functions.httpsCallable("tasks/getAllTasks");
    callable({ OrgDomain: orgDomain, MilestoneId: milestoneId }).pipe(
      map(actions => {
        return actions.data as Tasks[];
      })).subscribe({
        next: (data) => {
          this.taskData = [];
          this.completedTasks = [];
          this.incompleteTasks = [];

          this.taskData = data;
          this.taskData.forEach((element) => {
            if (element.Status == 'Completed') {
              this.completedTasks.push(element);
            }
            else {
              this.incompleteTasks.push(element);
            }
          })
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.info("Fetched Tasks Successfully");
          this.taskDataState.next(true);
        }
      });
  }
}
