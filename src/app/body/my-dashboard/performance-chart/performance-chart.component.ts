import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AuthService } from 'src/app/services/auth.service';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-performance-chart',
  templateUrl: './performance-chart.component.html',
  styleUrls: ['./performance-chart.component.css']
})
export class PerformanceChartComponent implements OnInit {

  @Input("userEmail") userEmail: string
  @Input("currentSprint") currentSprintNumber: number

  componentName: string = "PERFORMANCE-CHART"
  showLoader: boolean = true
  sprintRange1: number
  sprintRange2: number
  data = [];
  sprintNumber: number;
  tasksData: Observable<Tasks[]>

  constructor(private functions: AngularFireFunctions, private authService: AuthService, public db: AngularFirestore, public errorHandlerService: ErrorHandlerService, private backendService: BackendService) { }

  ngOnInit(): void {
    this.sprintRange2 = this.currentSprintNumber
    this.sprintRange1 = this.sprintRange2 - 2
    this.createData().then(data => {
      this.data = data
      this.showLoader = false
    }).catch(error => {
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError");
    });
  }
  async createData() {
    let tempData = []
    for (let index = this.sprintRange1; index <= this.sprintRange2; index++) {
      let storyPoint: number = 0
      await this.readData(index)
        .then(data => {
          storyPoint = data;
          tempData.push(["S" + index, storyPoint]);
        })
        .catch(err => {
          this.errorHandlerService.getErrorCode(this.componentName, "InternalError");
        })
    }
    return tempData;
  }
  async readData(sprintNumber: number) {
    var storyPoint: number = 0;
    let orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable('performanceChart');
    try {
      const result = await callable({ mode: "getUserPerformanceChartData", OrganizationDomain: orgDomain, SprintNumber: sprintNumber, Assignee: this.userEmail}).toPromise();
      storyPoint = result.StoryPoint;
    } catch(error) {
      console.log(error);
    }
    return storyPoint;
  }
  onGetRange(rangeData: { sprintRange1: number, sprintRange2: number }) {
    this.showLoader = true
    this.sprintRange1 = rangeData.sprintRange1
    this.sprintRange2 = rangeData.sprintRange2
    if (this.sprintRange2 > this.currentSprintNumber) {
      this.sprintRange2 = this.currentSprintNumber
    }
    this.createData().then(data => {
      this.data = data
      this.showLoader = false
    }).catch(error => {
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError");
    });
  }
}
