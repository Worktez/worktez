import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tasks, TasksId } from 'src/app/Interface/TasksInterface';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {

  @Input("userEmail") userEmail: string
  @Input("currentSprint") currentSprintNumber: number

  tasksData: Observable<Tasks[]>
  sortByFields: {} = {'Status': null, 'Priority': null, 'Difficulty': null, 'Id': null, 'Title': null, 'Assignee': null, 'Progress': null};

  constructor(public db: AngularFirestore, private functions: AngularFireFunctions) { }

  ngOnInit(): void {
    this.readTaskData();
  }

  async readTaskData() {
    const callable = this.functions.httpsCallable("tasks");
    this.tasksData = await callable({ mode: "getAllTasks", OrgDomain: "worktrolly.web.app", SprintNumber: this.currentSprintNumber, SortByFields: this.sortByFields, UserEmail: this.userEmail }).pipe(
      map(actions => {
        return actions.data as Tasks[];
      }));
  }

  sortTasks(sortByFields: object) {
    this.sortByFields = sortByFields;
    this.readTaskData();
  }
}
