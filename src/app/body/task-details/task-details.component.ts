import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { CloneTaskService } from 'src/app/services/cloneTask/clone-task.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToolsService } from '../../services/tool/tools.service';
import { Location } from '@angular/common';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { Activity } from 'src/app/Interface/ActivityInterface';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';

@Component( {
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: [ './task-details.component.css' ]
} )
export class TaskDetailsComponent implements OnInit {

  componentName: string = "TASK-DETAILS"

  sprintName: string
  Id: string
  logWorkEnabled: boolean = false
  editTaskEnabled: boolean = false
  deleteTaskEnabled: boolean = false
  userLoggedIn: boolean = false
  showContent: boolean = false;
  activeAllBtn: boolean = false
  activeLogWorkBtn: boolean = false
  activeCommentBtn: boolean = false
  activeEditBtn: boolean = false
  task: Tasks
  todayDate: string
  time: string
  orgDomain: string
  actionType: string = "All"
  comment: string;
  priorityLabels: string[];
  statusLabels: string[];
  difficultyLabels: string[];


  public taskDataObservable: Observable<Tasks>
  activityData: Observable<Activity[]>

  constructor ( private route: ActivatedRoute, public db: AngularFirestore, private functions: AngularFireFunctions, public authService: AuthService, private location: Location, public toolsService: ToolsService, private navbarHandler: NavbarHandlerService, public errorHandlerService: ErrorHandlerService, private backendService: BackendService, public cloneTask: CloneTaskService, private applicationSettingsService: ApplicationSettingsService  ) { }

  ngOnInit (): void {
    this.todayDate = this.toolsService.date();
    this.time = this.toolsService.time();

    this.Id = this.route.snapshot.params[ 'taskId' ];

    this.backendService.selectedTaskId = this.Id;

    this.navbarHandler.addToNavbar( this.Id );

    this.authService.afauth.user.subscribe(data => {
      this.authService.userAppSettingObservable.subscribe(data => {
        if (data.SelectedOrgAppKey) {
          this.backendService.organizationsData.subscribe(data => {
            this.orgDomain = this.backendService.getOrganizationDomain();
            this.getTaskDetail();
            this.getActivityData();
            this.getLabels();
            this.activeAllBtn = true;
          });
        }
      });
    });
  }

  getTaskDetail () {
     const callable = this.functions.httpsCallable('tasks');
     this.taskDataObservable = callable({ mode: "getTaskDetails", Id: this.Id, OrgDomain: this.orgDomain}).pipe(map(res => {
         const data = res.taskData as Tasks;
         this.task = data;
         return { ...data }
      }));
  }

  async getActivityData () {
    const callable = this.functions.httpsCallable("activity");
    this.activityData = callable({mode: "getActivity", OrgDomain: this.orgDomain, TaskId: this.Id, ActionType: this.actionType }).pipe(
      map(actions => {
        return actions.data as Activity[];
    }));
  }

  async addComment() {
    const callable = this.functions.httpsCallable('tasks');
    const appKey = this.backendService.getOrganizationAppKey();

    try {
      const result = await callable({ mode: "comment", AppKey: appKey, LogTaskId: this.task.Id, LogWorkComment: this.comment, Date: this.todayDate, Time: this.time, Uid: this.authService.user.uid }).toPromise();

      this.comment = "";
      return;
    } catch (error) {
      this.errorHandlerService.getErrorCode("COMMENT", "InternalError");
      console.log("Error", error);
    }
  }

  CloneTaskPage () {
    this.cloneTask.getCloneTask( this.task );
  }

  logWorkPage () {
    this.logWorkEnabled = true;
  }

  editTask () {
    this.editTaskEnabled = true;
  }

  deleteTask () {
    this.deleteTaskEnabled = true;
  }

  logWorkCompleted ( data: { completed: boolean } ) {
    this.logWorkEnabled = false;
  }

  editTaskCompleted ( data: { completed: boolean } ) {
    this.editTaskEnabled = false;
  }

  deleteTaskCompleted ( data: { completed: boolean } ) {
    this.deleteTaskEnabled = false;
  }

  async reopenTask () {
    const callable = this.functions.httpsCallable( 'tasks' );
    const appKey = this.backendService.getOrganizationAppKey();

    try {
      const result = await callable( { mode: "log", AppKey: appKey, SprintNumber: this.task.SprintNumber, LogTaskId: this.task.Id, LogHours: 0, LogWorkDone: this.task.WorkDone, LogWorkStatus: "Ready to start", LogWorkComment: "Reopening", Date: this.todayDate, Time: this.time, Uid: this.authService.user.uid } ).toPromise();
      return;
    } catch ( error ) {
      this.errorHandlerService.getErrorCode( "LOGWORK", "InternalError" );
      console.log( "Error", error );
    }
  }

  backToTasks () {
    this.location.back()
  }

  changeType ( actionType: string ) {
    this.actionType = actionType
    this.getActivityData();
    if( this.actionType == "All" ) {
      this.activeEditBtn = false;
      this.activeLogWorkBtn = false;
      this.activeAllBtn = true;
      this.activeCommentBtn = false;
    } else if ( this.actionType == "LOGWORK_COMMENT") {
      this.activeAllBtn = false;
      this.activeEditBtn = false;
      this.activeLogWorkBtn = true;
      this.activeCommentBtn = false;
    } else if ( this.actionType == "EDITED") {
      this.activeAllBtn = false;
      this.activeLogWorkBtn = false;
      this.activeEditBtn = true;
      this.activeCommentBtn = false;
    } else if ( this.actionType == "COMMENT") {
      this.activeAllBtn = false;
      this.activeLogWorkBtn = false;
      this.activeEditBtn = false;
      this.activeCommentBtn = true;
    }
  }

  getLabels() {
    const teamId = this.authService.getTeamId();
    this.applicationSettingsService.getTeamDetails(teamId).subscribe(data => {
      this.statusLabels = data[0].StatusLabels;
      this.priorityLabels = data[0].PriorityLabels;
      this.difficultyLabels = data[0].DifficultyLabels;
    });
  }
}
