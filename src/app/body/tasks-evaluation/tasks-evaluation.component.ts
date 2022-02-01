import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { Sprint } from 'src/app/Interface/TeamInterface';
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
  sprints: Sprint[] = [];
  showLoader: boolean;
  selectedTeamId: string;
  selectedTeamName: string;
  todayDate: string;
  time: string;
  teamIds: string[];
  teamCurrentSprint: number;
  sprintRange2: number;
  sprintRange1: number;

  lastInResultSprintId: number;

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
                this.selectedTeamName = data.TeamName;
                this.getAllSprints();
                this.readTasks(); 
              });
          });
        }
      });
    });
  }

  async readTasks() {
    this.showLoader = true;
    const orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable('tasksEvaluation/readTasksEvaluationData');
    try {
      const result = await callable({OrganizationDomain: orgDomain, TeamId: this.selectedTeamId, PageToLoad: 'initial', SprintRange1: this.sprintRange1, SprintRange2: this.sprintRange2 }).toPromise();
      this.tasks = result.Tasks;
      console.log(this.tasks);

    } catch (error) {
      
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

  async getAllSprints() {
    const callable = this.functions.httpsCallable('sprints/getAllSprints');
    const orgDomain = this.backendService.getOrganizationDomain();
    try {
      const result = await callable({OrgDomain: orgDomain, TeamName: this.selectedTeamName}).toPromise();
      const data = result.sprints as Sprint[];
      this.sprints = data;
      this.sprints.sort((a, b) => {
        return b.SprintNumber - a.SprintNumber;
      });
      this.sprintRange2 = this.sprints[0].SprintNumber
      if (this.sprintRange2 < 4) {
        this.sprintRange1 = 1;
      } else {
        this.sprintRange1 = this.sprintRange2 - 3
      }
      console.log(this.sprintRange1);
      console.log(this.sprintRange2);
    } catch (error) {

    }
  }

  async moveToCurrentSprint(task: Tasks) {
    this.showLoader = true;
    const callable = this.functions.httpsCallable('tasks/editTask');
    // Move to Current Sprint
    try {
      const appKey = this.backendService.getOrganizationAppKey();
      if (!(task.Status === "Completed") && this.teamCurrentSprint != task.SprintNumber) {
        const result = await callable({AppKey: appKey, Id: task.Id, Description: task.Description, Priority: task.Priority, Difficulty: task.Difficulty, Assignee: task.Assignee, EstimatedTime: task.EstimatedTime, Project: task.Project, SprintNumber: this.teamCurrentSprint, StoryPointNumber: task.StoryPointNumber, PreviousId: task.SprintNumber, CreationDate: task.CreationDate, Date: this.todayDate, Time: this.time, ChangedData: "", Uid: this.authService.user.uid }).toPromise();

        this.readTasks();
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
