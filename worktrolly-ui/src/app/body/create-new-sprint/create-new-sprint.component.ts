import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RawDataId, RawDataType } from 'src/app/Interface/RawDataInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-new-sprint',
  templateUrl: './create-new-sprint.component.html',
  styleUrls: ['./create-new-sprint.component.css']
})
export class CreateNewSprintComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @Input('newSprintId') newSprintId: string;

  startDate: string
  endDate: string
  status: string
  totalDevelopment: number
  totalBusiness: number
  totalMarketing: number
  totalOther: number
  enableLoader: boolean = false;

  public rawData: Observable<RawDataId[]>;
  public rawDocument: AngularFirestoreDocument<RawDataType>;

  public sprintData: Observable<RawDataId[]>;
  public sprintDocument: AngularFirestoreDocument<RawDataType>;

  currentSprintNumber: number;

  constructor(private db: AngularFirestore, private functions: AngularFireFunctions, private router: Router) { }

  ngOnInit(): void {
    this.getNewSprintId();
  }

  async getNewSprintId() {
    this.rawDocument = this.db.doc<RawDataType>('RawData/AppDetails');
    try {
      await this.rawDocument.ref.get().then(doc => {
        if (doc.exists) {
          var rawData = doc.data();
          this.currentSprintNumber = rawData.CurrentSprintId + 1;
          this.newSprintId = "S" + this.currentSprintNumber;
          this.readSprintData(this.newSprintId);
        } else {
          console.error("Document does not exists!")
        }
      });
      return "Success";
    } catch (error) {
      return "Error";
    }

  }

  async readSprintData(newSprintId: string) {
    var documentName = "Main/" + newSprintId;
    this.sprintDocument = this.db.doc<RawDataType>(documentName);
    try {
      await this.sprintDocument.ref.get().then(doc => {
        if (doc.exists) {
          var sprintData = doc.data();
          this.totalDevelopment = sprintData.TotalDevelopmentTask;
          this.totalBusiness = sprintData.TotalBusinessTask;
          this.totalMarketing = sprintData.TotalMarketingTask;
          this.totalOther = sprintData.TotalOtherTask;
        }
        else {
          this.totalDevelopment = 0;
          this.totalBusiness = 0;
          this.totalMarketing = 0;
          this.totalOther = 0;
        }
      });
      return "ok";
    } catch (error) {
      return "Error";
    }
  }

  async createNewSprint() {
    console.log(this.startDate);
    console.log(this.endDate);
    console.log(this.status);
    console.log(this.totalDevelopment);
    console.log(this.totalBusiness);
    console.log(this.totalMarketing);
    console.log(this.totalOther);

    this.enableLoader = true;
    const callable = this.functions.httpsCallable('startNewSprint');

    try {
      const result = await callable({ StartDate: this.startDate, EndDate: this.endDate, TotalDevelopment: this.totalDevelopment, TotalBusiness: this.totalBusiness, TotalMarketing: this.totalMarketing, TotalOther: this.totalOther, Status: this.status, NewSprintId: this.currentSprintNumber }).toPromise();

      console.log("Successfully created a new sprint");
      console.log(result);
      this.router.navigate(['/']);
    } catch (error) {
      this.enableLoader = false;
      console.error("Error", error);
    }

  }

  backToDashboard(){
    this.router.navigate(['/']);
  }

}
