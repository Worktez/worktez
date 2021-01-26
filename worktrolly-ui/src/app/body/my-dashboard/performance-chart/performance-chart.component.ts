import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-performance-chart',
  templateUrl: './performance-chart.component.html',
  styleUrls: ['./performance-chart.component.css']
})
export class PerformanceChartComponent implements OnInit {

  @Input("username") username: string
  @Input("currentSprint") currentSprintNumber: number

  showLoader: boolean = true
  sprintRange1: number
  sprintRange2: number
  data = [];
  constructor(public db: AngularFirestore) { }

  ngOnInit(): void {
    this.sprintRange2 = this.currentSprintNumber
    this.sprintRange1 = this.sprintRange2 - 2
    this.createData().then(data => {
      this.data = data
      this.showLoader = false
    }).catch(error => {
      console.log(error);
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
          console.log(err);
        })
    }
    return tempData;
  }
  async readData(sprintNumber: number) {
    var storyPoint: number = 0;
    try {
      await this.db.collection("Tasks").ref.where("SprintNumber", "==", sprintNumber).where("Assignee", "==", this.username)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach((doc) => {
            const sp = doc.data().StoryPointNumber;
            storyPoint = storyPoint + parseInt(sp);
          });
        })
    } catch (error) { }
    return storyPoint
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
      console.log(error);
    });
  }
}
