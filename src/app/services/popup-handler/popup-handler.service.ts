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
export class PopupHandlerService {

  createNewSprintEnabled: boolean = false
  createNewTaskEnabled: boolean = false
  scheduleMeetEnabled: boolean = false
  createNewTeamEnabled: boolean = false
  addNewContributorEnabled: boolean = false
  parentTaskId: string = "default"
  parentTaskUrl: string = "default"
  createPostEnabled: boolean = false
  quickNotesTitle: string = ""
  quickNotesDescription: string = ""
  addLabelEnabled: boolean = false
  milestoneId:string = ""
  addMilestoneActive:boolean = true;
  addPrActive:boolean = true;
  addTaskActive:boolean = true;
  requestDemoEnabled:boolean = false;
  constructor() { }

  resetPopUps() {
    this.scheduleMeetEnabled = false
    this.createNewSprintEnabled = false
    this.createNewTaskEnabled = false
    this.addLabelEnabled=false
    this.createNewTeamEnabled = false
    this.addNewContributorEnabled = false
  }

  resetTaskIds() {
    this.parentTaskId = "default"
    this.parentTaskUrl = "default"
    this.quickNotesDescription = ""
    this.quickNotesTitle = ""
    this.milestoneId = ""
  }

}
