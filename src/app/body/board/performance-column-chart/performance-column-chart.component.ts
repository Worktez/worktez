import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-performance-column-chart',
  templateUrl: './performance-column-chart.component.html',
  styleUrls: ['./performance-column-chart.component.css']
})
export class PerformanceColumnChartComponent implements OnInit {

  constructor(public db: AngularFirestore, public backendService: BackendService, private functions: AngularFireFunctions) { }

  showLoader: boolean = false;
  @Input("userEmail") userEmail: string;
  @Input("currentSprint") currentSprintNumber: number;
  @Input("teamId") teamId: string;
  @Input("teamMembers") teamMembers: string[];
  data = [];
  columnNames: string[];
  teamMember: string;
  sprintRange1: number;
  sprintRange2: number;

  ngOnInit(): void {
    this.showLoader = true;
    this.sprintRange2 = this.currentSprintNumber;
    this.sprintRange1 = 0;
    this.teamMember = 'Team';
    this.getData().then(data => {
      this.data = data;
      this.showLoader = false;
    });
  }

  async getData() {
    let temp = [];
    if (this.teamMember == 'Team') {
      for (let i = this.sprintRange1; i <= this.sprintRange2; i++) {
        await this.readTeamData(i, this.teamId).then(data => {
          temp.push(["S" + i, data]);
        }).catch(err => {
          console.log(err);
        });
        this.columnNames = ["Sprints", this.teamId];
      }
    } else {
      for (let i = this.sprintRange1; i <= this.sprintRange2; i++) {
        await this.readMemberData(i, this.teamMember, this.teamId).then(data => {
          temp.push(["S" + i, data]);
        }).catch(err => {
          console.log(err);
        });
        this.columnNames = ["Sprints", this.teamMember];
      }
    }
    return temp;
  }

  async readTeamData(sprintNumber: number, teamId: string) {
    var storyPoint: number = 0;
    let orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable('performanceChart');
    try {
      const result = await callable({ mode: "performanceChartData", OrganizationDomain: orgDomain, SprintNumber: sprintNumber, TeamId: teamId}).toPromise();
      storyPoint = result.StoryPoint;
    } catch(error) {
      console.log(error);
    }
    return storyPoint;
  }

  async readMemberData(sprintNumber: number, teamMember: string, teamId: string) {
    var storyPoint: number = 0;
    let orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable('performanceChart');
    try {
      const result = await callable({ mode: "performanceChartData", OrganizationDomain: orgDomain, SprintNumber: sprintNumber, TeamId: teamId, Assignee: teamMember}).toPromise();
      storyPoint = result.StoryPoint;
    } catch(error) {
      console.log(error);
    }
    return storyPoint;
  }

  onGetTeamMember(selectedOption) {
    this.showLoader = true;
    console.log(selectedOption.teamMember);
    this.teamMember = selectedOption.teamMember;
    this.getData().then(data => {
      this.data = data;
      this.showLoader = false;
    });
  }

  onGetRange(range) {
    this.showLoader = true;
    this.sprintRange1 = range.sprintRange1;
    this.sprintRange2 = range.sprintRange2;
    if (this.sprintRange2 > this.currentSprintNumber) {
      this.sprintRange2 = this.currentSprintNumber;
    }
    this.getData().then(data => {
      this.data = data;
      this.showLoader = false;
    });
  }

}
