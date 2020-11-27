import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-new-session',
  templateUrl: './create-new-session.component.html',
  styleUrls: ['./create-new-session.component.css']
})
export class CreateNewSessionComponent implements OnInit {

  @ViewChild('form') form: NgForm;

  title: string
  todayDate: string
  description: string
  assigneeName: string
  creatorName: string
  estimatedTime: number
  category: string
  priority: string
  difficulty: string
  status: string
  sprintNumber: number
  storyPoint: number


  constructor(private functions: AngularFireFunctions, private router: Router) { }

  ngOnInit(): void {
    var today = new Date();

    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    this.todayDate = dd+"/"+mm+"/"+yyyy;
  }

  async createNewSession() {
    console.log(this.title);
    console.log(this.todayDate);
    console.log(this.description);
    console.log(this.assigneeName);
    console.log(this.creatorName);
    console.log(this.category);
    console.log(this.estimatedTime);
    console.log(this.priority);
    console.log(this.difficulty);
    console.log(this.status);
    console.log(this.sprintNumber);
    console.log(this.storyPoint);

    const callable = this.functions.httpsCallable('createNewTask');

    try {
      const result = await callable({ Title: this.title, Description: this.description, Priority: this.priority, Difficulty: this.difficulty, Creator: this.creatorName, Assignee: this.assigneeName, EstimatedTime: this.estimatedTime, Status: this.status, Category: this.category, SprintNumber: this.sprintNumber, StoryPointNumber: this.storyPoint, CreationDate: this.todayDate }).toPromise();

      console.log("Successfully created the task");
      console.log(result);
      this.router.navigate(['/']);
    } catch (error) {
      console.error("Error", error);
    }
  }

}
