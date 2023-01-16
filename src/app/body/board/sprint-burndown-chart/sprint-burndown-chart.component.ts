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
  showLoader: boolean = true;
  totalStoryPoints: number = 0;
  componentName: string = "SPRINT-BURNDOWN-CHART";
  @Input("currentSprint") currentSprintNumber: number;
  @Input("teamId") teamId: string;
  @Input("sprintStartDate") sprintStartDate: any;
  @Input("sprintEndDate") sprintEndDate: any;
  @Input("sprintNumber") sprintNumber: any;
  data = [];

  ngOnInit(): void {
    this.getChartData();
  }

  getChartData() {
    let orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable('performanceChart/getSprintBurndownChart');

      callable({OrganizationDomain: orgDomain, TeamId: this.teamId, SprintNumber: this.currentSprintNumber}).pipe(
        map(actions => {
            const data= actions.data as [];
            return data
        })).subscribe({
          next: (data) => {
            this.data=data;
            this.data.forEach((element, index) => {
              this.data[index] = [index, element]
            })
            // this.showLoader = false;
          },
          error: (error) => {
            this.errorHandlerService.showError = true;
            this.showLoader = false;
            this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
            console.error(error);
          },
          complete: () => 
          {
            console.info('Getting Sprint Burndown data successful');
            this.showLoader = false;
          }
        });
  }
}