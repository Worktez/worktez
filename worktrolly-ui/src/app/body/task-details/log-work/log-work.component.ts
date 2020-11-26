import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-log-work',
  templateUrl: './log-work.component.html',
  styleUrls: ['./log-work.component.css']
})
export class LogWorkComponent implements OnInit {

  @ViewChild('form') form: NgForm;

  SprintName: string
  Id: string
  logWorkDone: number
  logWorkStatus: number
  logHours: number
  logWorkComment: number

  task: Tasks
  private taskDocument: AngularFirestoreDocument<Tasks>

  constructor(private route: ActivatedRoute, private functions: AngularFireFunctions,private db: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
    this.SprintName = this.route.snapshot.params['sprintName'];
    this.Id = this.route.snapshot.params['taskId'];
    this.getLogDetail();
  }

  async getLogDetail() {
    var documentName = this.SprintName + '/' + this.Id;
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

  async submitLogWorkPage() {
    console.log(this.task.SprintNumber);
    console.log(this.Id);
    console.log(this.logWorkDone);
    console.log(this.logWorkStatus);
    console.log(this.logHours);
    console.log(this.logWorkComment);

    const callable = this.functions.httpsCallable('logWork');

    try{
      const result = await callable({SprintNumber: this.task.SprintNumber, LogTaskId: this.Id, LogHours: this.logHours, LogWorkDone: this.logWorkDone, LogWorkStatus: this.logWorkStatus, LogWorkComment: this.logWorkComment}).toPromise();
   
      console.log("Logged Work Successfully");
      console.log(result);
    }catch(error){
      console.log("Error", error);
    }
  }

}
