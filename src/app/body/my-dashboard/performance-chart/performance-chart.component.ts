import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AuthService } from 'src/app/services/auth.service';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-performance-chart',
  templateUrl: './performance-chart.component.html',
  styleUrls: ['./performance-chart.component.css']
})
export class PerformanceChartComponent implements OnInit {

  @Input("userEmail") userEmail: string
  @Input("uid") uid: string
  @Input("currentSprint") currentSprintNumber: number

  componentName: string = "PERFORMANCE-CHART"
  showLoader: boolean = true
  sprintRange1: number
  sprintRange2: number
  data: Observable<[]>;

  constructor(private functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService, private backendService: BackendService) { }

  ngOnInit(): void {
    this.sprintRange2 = this.currentSprintNumber
    this.sprintRange1 = this.sprintRange2 - 2
    this.createData();
  }
  async createData() {
    let orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable('performanceChart');
    try {
      this.data = await callable({ mode: "userPerformanceChartData", OrganizationDomain: orgDomain, Assignee: this.userEmail, Uid:this.uid, SprintNumberRange: {'SprintRange1': this.sprintRange1, 'SprintRange2': this.sprintRange2}}).pipe(
        map(actions => {
            return actions.data as [];
        }));
        this.showLoader = false;
    } catch(error) {
      console.log(error);
    }
  }
  onGetRange(rangeData: { sprintRange1: number, sprintRange2: number }) {
    this.showLoader = true
    this.sprintRange1 = rangeData.sprintRange1
    this.sprintRange2 = rangeData.sprintRange2
    if (this.sprintRange2 > this.currentSprintNumber) {
      this.sprintRange2 = this.currentSprintNumber
    }
    this.createData();
  }
}
