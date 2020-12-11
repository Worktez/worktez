import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
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
  logWorkEnabled: boolean = false
  editTaskEnabled: boolean = false

  task: Tasks
  private taskDocument: AngularFirestoreDocument<Tasks>

  constructor(private route: ActivatedRoute, private db: AngularFirestore, private router: Router, private functions: AngularFireFunctions) { }

  ngOnInit(): void {
    this.Id = this.route.snapshot.params['taskId'];
    this.getTaskDetail();
  }

  async getTaskDetail() {
    var documentName = 'Tasks/' + this.Id;
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
    this.logWorkEnabled = true;
  }

  editTask() {
    this.editTaskEnabled = true;
  }

  logWorkCompleted(data: { completed: boolean }) {
    this.logWorkEnabled = false;
  }

  editTaskCompleted(data: { completed: boolean }) {
    this.editTaskEnabled = false;
  }

  async deleteTask() {
    const callable = this.functions.httpsCallable('deleteTask');

    try {
      const result = await callable({ Id: this.task.Id, SprintNumber: this.task.SprintNumber, Category: this.task.Category }).toPromise();
      console.log(this.task.Id + " deleted");
      console.log(result);
      this.router.navigate(['/']);
    } catch (error) {
      console.log("Error", error);
    }
  }

  backToTasks(category: string){
    this.sprintName = "S" + this.task.SprintNumber;
    this.router.navigate(['Tasks', category, this.sprintName])
  }

}
