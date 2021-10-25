import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TasksId } from 'src/app/Interface/TasksInterface';

@Component({
  selector: 'app-task-cards',
  templateUrl: './task-cards.component.html',
  styleUrls: ['./task-cards.component.css']
})
export class TaskCardsComponent implements OnInit {

  @Input('tasks') tasks: TasksId[]
  @Input('sortByFields') sortByFields: {}
  @Output('getSortByFields') getSortByFields = new EventEmitter<object>();
  tableHeaders = ['Status', 'Priority', 'Difficulty', 'Id', 'Title', 'Assignee', 'Progress'];
  @Input('parentComponent') parentComponent: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openTaskDetails(id: string) {
    this.router.navigate(['/TaskDetails', id]);
  }

  getColSpan(header: string) {
    if(header == "Title" || header == "Progress") {
      return 3;
    } else if(header == 'Assignee') {
      return 2;
    } else {
      return 1;
    }
  }

  toggleSortBy(header: string) {
    if(this.sortByFields[header] == null) {
      this.sortByFields[header] = 'asc';
    } else if(this.sortByFields[header] == 'asc') {
      this.sortByFields[header] = 'desc';
    } else {
      this.sortByFields[header] = null;
    }
    this.getSortByFields.emit(this.sortByFields);
  }

}
