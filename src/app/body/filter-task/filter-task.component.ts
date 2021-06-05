import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApplicationSettingsService } from 'src/app/services/application-settings.service';

@Component({
  selector: 'app-filter-task',
  templateUrl: './filter-task.component.html',
  styleUrls: ['./filter-task.component.css']
})
export class FilterTaskComponent implements OnInit {

  @Output() filterProperty = new EventEmitter<{ Assignee: string, Priority: string, Difficulty: string, Status: string, Project: string }>();
  @Input("defaultProject") defaultProject: string
  isAssigneeChecked: boolean
  isDifficultyChecked: boolean
  isPriorityChecked: boolean
  isStatusChecked: boolean
  isProjectChecked: boolean

  assignee: string
  project: string
  priority: string
  status: string
  difficulty: string

  constructor(public appSettings: ApplicationSettingsService) { }

  ngOnInit(): void {
    this.project = this.defaultProject
    this.isProjectChecked = true
  }

  filterByProperties() {
    if (!this.isAssigneeChecked) {
      this.assignee = ""
    }
    if (!this.isProjectChecked) {
      this.project = ""
    }
    if (!this.isPriorityChecked) {
      this.priority = ""
    }
    if (!this.isStatusChecked) {
      this.status = ""
    }
    if (!this.isDifficultyChecked) {
      this.difficulty = ""
    }
    this.filterProperty.emit({ Assignee: this.assignee, Priority: this.priority, Difficulty: this.difficulty, Status: this.status, Project: this.project });
  }
}