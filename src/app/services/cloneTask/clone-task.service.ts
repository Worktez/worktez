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
