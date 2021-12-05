import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterTaskService {

  filterAssignee: string = ""
  filterPriority: string = ""
  filterDifficulty: string = ""
  filterStatus: string = ""
  filterProject: string = ""
  filterSprintNumber: number = 0

  constructor() { }

  saveFilterData(Assignee, Project, Priority, Difficulty, Status, SprintNumber) {
    this.filterAssignee = Assignee
    this.filterProject = Project
    this.filterPriority = Priority
    this.filterDifficulty = Difficulty
    this.filterStatus = Status
    this.filterSprintNumber = SprintNumber
  }
}
