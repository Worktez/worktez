import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksId } from 'src/app/Interface/TasksInterface';

@Component({
  selector: 'app-task-cards',
  templateUrl: './task-cards.component.html',
  styleUrls: ['./task-cards.component.css']
})
export class TaskCardsComponent implements OnInit {

  @Input('task') task: TasksId
  @Input('sprintName') currentSprintName: string
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openTaskDetails(id: string) {
    this.router.navigate(['/Board/Tasks', this.task.Category, this.currentSprintName, id]);
  }

}
