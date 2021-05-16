import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tasks, TasksId } from 'src/app/Interface/TasksInterface';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {

  @Input("username") username: string
  @Input("currentSprint") currentSprintNumber: number

  tasksCollection: AngularFirestoreCollectionGroup<Tasks>
  tasksData: Observable<TasksId[]>

  constructor(public db: AngularFirestore) { }

  ngOnInit(): void {
    this.readTaskData();
  }

  readTaskData() {
    this.tasksCollection = this.db.collectionGroup<Tasks>("Tasks", ref => {
      let queryRef = ref;
      queryRef = queryRef.where('SprintNumber', '==', this.currentSprintNumber);
      queryRef = queryRef.where('Assignee', '==', this.username);
      return queryRef;
    });
    console.log(this.username);
    console.log(this.currentSprintNumber);
    this.tasksData = this.tasksCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Tasks;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
}
