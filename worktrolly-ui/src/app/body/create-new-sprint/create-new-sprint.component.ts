import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm }   from '@angular/forms';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'app-create-new-sprint',
  templateUrl: './create-new-sprint.component.html',
  styleUrls: ['./create-new-sprint.component.css']
})
export class CreateNewSprintComponent implements OnInit {

  @ViewChild('form') form: NgForm;

  startDate:string
  endDate:string
  status:string
  totalDevelopment:string
  totalBusiness:string
  totalMarketing:string


  constructor(private functions: AngularFireFunctions) { }
  ngOnInit(): void {
  }

  async createNewSprint(){
    console.log(this.startDate);
    console.log(this.endDate);
    console.log(this.status);
    console.log(this.totalDevelopment);
    console.log(this.totalBusiness);
    console.log(this.totalMarketing);

    const callable = this.functions.httpsCallable('startNewSprint');

    try {
      const result = await callable({ StartDate: this.startDate, EndDate: this.endDate, TotalDevelopment: this.totalDevelopment, TotalBusiness: this.totalBusiness, TotalMarketing: this.totalMarketing }).toPromise();

      console.log("Successfully created the task");
      console.log(result);
    } catch (error) {
      console.error("Error", error);
    }

  }

}
