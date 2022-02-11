import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { Sprint } from 'src/app/Interface/TeamInterface';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-tasks-evaluation',
  templateUrl: './tasks-evaluation.component.html',
  styleUrls: ['./tasks-evaluation.component.css']
})
export class TasksEvaluationComponent implements OnInit {

  constructor(public navbarHandlerService: NavbarHandlerService, private functions: AngularFireFunctions, public backendService: BackendService, public applicationSettingsService: ApplicationSettingsService, public authService: AuthService, public toolsService: ToolsService, public errorHandlerService: ErrorHandlerService) { }
  componentName: string = "TASKS-EVALUATION";
  tasks = [];
  sprints: Sprint[] = []
  showLoader: boolean;
  selectedTeamId: string;
  selectedTeamName: string;
  todayDate: string;
  time: string;
  teamIds: string[];
  statusLabels: string[];
  priorityLabels: string[];
  difficultyLabels: string[];
  teamMembers: string[];
  teamCurrentSprint: number;
  disableLoadMore: boolean = false;
  taskIdToEdit: string = "";
  fieldToEdit: string = "";

  assigneeName = new FormControl();
  filteredOptionsAssignee: Observable<string[]>;

  nextSprintTasksToFetch: number;

  ngOnInit(): void {
    this.navbarHandlerService.resetNavbar();
    this.navbarHandlerService.addToNavbar(this.componentName);
    this.todayDate = this.toolsService.date();
    this.time = this.toolsService.time();

    this.authService.afauth.user.subscribe(data => {
      this.authService.userAppSettingObservable.subscribe(data => {
        if (data.SelectedOrgAppKey) {
          this.backendService.organizationsData.subscribe(data => {
              this.teamIds = this.backendService.getOrganizationTeamIds();
              this.selectedTeamId = this.authService.getTeamId();
              this.applicationSettingsService.getTeamDetails(this.selectedTeamId).subscribe(data => {
                this.teamCurrentSprint = data.CurrentSprintId;
                this.nextSprintTasksToFetch = this.teamCurrentSprint;
                this.selectedTeamName = data.TeamName;
                this.statusLabels = data.StatusLabels;
                this.priorityLabels = data.PriorityLabels;
                this.difficultyLabels = data.DifficultyLabels;
                this.teamMembers = data.TeamMembers;

                this.filteredOptionsAssignee = this.assigneeName.valueChanges.pipe(
                  startWith(''),
                  map((value) => {
                    return this._filter(value)
                  }),
                );
                this.readTasks(); 
              });
          });
        }
      });
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.teamMembers.filter(option => option.toLowerCase().includes(filterValue));
  }

  async readTasks() {
    console.log(this.nextSprintTasksToFetch)
    this.showLoader = true;
    const orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable('tasksEvaluation/readTasksEvaluationData');
    try {
      let result;
      if (this.nextSprintTasksToFetch == this.teamCurrentSprint) {
        result = await callable({OrganizationDomain: orgDomain, TeamId: this.selectedTeamId, PageToLoad: 'initial', SprintNumber: this.teamCurrentSprint }).toPromise();
      } else {
        result = await callable({OrganizationDomain: orgDomain, TeamId: this.selectedTeamId, PageToLoad: 'loadMore', SprintNumber: this.nextSprintTasksToFetch }).toPromise();
      }
      if (result.BacklogTasks.length > 0) {
        this.tasks.push(result.BacklogTasks);
      }
      this.tasks.push(result.Tasks);
      this.nextSprintTasksToFetch -= 1;
      if (this.nextSprintTasksToFetch < 1) {
        // disable load more
        this.disableLoadMore = true;
      }
      this.showLoader = false;
    } catch (error) {
      this.errorHandlerService.showError = true;
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
    }
  }

  getSprintName(sprintNumber: number) {
    if (sprintNumber == -2) {
      return "Deleted";
    } else if (sprintNumber == -1) {
      return "Backlog";
    } else {
      return "Sprint " + sprintNumber;
    }
  }

  async editTask(task: Tasks, sprintNumber: number) {
    this.showLoader = true;
    if (sprintNumber == null) {
      sprintNumber = task.SprintNumber;
    }
    try {
        const appKey = this.backendService.getOrganizationAppKey();
        const callable = this.functions.httpsCallable('tasks/editTask');
        const result = await callable({Title: task.Title, Status: task.Status, AppKey: appKey, Id: task.Id, Description: task.Description, Priority: task.Priority, Difficulty: task.Difficulty, Assignee: task.Assignee, EstimatedTime: task.EstimatedTime, Project: task.Project, SprintNumber: sprintNumber, StoryPointNumber: task.StoryPointNumber, OldStoryPointNumber: task.StoryPointNumber, PreviousId: task.SprintNumber, CreationDate: task.CreationDate, Date: this.todayDate, Time: this.time, ChangedData: "", Uid: this.authService.user.uid, Type:task.Type, Reporter: task.Reporter}).toPromise();
        if (result == "OK") {
          this.taskIdToEdit = "";
          task.LastUpdatedDate = this.todayDate;
          task.SprintNumber = sprintNumber;
          this.showLoader = false;
        }
      } catch (error) {
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        this.showLoader = false;
      }
  } 

  onDrop(event: CdkDragDrop<Tasks[]>) {
    this.showLoader = true;
    console.log(event.previousContainer === event.container);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.showLoader = false;
    } else {
      // move to the dragged sprint
      this.editTask(event.previousContainer.data[event.previousIndex], event.container.data[0].SprintNumber).then(() => {
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
          this.tasks = this.tasks.filter(arr => arr.length > 0);
          this.showLoader = false;
      });
    }
  }

  showEditTask(taskId: string, fieldToEdit: string) {
    this.taskIdToEdit = taskId;
    this.fieldToEdit = fieldToEdit;
  }

  selectedAssignee(item, task: Tasks) {
    if(item.selected == false) {
      this.assigneeName.setValue("");
      this.taskIdToEdit = "";
    } else {
      this.assigneeName.setValue(item.data);
      task.Assignee = this.assigneeName.value;
      this.editTask(task, null);
    }
  }
}
