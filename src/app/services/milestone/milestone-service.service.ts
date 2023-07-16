import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { map, Subject } from 'rxjs';
import { Tasks } from '../../Interface/TasksInterface';
import { BackendService } from '../backend/backend.service';
import { StartServiceService } from '../start/start-service.service';
import { Milestones } from 'src/app/Interface/MilestoneInterface';

@Injectable({
  providedIn: 'root'
})
export class MilestoneServiceService {

  taskData: Tasks[];
  completedTasks: any[] = [];
  incompleteTasks: any[] = [];
  private taskDataState: Subject<boolean> = new Subject<boolean>();
  public taskDataStateObservable = this.taskDataState.asObservable();

  milestoneData: Milestones[];
  completedMilestoneData: Milestones[] = [];
  milestoneDataReady: boolean = false;

  constructor(private functions: AngularFireFunctions, private backendService: BackendService, private startService: StartServiceService) { }

  getAllMilestoneData() {
    const orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable("milestone/getAllMilestones");
    callable({OrgDomain: orgDomain, TeamId: this.startService.selectedTeamId}).pipe(
      map(actions => {
        return actions.data as Milestones[];
      })).subscribe({
        next: (data) => {
          if (data) {
            this.milestoneData = data;
            this.milestoneData.forEach(milestone => {
             if(milestone.MilestoneStatus == "Completed"){
               this.completedMilestoneData.push(milestone);
             }
            });
          }
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.info("Fetched Milestones Data Successfully");
          this.milestoneDataReady = true;
        }
     });
  }


  getTasks(orgDomain: string, milestoneId: string) {
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
