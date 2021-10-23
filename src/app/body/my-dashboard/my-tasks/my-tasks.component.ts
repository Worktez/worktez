import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tasks, TasksId } from 'src/app/Interface/TasksInterface';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {

  @Input("userEmail") userEmail: string
  @Input("currentSprint") currentSprintNumber: number

  tasksData: Observable<Tasks>
  parentComponent: string = "MyDashboard"

  constructor(private backendService: BackendService, private functions: AngularFireFunctions) { }

  ngOnInit(): void {
    this.readTaskData();
  }

  async readTaskData() {
    var orgDomain = this.backendService.getOrganizationDomain();

    const callable = this.functions.httpsCallable("tasks");
    this.tasksData = await callable({ mode: "getTasksForDashboard", OrgDomain: orgDomain, FilterAssignee: this.userEmail}).pipe(
      map(actions => {
        return actions.data as Tasks;
      }));
  }
}
