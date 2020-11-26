import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Tasks } from 'src/app/Interface/TasksInterface';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  sprintName: string
  Id: string

  task: Tasks
  private taskDocument: AngularFirestoreDocument<Tasks>

  constructor(private route: ActivatedRoute, private db: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
    this.sprintName = this.route.snapshot.params['sprintName'];
    this.Id = this.route.snapshot.params['taskId'];
    this.getTaskDetail();
  }

  async getTaskDetail() {
    var documentName = this.sprintName + '/' + this.Id;
    this.taskDocument = this.db.doc<Tasks>(documentName);
    try {
      await this.taskDocument.ref.get().then(doc => {
        if (doc.exists) {
          var rawData = doc.data() as Tasks;
          this.task = rawData;
          console.log(this.task);
        } else {
          console.error("Document does not exists!")
        }
      });
      return "Success";
    } catch (error) {
      return "Error";
    }

  }

  logWorkPage() {
    this.router.navigate(['/logWorkPage', this.sprintName, this.Id])
  }

}
