import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tasks, TasksId } from 'src/app/Interface/TasksInterface';
import { AngularFireFunctions } from '@angular/fire/functions';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {

  @Input("userEmail") userEmail: string
  @Input("currentSprint") currentSprintNumber: number

  tasksCollection: AngularFirestoreCollectionGroup<Tasks>
  tasksData: Observable<TasksId[]>
  orgDomain: string

  constructor(public db: AngularFirestore, public backendService: BackendService,private functions: AngularFireFunctions) { }

  ngOnInit(): void {
    this.orgDomain = this.backendService.getOrganizationDomain();
    console.log("1");
    this.readTaskData();
  }

  async readTaskData() {
    const callable = this.functions.httpsCallable('tasks');
    try{
      const result = await callable({mode: "getTasksCard",orgDomain:this.orgDomain, sprintNumber:this.currentSprintNumber, Assignee: this.userEmail}).toPromise();
      this.tasksData = result.taskData;
      
    }
    catch(err){
      console.log(err);
    }
}
}
