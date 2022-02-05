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
import { Tasks } from 'src/app/Interface/TasksInterface';
import { DataTableService } from 'src/app/services/dataTable/data-table.service';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {

  @Input("userEmail") userEmail: string
  @Input("currentSprint") currentSprintNumber: number

  parentComponent: string = "MyDashboard"
  tasksData: Tasks[]
  showLoader: boolean = false;
  noData: boolean = false;

  displayColoumns = [];

  constructor(private dataTableService: DataTableService) { }

  ngOnInit(): void {
    this.showLoader = true;
    this.dataTableService.readTaskDataForDashboard().subscribe((data) => {
      if(data.length) {
        this.tasksData = data;
        this.displayColoumns = ['Status', 'Priority', 'Difficulty', 'Id', 'Title', 'WorkDone'];
        this.showLoader = false;
        this.noData = false;
      } else {
        this.showLoader = false;
        this.noData = true;
      }
    });
  }
}
