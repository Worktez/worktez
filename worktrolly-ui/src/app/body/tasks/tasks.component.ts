import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  currentSprintNumber: number

  tasksCollection: AngularFirestoreCollection<Tasks>
  tasksData: Observable<TasksId[]>

  constructor(private route: ActivatedRoute,private router: Router, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.category = this.route.snapshot.params['category'];
    this.currentSprintName = this.route.snapshot.params['currentSprintName'];

    if(this.currentSprintName == "Backlog") {
      this.currentSprintNumber = -1;
    } else {
      this.currentSprintNumber = parseInt(this.currentSprintName.slice(1));
    }

    this.readCurrentSprintData();
  }

  readCurrentSprintData() {
    this.tasksCollection = this.db.collection<Tasks>("Tasks", ref=>ref.where('SprintNumber', '==', this.currentSprintNumber).where('Category', '==', this.category));
    this.tasksData = this.tasksCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Tasks;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  backToDashboard(){
    this.router.navigate(['/']);
  }

}
