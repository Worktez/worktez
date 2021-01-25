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

  constructor(private functions: AngularFireFunctions, public validationService: ValidationService) { }

  ngOnInit(): void { }

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
      const result = await callable({ SprintNumber: this.task.SprintNumber, LogTaskId: this.task.Id, LogHours: this.logHours, LogWorkDone: this.logWorkDone, LogWorkStatus: this.logWorkStatus, LogWorkComment: this.logWorkComment }).toPromise();

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
