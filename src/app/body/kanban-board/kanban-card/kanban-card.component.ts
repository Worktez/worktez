import { Component, Input, OnInit } from '@angular/core';
import { Tasks } from 'src/app/Interface/TasksInterface';

@Component({
  selector: 'app-kanban-card',
  templateUrl: './kanban-card.component.html',
  styleUrls: ['./kanban-card.component.css']
})
export class KanbanCardComponent implements OnInit {

  @Input('task') task: Tasks

  constructor() { }

  ngOnInit(): void {
  }

}
