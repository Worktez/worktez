import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Tasks, TasksId } from 'src/app/Interface/TasksInterface';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  currentSprintName: string
  category: string

  tasksCollection: AngularFirestoreCollection<Tasks>
  tasksData: Observable<TasksId[]>

  constructor(private route: ActivatedRoute, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.category = this.route.snapshot.params['category'];
    this.currentSprintName = this.route.snapshot.params['currentSprintName'];

    this.readCurrentSprintData();
  }

  readCurrentSprintData() {
    this.tasksCollection = this.db.collection<Tasks>(this.currentSprintName);
    this.tasksData = this.tasksCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Tasks;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

}
