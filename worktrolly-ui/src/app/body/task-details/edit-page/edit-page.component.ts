import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { NgForm } from '@angular/forms';
import { Tasks } from 'src/app/Interface/TasksInterface';

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
  enableLoader: boolean = false;
  constructor(private functions: AngularFireFunctions) { }

  ngOnInit(): void {
    this.editTask = this.task;
    this.previousSprintId = this.task.SprintNumber;
  }

  async editPage() {
    this.enableLoader = true;
    const callable = this.functions.httpsCallable('editPageTask');

    try {
      console.log(this.editTask.Id);
      console.log(this.editTask.Title);
      console.log(this.editTask.Creator);

      console.log(this.editTask.SprintNumber);
      if (!(this.task.Status === "Completed")) {
        const result = await callable({ Id: this.editTask.Id, Description: this.editTask.Description, Priority: this.editTask.Priority, Difficulty: this.editTask.Difficulty, Assignee: this.editTask.Assignee, EstimatedTime: this.editTask.EstimatedTime, Category: this.task.Category, SprintNumber: this.editTask.SprintNumber, StoryPointNumber: this.editTask.StoryPointNumber, PreviousId: this.previousSprintId, CreationDate: this.editTask.CreationDate }).toPromise();
        console.log("Successfully Updated the task");
        console.log(result);
        this.editTaskDone();
      }
      else {
        console.log("Task is Completed , Cannot Update");
      }
    } catch (error) {
      console.error("Error", error);
    }
  }

  editTaskDone() {
    this.editTaskCompleted.emit({ completed: true });
  }

}
