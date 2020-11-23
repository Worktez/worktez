import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { NgForm }   from '@angular/forms';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Main, MainDataId, RawDataId, RawDataType } from 'src/app/Interface/RawDataInterface';

@Component({
  selector: 'app-create-new-sprint',
  templateUrl: './create-new-sprint.component.html',
  styleUrls: ['./create-new-sprint.component.css']
})
export class CreateNewSprintComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @Input('currentSprintName') currentSprintName: string;

  startDate:string
  endDate:string
  status:string
  totalDevelopment:string
  totalBusiness:string
  totalMarketing:string


  public rawData: Observable<RawDataId[]>;
  public rawCollection: AngularFirestoreCollection<RawDataType>;

  currentSprintNumber: number;

  public mainData: Observable<MainDataId[]>;
  public mainCollection: AngularFirestoreCollection<Main>;

  constructor(private functions: AngularFireFunctions, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.rawCollection = this.db.collection<RawDataType>('RawData');
    this.rawData = this.rawCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as RawDataType;
        this.currentSprintNumber = data.CurrentSprintId + 1;
        this.currentSprintName = "S"+this.currentSprintNumber;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    this.readCurrentSprintData();
  }

  async readCurrentSprintData() {
    this.mainCollection = this.db.collection<Main>('Main');
    this.mainData = this.mainCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Main;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
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
