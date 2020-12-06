import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators'
import { Main, MainDataId, RawDataId, RawDataType } from 'src/app/Interface/RawDataInterface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // public rawData: RawDataType;
  public rawDataObservable: Observable<RawDataType>;
  public rawDocument: AngularFirestoreDocument<RawDataType>;

  currentSprintNumber: number;
  currentSprintName: string;

  public mainData: Observable<MainDataId[]>;
  public mainCollection: AngularFirestoreCollection<Main>;

  filterSprintNumber: string;

  constructor(private db: AngularFirestore, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Better way of use db.
    // this.rawCollection = this.db.collection<RawDataType>('RawData');
    // this.rawData = this.rawCollection.snapshotChanges().pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data() as RawDataType;
    //     this.currentSprintNumber = data.CurrentSprintId;
    //     this.currentSprintName = "S"+this.currentSprintNumber;
    //     const id = a.payload.doc.id;
    //     return { id, ...data };
    //   }))
    // );

    // Efficient for now
    this.getCurrentSprint();
    this.readCurrentSprintData();
  }

  // Reading data as get() method

  // async getCurrentSprint() {
  //   this.rawDocument = this.db.doc<RawDataType>('Main/RawData');
  //   try {
  //     await this.rawDocument.ref.get().then(doc=> {
  //       if(doc.exists){
  //         var rawData = doc.data();
  //         this.currentSprintNumber = rawData.CurrentSprintId;
  //         this.currentSprintName = "S" + this.currentSprintNumber;
  //       } else {
  //         console.error("Document does not exists!")
  //       }
  //     });
  //     return "Success";
  //   } catch (error) {
  //     return "Error";
  //   }

  // }

  // Reading synchronous snapshot of data

  getCurrentSprint() {
    this.rawDocument = this.db.doc<RawDataType>('RawData/AppDetails');
    this.rawDataObservable = this.rawDocument.snapshotChanges().pipe(
      map(actions => {
        const data = actions.payload.data() as RawDataType;
        // this.rawData = data;
        this.currentSprintNumber = data.CurrentSprintId;
        this.currentSprintName = "S" + this.currentSprintNumber;
        return {...data}
      })
    )
  }

  readCurrentSprintData() {
    this.mainCollection = this.db.collection<Main>('Main');
    this.mainData = this.mainCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Main;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    // this.mainData = this.mainCollection.snapshotChanges().pipe(
    //   map()
    // )
  }

  changeSprintName(data: {newSprintNumber: number}) {
    this.currentSprintNumber = data.newSprintNumber;
    this.currentSprintName = "S" + this.currentSprintNumber;
  }

  showBacklog() {
    this.currentSprintNumber = -1;
    this.currentSprintName = "Backlog";
  }

  currentSprint(){
    this.getCurrentSprint();
    this.currentSprintName = "S" + this.currentSprintNumber;
  }

  showTasks(category: string) {
    this.router.navigate(['/Tasks', category, this.currentSprintName])
  }
}
