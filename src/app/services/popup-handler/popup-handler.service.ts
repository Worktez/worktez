import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupHandlerService {

  createNewSprintEnabled: boolean = false
  createNewTaskEnabled: boolean = false
  createNewTeamEnabled: boolean = false
  updateTeamEnabled: boolean = false
  updateTeamId: string
  addNewContributorEnabled: boolean = false
  parentTaskId: string = "default"
  parentTaskUrl: string = "default"
  createPostEnabled: boolean = false
  
  constructor() { }

  resetPopUps() {
    this.createNewSprintEnabled = false
    this.createNewTaskEnabled = false
    this.createNewTeamEnabled = false
    this.addNewContributorEnabled = false
  }

  resetTaskIds() {
    this.parentTaskId = "default"
    this.parentTaskUrl = "default"
  }

}
