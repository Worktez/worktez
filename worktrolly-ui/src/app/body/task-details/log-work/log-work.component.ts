import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ValidationService } from '../../../services/validation.service';

@Component({
  selector: 'app-log-work',
  templateUrl: './log-work.component.html',
  styleUrls: ['./log-work.component.css']
})
export class LogWorkComponent implements OnInit {

  @ViewChild('form') form: NgForm;

  @Input('task') task: Tasks
  @Output() logWorkCompleted = new EventEmitter<{ completed: boolean }>();

  Id: string
  logWorkDone: number
  logWorkStatus: number
  logHours: number
  logWorkComment: number
  enableLoader: boolean = false
  todayDate: string
  time: string

  constructor(private functions: AngularFireFunctions, public validationService: ValidationService) { }

  ngOnInit(): void { 
    var today = new Date();

    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    var hh = String(today.getHours()).padStart(2, '0');
    var mn = String(today.getMinutes()).padStart(2, '0');
    var ss= String(today.getSeconds()).padStart(2, '0');
    this.todayDate = dd + "/" + mm + "/" + yyyy;
    this.time = hh + ":" + mn + ":" + ss;
  }

  async submit(){
    let labels = ['status', 'logHours', 'workCompleted', 'comment'];
    let values = [this.logWorkStatus, this.logHours, this.logWorkDone, this.logWorkComment];
    let data = [{label:"status",value:this.logWorkStatus},
    {label:"logHours",value:this.logHours},
    {label:"workCompleted",value:this.logWorkDone},
    {label:"comment",value:this.logWorkComment}];
    var condition = await (this.validationService.checkValidity(data)).then(res => {
      return res;});
    if(condition)
    {
      console.log("Inputs are valid");
      this.submitLogWorkPage();
    }
    else
    console.log("Log-Work failed due to validation error");
  }

  async submitLogWorkPage() {
    this.enableLoader = true;
    const callable = this.functions.httpsCallable('logWork');

    try {
      const result = await callable({ SprintNumber: this.task.SprintNumber, LogTaskId: this.task.Id, LogHours: this.logHours, LogWorkDone: this.logWorkDone, LogWorkStatus: this.logWorkStatus, LogWorkComment: this.logWorkComment, Date: this.todayDate, Time: this.time}).toPromise();

      console.log("Logged Work Successfully");
      console.log(result);
      this.workDone();
    } catch (error) {
      this.enableLoader = false;
      console.log("Error", error);
    }
  }

  workDone() {
    this.logWorkCompleted.emit({ completed: true });
  }
}
