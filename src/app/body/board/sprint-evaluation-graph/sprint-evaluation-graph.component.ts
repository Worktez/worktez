import { Component, Input, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { BackendService } from 'src/app/services/backend/backend.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

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
  data: Observable<[]>;
  columnNames: string[] = ["Sprints", "Start", "Mid", "End"];
  teamMember: string;
  sprintRange1: number;
  sprintRange2: number;
  title: string = "Sprint Evaluation Graph";

  ngOnInit(): void {
    this.showLoader = true;
    this.sprintRange2 = this.currentSprintNumber;
    this.sprintRange1 = this.currentSprintNumber - 4;
    this.teamMember = 'Team';
    this.getData();
  }

  async getData() {
    let orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable('performanceChart');
    try {
      this.data = await callable({ mode: "sprintEvaluationGraph", OrganizationDomain: orgDomain,SprintNumberRange: {'SprintRange1': this.sprintRange1, 'SprintRange2': this.sprintRange2}, TeamId: this.teamId}).pipe(
        map(actions => {
          return actions.data as [];
        }));
      this.showLoader = false;
    } catch(error) {
      console.log(error);
    }
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