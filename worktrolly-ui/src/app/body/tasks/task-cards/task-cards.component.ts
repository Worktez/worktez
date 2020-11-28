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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openTaskDetails(id: string) {
    var sprintName = "";
    if (this.task.SprintNumber == -1) {
      sprintName = "Backlog";
    }else {
      sprintName = "S" + this.task.SprintNumber.toString();
    }
    this.router.navigate(['/TaskDetails', sprintName, id]);
  }

}
