import { Component, Input, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-sprint-evaluation-graph',
  templateUrl: './sprint-evaluation-graph.component.html',
  styleUrls: ['./sprint-evaluation-graph.component.css']
})
export class SprintEvaluationGraphComponent implements OnInit {

  constructor(public backendService: BackendService, private functions: AngularFireFunctions) { }

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
  title: string = "Sprint Evaluation Graph";

  ngOnInit(): void {
    this.showLoader = true;
    this.sprintRange2 = this.currentSprintNumber;
    this.sprintRange1 = this.currentSprintNumber - 4;
    this.teamMember = 'Team';
    this.getData().then(data => {
      this.data = data;
      this.showLoader = false;
    });
  }

  async getData() {
    let temp = [];
      for (let i = this.sprintRange1; i <= this.sprintRange2; i++) {
        await this.readData(i, this.teamId).then(data => {
          temp.push(["S" + i, data[0], data[1], data[2]]);
        }).catch(err => {
          console.log(err);
        });
        this.columnNames = ["Sprints", "Start", "Mid", "End"];
      }
    return temp;
  }

  async readData(sprintNumber: number, teamId: string) {
    var storyPointArray: number[];
    let orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable('performanceChart');
    try {
      const result = await callable({ mode: "sprintEvaluationGraph", OrganizationDomain: orgDomain, SprintNumber: sprintNumber, TeamId: teamId}).toPromise();
      storyPointArray = result.StoryPointArray;
    } catch(error) {
      console.log(error);
    }
    return storyPointArray;
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
