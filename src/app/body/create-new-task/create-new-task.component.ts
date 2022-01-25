import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { FormControl, NgForm } from '@angular/forms';
import { ValidationService } from '../../services/validation/validation.service';
import { ToolsService } from '../../services/tool/tools.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { AuthService } from 'src/app/services/auth.service';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { map, Observable, startWith } from 'rxjs';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';


declare var jQuery:any;

@Component({
  selector: 'app-create-new-task',
  templateUrl: './create-new-task.component.html',
  styleUrls: ['./create-new-task.component.css']
})
export class CreateNewTaskComponent implements OnInit {

  assigneeName = new FormControl();
  filteredOptionsAssignee: Observable<string[]>;

  reporterName = new FormControl();
  filteredOptionsReporter: Observable<string[]>;

  @ViewChild('form') form: NgForm;
  @Output() taskCreated = new EventEmitter<{ completed: boolean }>();

  componentName: string = "CREATE-NEW-TASK";

  childTaskId: string
  title: string
  todayDate: string
  description: string
  // assigneeName: string
  // reporterName: string
  watcherName: string[]
  creatorName : string
  estimatedTime: number
  project: string = null
  priority: string = null
  difficulty: string = null
  status: string = null
  sprintNumber: number
  storyPoint: number
  time: string 
  enableLoader: boolean = false
  valid: boolean = true
  task: Tasks
  teamIds: string[]
  teamMembers: string[] = []
  teamName: string
  statusLabels: string[]
  priorityLabels: string[]
  difficultyLabels: string[]
  type: string[]
  taskType: string
  parentTaskId: string

  constructor(private functions: AngularFireFunctions, public validationService: ValidationService, public toolsService: ToolsService, public errorHandlerService: ErrorHandlerService, private backendService: BackendService, private authService: AuthService, public applicationSetting: ApplicationSettingsService, public popupHandlerService: PopupHandlerService) { }
  ngOnInit(): void {
    this.teamIds=this.backendService.getOrganizationTeamIds();
    this.project = this.authService.getTeamId();
    this.creatorName=this.authService.getUserEmail();
    this.readTeamData(this.project);
    this.todayDate = this.toolsService.date();
    this.time = this.toolsService.time();
    this.parentTaskId = this.popupHandlerService.parentTaskId;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.teamMembers.filter(option => option.toLowerCase().includes(filterValue));
  }

  readTeamData(teamId :string){
    this.applicationSetting.getTeamDetails(teamId).subscribe(team => {
          this.priorityLabels = team.PriorityLabels;
          this.statusLabels = team.StatusLabels;
          this.type = team.Type;
          this.difficultyLabels = team.DifficultyLabels;
          this.teamMembers=team.TeamMembers;
          // this.teamMembers.forEach(element => {
          //   this.userService.checkAndAddToUsersUsingEmail(element);
          // });

          // if(!this.userService.userReady) {
          //   this.userService.fetchUserData().subscribe(()=>{
          //     this.dataReady = true;
          //   });
          // }

          this.teamName=team.TeamName;
          this.sprintNumber = team.CurrentSprintId;

          this.filteredOptionsAssignee = this.assigneeName.valueChanges.pipe(
            startWith(''),
            map((value) => {
              return this._filter(value)
            }),
          );

          this.filteredOptionsReporter = this.reporterName.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value)),
          );
    }); 
  }
  
  selectedAssignee(item) {
    if(item.selected == false) {
      this.assigneeName.setValue("");
      this.close();
    } else {
      this.assigneeName.setValue(item.data);
    }
  }

  selectedReporter(item) {
    if(item.selected == false) {
      this.reporterName.setValue("");
      this.close();
    } else {
      this.reporterName.setValue(item.data);
    }
  }

  async submit() {
    // this.assigneeName = this.toolsService.getEmailString(this.assigneeName);
    // this.reporterName = this.toolsService.getEmailString(this.reporterName);
    let data = [{ label: "title", value: this.title },
    { label: "status", value: this.status },
    { label: "priority", value: this.priority },
    { label: "estimatedTime", value: this.estimatedTime },
    { label: "difficulty", value: this.difficulty },
    { label: "description", value: this.description },
    { label: "creator", value: this.creatorName },
    { label: "project", value: this.teamName },
    { label: "assignee", value: this.assigneeName.value },
    { label: "reporter", value: this.reporterName.value },
    { label: "creationDate", value: this.todayDate },
    { label: "sprintNumber", value: this.sprintNumber },
    { label: "storyPoint", value: this.storyPoint }];

    
    var condition = await (this.validationService.checkValidity(this.componentName, data)).then(res => {
      return res;
    });
    if (condition) {
      console.log("Inputs are valid");
      this.createNewTask();
    }
    else
      console.log("Task not created! Validation error");
  }

  
  async createNewTask() {
    this.enableLoader = true;
    const appKey = this.backendService.getOrganizationAppKey();
    const teamId = this.authService.getTeamId();
    const parentTaskId = this.popupHandlerService.parentTaskId;
    const parentTaskUrl = this.popupHandlerService.parentTaskUrl;
    const callable = this.functions.httpsCallable('tasks/createNewTask');

    try {
      const result = await callable({TeamId: teamId, AppKey: appKey, Title: this.title, Description: this.description, Priority: this.priority, Difficulty: this.difficulty, Creator: this.creatorName, Assignee: this.assigneeName.value, Reporter: this.reporterName.value, EstimatedTime: this.estimatedTime, Status: this.status, Project: this.teamName, SprintNumber: this.sprintNumber, StoryPointNumber: this.storyPoint, CreationDate: this.todayDate, Time: this.time, Uid: this.authService.userAppSetting.uid, Type: this.taskType, ParentTaskId: parentTaskId, ParentTaskUrl: parentTaskUrl }).toPromise();
    } catch (error) {
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError");
      this.enableLoader = false;
    }
    this.close();
  }

  close() {
    jQuery('#createNewTask').modal('hide');
    jQuery('#form').trigger("reset");
    this.taskCreated.emit({ completed: true });
  }

}
