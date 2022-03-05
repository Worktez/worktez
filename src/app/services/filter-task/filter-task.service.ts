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
