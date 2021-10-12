import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { ToolsService } from 'src/app/services/tool/tools.service';

@Component({
  selector: 'app-tasks-evaluation',
  templateUrl: './tasks-evaluation.component.html',
  styleUrls: ['./tasks-evaluation.component.css']
})
export class TasksEvaluationComponent implements OnInit {

  constructor(public navbarHandlerService: NavbarHandlerService, private functions: AngularFireFunctions, public backendService: BackendService, public applicationSettingsService: ApplicationSettingsService, public authService: AuthService, public toolsService: ToolsService) { }
  componentName: string = "TASKS-EVALUATION";
  tasks: Tasks[] = [];
  showLoader: boolean;
  selectedTeamId: string;
  todayDate: string;
  time: string;
  teamIds: string[];
  teamCurrentSprint: number;
  filterSprintNumber: number;
  showModalLoader: boolean;

  firstInResultTaskId: string;
  lastInResultTaskId: string;
  prev_strt_at = [];
  pagination_clicked_count = 0;

  disable_next: boolean = false;
  disable_prev: boolean = false;

  ngOnInit(): void {
    this.navbarHandlerService.resetNavbar();
    this.navbarHandlerService.addToNavbar(this.componentName);
    this.todayDate = this.toolsService.date();
    this.time = this.toolsService.time();

    this.authService.afauth.user.subscribe(data => {
      this.authService.userAppSettingObservable.subscribe(data => {
        if (data.SelectedOrgAppKey) {
          this.teamIds = this.backendService.getOrganizationTeamIds();
          this.selectedTeamId = this.authService.getTeamId();
          this.readTasks();   
        }
      });
    });
  }

  async readTasks() {
    this.showLoader = true;
    this.disable_next = true;
    this.disable_prev = true;
    const orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable('tasksEvaluation');
    try {
      const result = await callable({ mode: 'readTasksEvaluationData', OrganizationDomain: orgDomain, TeamId: this.selectedTeamId, PageToLoad: 'initial', SprintNumber: this.filterSprintNumber }).toPromise();
      this.tasks = result.Tasks;
      this.firstInResultTaskId = result.Tasks[0].Id;
      this.lastInResultTaskId = result.Tasks[result.Tasks.length - 1].Id;

      this.prev_strt_at = [];
      this.pagination_clicked_count = 0;
      this.disable_next = false;
      this.disable_prev = true;

      this.prev_strt_at.push(this.firstInResultTaskId);
      this.applicationSettingsService.getTeamDetails(this.selectedTeamId).subscribe(data => {
        this.teamCurrentSprint = data[0].CurrentSprintId;
        this.showLoader = false;
      });
    } catch (error) {
      
    }
  }

  async nextPage() {
    if(!this.disable_next) {
      this.disable_next = true;
      this.showLoader = true;
      const orgDomain = this.backendService.getOrganizationDomain();
      const callable = this.functions.httpsCallable('tasksEvaluation');
      try {
        const result = await callable({ mode: 'readTasksEvaluationData', OrganizationDomain: orgDomain, TeamId: this.selectedTeamId, PageToLoad: 'next', LastInResultTaskId: this.lastInResultTaskId, SprintNumber: this.filterSprintNumber }).toPromise();
        this.tasks = result.Tasks;

        if (!this.tasks.length) {
          this.disable_next = true;
          return;
        }
        this.firstInResultTaskId = result.Tasks[0].Id;
        this.lastInResultTaskId = result.Tasks[result.Tasks.length - 1].Id;

        this.pagination_clicked_count++;
        this.prev_strt_at.push(this.firstInResultTaskId);
        this.disable_next = result.DisableNext;
        this.disable_prev = false;
        this.showLoader = false;
      } catch (error) {
        console.log(error);
      }
    }
  }

  async prevPage() {
    if(!this.disable_prev) {
      this.disable_prev = true;
      this.showLoader = true;
      const orgDomain = this.backendService.getOrganizationDomain();
      const callable = this.functions.httpsCallable('tasksEvaluation');
      try {
        const result = await callable({ mode: 'readTasksEvaluationData', OrganizationDomain: orgDomain, TeamId: this.selectedTeamId, PageToLoad: 'previous', FirstInResultTaskId: this.firstInResultTaskId, StartAt: this.get_prev_startAt(), SprintNumber: this.filterSprintNumber }).toPromise();
        this.tasks = result.Tasks;
        
        this.firstInResultTaskId = result.Tasks[0].Id;
        this.lastInResultTaskId = result.Tasks[result.Tasks.length - 1].Id;
        this.pagination_clicked_count--;
        this.prev_strt_at.forEach(element => {
          if (this.firstInResultTaskId == element) {
            element = null;
          }
        });
        this.disable_prev = result.DisablePrev;
        this.disable_next = false;
        this.showLoader = false;
      } catch (error) {
        console.log(error);
      }
    }
  }

  getSprintName(sprintNumber: number) {
    if (sprintNumber == -2) {
      return "Deleted";
    } else if (sprintNumber == -1) {
      return "Backlog";
    } else {
      return "S" + sprintNumber;
    }
  }

  get_prev_startAt() {
    if (this.prev_strt_at.length > (this.pagination_clicked_count + 1))
      this.prev_strt_at.splice(this.prev_strt_at.length - 2, this.prev_strt_at.length - 1);
    return this.prev_strt_at[this.pagination_clicked_count - 1];
  }

  async moveToCurrentSprint(task: Tasks) {
    this.showLoader = true;
    this.showModalLoader = true;
    const callable = this.functions.httpsCallable('tasks');
    // Move to Current Sprint
    try {
      const appKey = this.backendService.getOrganizationAppKey();
      if (!(task.Status === "Completed") && this.teamCurrentSprint != task.SprintNumber) {
        const result = await callable({ mode: "edit", AppKey: appKey, Id: task.Id, Description: task.Description, Priority: task.Priority, Difficulty: task.Difficulty, Assignee: task.Assignee, EstimatedTime: task.EstimatedTime, Project: task.Project, SprintNumber: this.teamCurrentSprint, StoryPointNumber: task.StoryPointNumber, PreviousId: task.SprintNumber, CreationDate: task.CreationDate, Date: this.todayDate, Time: this.time, ChangedData: "", Uid: this.authService.user.uid }).toPromise();

        this.readTasks();
        this.showModalLoader = false;
        this.showLoader = false;
      }
      else {
        console.log("Task is Completed , Cannot Update");
      }
    } catch (error) {
      this.showLoader = false;
    }
  }
}
