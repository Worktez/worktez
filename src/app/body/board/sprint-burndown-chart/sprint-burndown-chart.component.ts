import { Component, Input, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { BackendService } from 'src/app/services/backend/backend.service';
import { map } from 'rxjs/internal/operators/map';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

@Component({
  selector: 'app-sprint-burndown-chart',
  templateUrl: './sprint-burndown-chart.component.html',
  styleUrls: ['./sprint-burndown-chart.component.css']
})
export class SprintBurndownChartComponent implements OnInit {

  constructor(public backendService: BackendService, private functions: AngularFireFunctions, public toolsService: ToolsService, public errorHandlerService: ErrorHandlerService) { }
  showLoader: boolean = false;
  totalStoryPoints: number = 0;
  componentName: string = "SPRINT-BURNDOWN-CHART";
  @Input("currentSprint") currentSprintNumber: number;
  @Input("teamId") teamId: string;
  @Input("sprintStartDate") sprintStartDate: any;
  @Input("sprintEndDate") sprintEndDate: any;
  data = [];
  todayDate: string;

  ngOnInit(): void {
    this.todayDate = this.toolsService.date();
    this.getData();
  }

  getData() {
    this.showLoader = true;
    let orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable('tasks/getAllTasks');
    callable({OrgDomain: orgDomain, TeamId: this.teamId, SprintNumber: this.currentSprintNumber}).pipe(map(actions => {
        return actions.data as Tasks[];
    })).subscribe((data)=>{
      if(data) {
        this.setData(data);
      }
    });
  }

  getDatesInRange(startDate, endDate) {
    const date = new Date(startDate.getTime());
  
    const dates = [];
  
    while (date <= endDate) {
      dates.push([new Date(date), 0]);
      date.setDate(date.getDate() + 1);
    }
  
    return dates;
  }
  

  setData(data: Tasks[]) {
    this.data = this.getDatesInRange(this.sprintStartDate, this.sprintEndDate);

    data.forEach(task => {
      this.totalStoryPoints += task.StoryPointNumber;
    });

    this.data.forEach((element, index) => {
      data.forEach(task => {
        let formattedDate;
        if(task.CompletionDate.includes("/")){
          //This condition is added to support the Previous data before the change in the ToolsService, Can be removed in future.
          var dateArray = task.CompletionDate.split("/");
          formattedDate = dateArray[1] + '/' + dateArray[0] + '/' + dateArray[2];
        } else if(task.CompletionDate.includes("-")){
          var dateArray = task.CompletionDate.split("-");
        formattedDate = dateArray[1] + '/' + dateArray[0] + '/' + dateArray[2];
        }
        
        if (task.Status == "Completed" && new Date(formattedDate).toDateString() === element[0].toDateString()) {
          this.totalStoryPoints -= task.StoryPointNumber;
          this.data[index] = [index, this.totalStoryPoints];
        } else {          
          this.data[index] = [index, this.totalStoryPoints];
        }
      })
    });
    this.showLoader = false
  }
}