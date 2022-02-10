/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* 
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksId } from 'src/app/Interface/TasksInterface';

@Component({
  selector: 'app-task-cards',
  templateUrl: './task-cards.component.html',
  styleUrls: ['./task-cards.component.css']
})
export class TaskCardsComponent implements OnInit {

  @Input('tasks') tasks: TasksId[]
  @Input('parentComponent') parentComponent: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openTaskDetails(id: string) {
    this.router.navigate(['/TaskDetails', id]);
  }

}
