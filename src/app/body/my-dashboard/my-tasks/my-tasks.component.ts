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

  displayColoumns = [];

  constructor(private dataTableService: DataTableService) { }

  ngOnInit(): void {
    this.showLoader = true;
    this.dataTableService.readTaskDataForDashboard().subscribe((data) => {
      this.tasksData = data;
      this.displayColoumns = ['Status', 'Priority', 'Difficulty', 'Id', 'Title', 'WorkDone'];
      this.showLoader = false;
    });
  }
}
