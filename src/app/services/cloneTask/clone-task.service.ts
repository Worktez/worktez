import { Injectable } from '@angular/core';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CloneTaskService {

  task: Tasks;
  emptytask: Tasks;
  constructor(private router: Router) { }
  getCloneTask(cloneTask: Tasks){
    this.task = cloneTask;
    this.router.navigate(['/CreateNewSession']);
  }
  getCloneData(){
    return this.task;
  }
  resetTask(){
    this.task = this.emptytask;
  }
}
