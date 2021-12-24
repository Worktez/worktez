import { Component, Input, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-performance-column-chart',
  templateUrl: './performance-column-chart.component.html',
  styleUrls: ['./performance-column-chart.component.css']
})
export class PerformanceColumnChartComponent implements OnInit {

  constructor(public backendService: BackendService, private functions: AngularFireFunctions) { }

  showLoader: boolean = false;
  @Input("userEmail") userEmail: string;
  @Input("currentSprint") currentSprintNumber: number;
  @Input("teamId") teamId: string;
  @Input("teamMembers") teamMembers: string[];
  data: Observable<[]>;
  columnNames: string[];
  teamMember: string;
  sprintRange1: number;
  sprintRange2: number;

  ngOnInit(): void {
    this.showLoader = true;
    this.sprintRange2 = this.currentSprintNumber;
    this.sprintRange1 = this.currentSprintNumber - 4 >= 0 ? this.currentSprintNumber - 4 : 0;
    this.teamMember = 'Team';
    this.getData();
  }

  async getData() {
    let orgDomain = this.backendService.getOrganizationDomain();
    this.columnNames = this.teamMember == "Team" ? ["Sprints", this.teamId] : ["Sprints", this.teamMember];
    const callable = this.functions.httpsCallable('performanceChart/performanceChartData');
    try {
      this.data = await callable({OrganizationDomain: orgDomain, SprintNumberRange: {'SprintRange1': this.sprintRange1, 'SprintRange2': this.sprintRange2}, TeamId: this.teamId, Assignee: this.teamMember}).pipe(
        map(actions => {
          return actions.data as [];
        }));
      this.showLoader = false;
    } catch(error) {
      console.log(error);
    }
  }

  onGetTeamMember(selectedOption) {
    this.showLoader = true;
    this.teamMember = selectedOption.teamMember;
    this.getData();
  }

  onGetRange(range) {
    this.showLoader = true;
    this.sprintRange1 = range.sprintRange1;
    this.sprintRange2 = range.sprintRange2;
    if (this.sprintRange2 > this.currentSprintNumber) {
      this.sprintRange2 = this.currentSprintNumber;
    }
    this.getData();
  }

}
