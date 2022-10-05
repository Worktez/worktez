import { Component, Input, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ToolsService } from 'src/app/services/tool/tools.service';

@Component({
  selector: 'app-task-ecard',
  templateUrl: './task-ecard.component.html',
  styleUrls: ['./task-ecard.component.css']
})
export class TaskECardComponent implements OnInit {

  @Input("task") task: Tasks
  taskIdToEdit: string = "";
  fieldToEdit: string = "";

  statusLabels: string[];
  priorityLabels: string[];
  difficultyLabels: string[];
  teamMembers: string[];
  todayDate: string;
  time: string;

  assigneeName = new UntypedFormControl();
  filteredOptionsAssignee: Observable<string[]>;

  showLoader: boolean = false;

  constructor(private authService: AuthService, private toolsService: ToolsService, private functions: AngularFireFunctions, private router: Router, public applicationSettingsService: ApplicationSettingsService, private backendService: BackendService) { }

  ngOnInit(): void {
    this.statusLabels = this.applicationSettingsService.status;
    this.priorityLabels = this.applicationSettingsService.priority;
    this.difficultyLabels = this.applicationSettingsService.difficulty;
    this.teamMembers = this.applicationSettingsService.team.TeamMembers;
    this.todayDate = this.toolsService.date();
    this.time = this.toolsService.time();

    this.filteredOptionsAssignee = this.assigneeName.valueChanges.pipe(
      startWith(''),
      map((value) => {
        return this._filter(value)
      }),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.teamMembers.filter(option => option.toLowerCase().includes(filterValue));
  }

  showEditTask(taskId: string, fieldToEdit: string) {
    this.taskIdToEdit = taskId;
    this.fieldToEdit = fieldToEdit;
  }

  openTaskDetails(id: string) {
    this.router.navigate(['/TaskDetails', id]);
  }

  clickOut(){
    this.taskIdToEdit="";
  }

  editTask(task: Tasks, sprintNumber: number) {
    this.showLoader = true;
    let result;
    if (sprintNumber == null) {
      sprintNumber = task.SprintNumber;
    }
    const appKey = this.backendService.getOrganizationAppKey();
    const callable = this.functions.httpsCallable('tasks/editTask');
    callable({Title: task.Title, Status: task.Status, AppKey: appKey, Id: task.Id, Description: task.Description, Priority: task.Priority, Difficulty: task.Difficulty, Assignee: task.Assignee, EstimatedTime: task.EstimatedTime, Project: task.Project, SprintNumber: sprintNumber, StoryPointNumber: task.StoryPointNumber, OldStoryPointNumber: task.StoryPointNumber, PreviousId: task.SprintNumber, CreationDate: task.CreationDate, Date: this.todayDate, Time: this.time, ChangedData: "", Uid: this.authService.user.uid, Type:task.Type, Reporter: task.Reporter}).subscribe({
      next: (data) => {
        result = data;
        if (result == "OK") {
          this.taskIdToEdit = "";
          task.LastUpdatedDate = this.todayDate;
          this.showLoader = false;
        }
      },
      error: (error) => {
        this.showLoader = false;
      },
      complete: () => console.info("task edited successfully!")
    });
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
