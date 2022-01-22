import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Tasks, Link } from 'src/app/Interface/TasksInterface';
import { CloneTaskService } from 'src/app/services/cloneTask/clone-task.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToolsService } from '../../services/tool/tools.service';
import { Location } from '@angular/common';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { Activity } from 'src/app/Interface/ActivityInterface';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { PopupHandlerService } from '../../services/popup-handler/popup-handler.service';


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
  linkEnabled: boolean = false
  createNewTaskEnabled: boolean = false;
  // subtaskEnabled: boolean = false;
  userLoggedIn: boolean = false
  showContent: boolean = false;
  activeAllBtn: boolean = false
  activeLogWorkBtn: boolean = false
  activeCommentBtn: boolean = false
  activeEditBtn: boolean = false
  task: Tasks
  todayDate: string
  time: string
  assignee: string
  creator: string
  watcherList: string[] =[]
  orgDomain: string
  actionType: string = "All"
  comment: string;
  url: string;

  dataReady: boolean = false

  public taskDataObservable: Observable<Tasks>
  activityData: Observable<Activity[]>
  linkData: Observable<Link[]>

  constructor ( public startService: StartServiceService, private applicationSettingService: ApplicationSettingsService, private route: ActivatedRoute, private functions: AngularFireFunctions, public authService: AuthService, private location: Location, public toolsService: ToolsService, private navbarHandler: NavbarHandlerService, public errorHandlerService: ErrorHandlerService, private backendService: BackendService, public cloneTask: CloneTaskService,public userService:UserServiceService,public popupHandlerService: PopupHandlerService ) { }

  ngOnInit (): void {
    this.todayDate = this.toolsService.date();
    this.time = this.toolsService.time();

    this.Id = this.route.snapshot.params[ 'taskId' ];
    this.url = window.location.href;

    this.backendService.selectedTaskId = this.Id;

    this.navbarHandler.addToNavbar( this.Id );
    this.getTaskPageData();
    
    // this.authService.afauth.user.subscribe(data => {
    //   this.authService.userAppSettingObservable.subscribe(data => {
    //     if (data.SelectedOrgAppKey) {
    //       this.backendService.organizationsData.subscribe(data => {
    //         this.orgDomain = this.backendService.getOrganizationDomain();
    //         this.getTaskDetail();
    //         this.getActivityData();
    //         this.getLinkData();
    //         this.activeAllBtn = true;
    //       });
    //     }
    //   });
    // });
  }

  getTaskPageData(){
    if(this.startService.showTeams) {
      this.orgDomain = this.backendService.getOrganizationDomain();
      this.getTaskDetail();
      this.getActivityData();
      this.getLinkData();
      this.activeAllBtn = true;
    } else {
      this.startService.startApplication();
      this.startService.userDataStateObservable.subscribe((data) => {
        if(data){
          this.orgDomain = this.backendService.getOrganizationDomain();
          this.getTaskDetail();
          this.getActivityData();
          this.getLinkData();
          this.activeAllBtn = true;
        }
      });
    }
  }

  selectedAssignee(item) {
    console.log(item);
  }

  getTaskDetail () {
    const callable = this.functions.httpsCallable('tasks/getTaskDetails');
    this.taskDataObservable = callable({Id: this.Id, OrgDomain: this.orgDomain}).pipe(map(res => {
        const data = res.taskData as Tasks;
        this.task = data;

        if(this.userService.emails.indexOf(this.task.Assignee) == -1) {
          this.userService.emails.push(this.task.Assignee);
          this.userService.userReady = false;
        }
        if(this.userService.emails.indexOf(this.task.Reporter) == -1) {
          this.userService.emails.push(this.task.Reporter);
          this.userService.userReady = false;
        }
        if(this.userService.emails.indexOf(this.task.Creator) == -1) {
          this.userService.emails.push(this.task.Creator);
          this.userService.userReady = false;
        }

        this.userService.fetchUserData().subscribe(()=>{
          this.dataReady = true;
        });

        this.applicationSettingService.getTeamDetails(data.TeamId);

        return { ...data }
    }));
  }

  async getActivityData () {
    const callable = this.functions.httpsCallable("activity/getActivity");
    this.activityData = callable({OrgDomain: this.orgDomain, TaskId: this.Id, ActionType: this.actionType }).pipe(
      map(actions => {
        return actions.data as Activity[];
    }));
  }

  async getLinkData() {
    const callable = this.functions.httpsCallable("linker/getLink");
    this.linkData = callable({OrgDomain: this.orgDomain, TaskId: this.Id }).pipe(
      map(actions => {
        return actions.data as Link[];
    }));
  }

  async addComment() {
    const callable = this.functions.httpsCallable('tasks/comment');
    const appKey = this.backendService.getOrganizationAppKey();

    try {
      const result = await callable({ AppKey: appKey, Assignee: this.task.Assignee, LogTaskId: this.task.Id, LogWorkComment: this.comment, Date: this.todayDate, Time: this.time, Uid: this.authService.user.uid }).toPromise();
      
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

  addLink() {
    this.linkEnabled = true;
  }

  addSubtask(){
    this.popupHandlerService.createNewTaskEnabled= true;  
    this.popupHandlerService.parentTaskId = this.Id;
    this.popupHandlerService.parentTaskUrl = this.url;
    // this.createNewTaskEnabled = true;
    // this.subtaskEnabled = true;
    // this.popupHandlerService.createNewTaskEnabled= true;
  }

  logWorkCompleted ( data: { completed: boolean } ) {
    this.getTaskPageData();
    this.logWorkEnabled = false;
  }

  editTaskCompleted ( data: { completed: boolean } ) {
    this.editTaskEnabled = false;
  }

  deleteTaskCompleted ( data: { completed: boolean } ) {
    this.deleteTaskEnabled = false;
  }

  addedLink( data: { completed: boolean } ) {
    this.linkEnabled = false;
  }

  // addedSubtask( data: { completed: boolean } ) {
  //   this.subtaskEnabled = false;
  // }

  async reopenTask () {
    const callable = this.functions.httpsCallable( 'tasks/log' );
    const appKey = this.backendService.getOrganizationAppKey();

    try {
      const result = await callable( {AppKey: appKey, SprintNumber: this.task.SprintNumber, LogTaskId: this.task.Id, LogHours: 0, LogWorkDone: this.task.WorkDone, LogWorkStatus: "Ready to start", LogWorkComment: "Reopening", Date: this.todayDate, Time: this.time, Uid: this.authService.user.uid } ).toPromise();
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
}
