import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Tasks } from 'src/app/Interface/TasksInterface';
import { CloneTaskService } from 'src/app/services/cloneTask/clone-task.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToolsService } from '../../../services/tool/tools.service';
import { Location } from '@angular/common';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { Activity, ActivityId } from 'src/app/Interface/ActivityInterface';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent implements OnInit {
  @Input('task') task: Tasks
  @Output() editTaskCompleted = new EventEmitter<{ completed: boolean }>();

  componentName: string = "TASK-DETAILS"
  
  sprintName: string
  Id: string
  logWorkEnabled: boolean = false
  editTaskEnabled: boolean = false
  userLoggedIn: boolean = false
  // task: Tasks
  todayDate: string
  time: string
  orgDomain: string
  showClose: boolean = false;
  enableLoader: boolean = false;



  constructor(private route: ActivatedRoute, public db: AngularFirestore, private router: Router, private functions: AngularFireFunctions, public authService: AuthService, private location: Location, public toolsService: ToolsService, private navbarHandler: NavbarHandlerService, public errorHandlerService: ErrorHandlerService, private backendService: BackendService, public cloneTask: CloneTaskService) { }

  ngOnInit(): void {
  }

  async deleteTask() {
    this.enableLoader = true;
    const callable = this.functions.httpsCallable('tasks');
    const appKey = this.backendService.getOrganizationAppKey();
    try {
      const result = await callable({ mode: "delete", AppKey: appKey, Id: this.task.Id, SprintNumber: this.task.SprintNumber, Project: this.task.Project, Status: this.task.Status, Date: this.todayDate, Time: this.time }).toPromise();
      console.log(this.task.Id + " deleted");
      console.log(result);
      this.router.navigate(['/']);
    } catch (error) {
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError");
      console.log("Error", error);
    }
    location.reload();

    
  }

  backToTasks() {
    this.location.back();
  }

}