import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { NgForm } from '@angular/forms';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { Router } from '@angular/router';
import { ValidationService } from '../../../services/validation.service';


@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @Input('task') task: Tasks
  @Output() editTaskCompleted = new EventEmitter<{ completed: boolean }>();

  editTask: Tasks
  previousSprintId: number
  enableLoader: boolean = false
  todayDate: string
  time: string

  constructor(private functions: AngularFireFunctions, private router: Router, public validationService: ValidationService) { }

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

    this.editTask = this.task;
    this.previousSprintId = this.task.SprintNumber;
  }

  async submit(){
    let data = [{label:"priority",value:this.editTask.Priority},
    {label:"estimatedTime",value:this.editTask.EstimatedTime},
    {label:"difficulty",value:this.editTask.Difficulty},
    {label:"description",value:this.editTask.Description},
    {label:"assignee",value:this.editTask.Assignee},
    {label:"sprintNumber",value:this.editTask.SprintNumber},
    {label:"storyPoint",value:this.editTask.StoryPointNumber}];
    var condition = await (this.validationService.checkValidity(data)).then(res => {
      return res;});
    if(condition)
    {
      console.log("Inputs are valid");
      this.editPage();
    }
    else
    console.log("Page not edited due to validation error");
  }

  async editPage() {
    this.enableLoader = true
    const callable = this.functions.httpsCallable('editPageTask');

    try {
      console.log(this.editTask.Id);
      console.log(this.editTask.Title);
      console.log(this.editTask.Creator);

      console.log(this.editTask.SprintNumber);
      if (!(this.task.Status === "Completed")) {
        const result = await callable({ Id: this.editTask.Id, Description: this.editTask.Description, Priority: this.editTask.Priority, Difficulty: this.editTask.Difficulty, Assignee: this.editTask.Assignee, EstimatedTime: this.editTask.EstimatedTime, Category: this.task.Category, SprintNumber: this.editTask.SprintNumber, StoryPointNumber: this.editTask.StoryPointNumber, PreviousId: this.previousSprintId, CreationDate: this.editTask.CreationDate, Date: this.todayDate, Time: this.time}).toPromise();
        console.log("Successfully Updated the task");
        console.log(result);
        this.editTaskDone();
      }
      else {
        console.log("Task is Completed , Cannot Update");
      }
    } catch (error) {
      this.enableLoader = false;
      console.error("Error", error);
    }
  }

  editTaskDone() {
    this.editTaskCompleted.emit({ completed: true });
  }

  backToTaskDetails(){
    window.location.reload();
  }

}
