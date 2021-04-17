import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'app-patch',
  templateUrl: './patch.component.html',
  styleUrls: ['./patch.component.css']
})
export class PatchComponent implements OnInit {

  setSprintNumber: number;
  taskID: number;
  completedTask: number;
  unCompletedTask: number;
  totalDevelopmentTask: number;
  totalMarketingTask: number;
  totalBusinessTask: number;
  totalOtherTask: number;
  orgId: string;
  orgDomain: string;

  constructor(private functions: AngularFireFunctions) { }

  ngOnInit(): void {
  }
  async patch() {
    const callable = this.functions.httpsCallable('patch');

    try {
      const result = await callable({ SetSprintNumber: this.setSprintNumber, TaskID: this.taskID, CompletedTask: this.completedTask, UnCompletedTask: this.unCompletedTask, DevTask: this.totalDevelopmentTask, BusinessTask: this.totalBusinessTask, MarketingTask: this.totalMarketingTask, OtherTask: this.totalOtherTask, OrgID: this.orgId, OrgDomain: this.orgDomain }).toPromise();
      console.log("Success!");
      console.log(result);
      this.taskID = result.numberOfTasks;
      this.completedTask = result.numberOfCompleted;
      this.unCompletedTask = result.numberOfUncompleted;
      this.totalDevelopmentTask = result.totalDevelopmentTasks;
      this.totalBusinessTask = result.totalBusinessTasks;
      this.totalMarketingTask = result.totalMarketingTasks;
      this.totalOtherTask = result.totalOtherTasks;
    } catch (error) {
      console.error("Error", error);
    }
  }
}
