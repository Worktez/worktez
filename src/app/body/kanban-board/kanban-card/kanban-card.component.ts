import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-kanban-card',
  templateUrl: './kanban-card.component.html',
  styleUrls: ['./kanban-card.component.css']
})
export class KanbanCardComponent implements OnInit {

  @Input('task') task: Tasks
  taskIdToEdit: string = "";
  fieldToEdit: string = "";


  priorityLabels: string[];
  difficultyLabels: string[];
  showLoader: boolean = false;
  todayDate: string;
  time: string;
  constructor(private authService: AuthService, private router: Router, private toolsService: ToolsService, public applicationSettingsService: ApplicationSettingsService, private backendService: BackendService, private functions: AngularFireFunctions ) { }

  ngOnInit(): void {

    this.priorityLabels = this.applicationSettingsService.priority;
    this.difficultyLabels = this.applicationSettingsService.difficulty;
    this.todayDate = this.toolsService.date();
    this.time = this.toolsService.time();
  }

  openTaskDetails(id: string) {
    this.router.navigate(['/TaskDetails', id]);
  }

  showEditTask(taskId: string, fieldToEdit: string) {
    this.taskIdToEdit = taskId;
    this.fieldToEdit = fieldToEdit;
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

}
