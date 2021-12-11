import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-filter-task',
  templateUrl: './filter-task.component.html',
  styleUrls: ['./filter-task.component.css']
})
export class FilterTaskComponent implements OnInit {

  @Output() filterProperty = new EventEmitter<{ Assignee: string, Priority: string, Difficulty: string, Status: string, Project: string, Sprint: number }>();
  @Input("defaultProject") defaultProject: string
  @Input("currentSprintNumber") currentSprintNumber: number
  isAssigneeChecked: boolean
  isDifficultyChecked: boolean
  isPriorityChecked: boolean
  isStatusChecked: boolean
  isProjectChecked: boolean
  isSprintChecked: boolean

  assignee: string
  project: string
  priority: string
  status: string
  difficulty: string
  sprint: number
  showLoader: boolean = false;

  constructor(public appSettings: ApplicationSettingsService, public backendService: BackendService) { }

  ngOnInit(): void {
    this.project = this.defaultProject
    this.onProjectChange();
    //this.isProjectChecked = true
  }

  onProjectChange() {
    this.showLoader = true;
    this.appSettings.getTeamDetails(this.project).subscribe(data => {
      this.showLoader = false;
    });
  }

  filterByProperties() {
    if (!this.isAssigneeChecked) {
      this.assignee = ""
    }
    if (!this.isProjectChecked) {
      this.project = this.defaultProject
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
    if (!this.isSprintChecked) {
      this.sprint = this.currentSprintNumber
    }
    this.filterProperty.emit({ Assignee: this.assignee, Priority: this.priority, Difficulty: this.difficulty, Status: this.status, Project: this.project, Sprint: this.sprint });
  }
}