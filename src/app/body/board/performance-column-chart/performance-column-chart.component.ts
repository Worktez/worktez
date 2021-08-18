import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-performance-column-chart',
  templateUrl: './performance-column-chart.component.html',
  styleUrls: ['./performance-column-chart.component.css']
})
export class PerformanceColumnChartComponent implements OnInit {

  constructor(public db: AngularFirestore, public backendService: BackendService, public authService: AuthService, public applicationSettingsService: ApplicationSettingsService) { }

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
    for (let i = this.sprintRange1; i <= this.sprintRange2; i++) {
      if (this.teamMember == 'Team') {
        await this.readTeamData(i, this.teamId).then(data => {
          temp.push(["S" + i, data]);
        }).catch(err => {
          console.log(err);
        });
        this.columnNames = ["Sprints", this.teamId];
      } else {
        await this.readMemberData(i, this.teamMember).then(data => {
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
    try {
      await this.db.collection("Organizations").doc(orgDomain).collection("Tasks").ref.where("SprintNumber", "==", sprintNumber).where("TeamId", "==", teamId).get().then(docs => {
        docs.forEach(doc => {
          const data = doc.data() as Tasks;
          if (data.Status == "Completed") {
            storyPoint += data.StoryPointNumber;
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
    return storyPoint;
  }

  async readMemberData(sprintNumber: number, teamMember: string) {
    var storyPoint: number = 0;
    let orgDomain = this.backendService.getOrganizationDomain();
    try {
      await this.db.collection("Organizations").doc(orgDomain).collection("Tasks").ref.where("SprintNumber", "==", sprintNumber).where("TeamId", "==", this.teamId).where("Assignee", "==", teamMember).get().then(docs => {
        docs.forEach(doc => {
          const data = doc.data() as Tasks;
          if (data.Status == "Completed") {
            storyPoint += data.StoryPointNumber;
          }
        });
      });
    } catch (err) {
      console.log(err);
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
