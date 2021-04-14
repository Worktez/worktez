import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'app-patch',
  templateUrl: './patch.component.html',
  styleUrls: ['./patch.component.css']
})
export class PatchComponent implements OnInit {

  taskID: number;
  completedTask: number;
  unCompletedTask: number;
  totalDevelopmentTask: number
  totalMarketingTask: number
  totalBusinessTask: number
  totalOtherTask: number
  orgId: string
  obj: { TaskID: number; CompletedTask: number; UnCompletedTask: number; DevTask: number; BusinessTask: number; MarketingTask: number; OtherTask: number; OrgID: string; };

  constructor(private functions: AngularFireFunctions) { }

  ngOnInit(): void {
  }
  async patch() {
    const callable = this.functions.httpsCallable('patch');
    this.obj = { TaskID: this.taskID, CompletedTask: this.completedTask, UnCompletedTask: this.unCompletedTask, DevTask: this.totalDevelopmentTask, BusinessTask: this.totalBusinessTask, MarketingTask: this.totalMarketingTask, OtherTask: this.totalOtherTask, OrgID: this.orgId }

    console.log(this.obj);

    try {
      const result = await callable({TaskID: this.taskID, CompletedTask: this.completedTask, UnCompletedTask: this.unCompletedTask, DevTask: this.totalDevelopmentTask, BusinessTask: this.totalBusinessTask, MarketingTask: this.totalMarketingTask, OtherTask: this.totalOtherTask, OrgID: this.orgId }).toPromise();
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
