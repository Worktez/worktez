import { Injectable } from '@angular/core';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { Router } from '@angular/router';
import { PopupHandlerService } from '../popup-handler/popup-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CloneTaskService {

  task: Tasks;
  emptytask: Tasks;
  constructor(private router: Router, public popupHandlerService: PopupHandlerService) { }
  getCloneTask(cloneTask: Tasks){
    this.task = cloneTask;
    this.popupHandlerService.createNewTaskEnabled= true;
  }
  getCloneData(){
    return this.task;
  }
  resetTask(){
    this.task = this.emptytask;
  }
}
