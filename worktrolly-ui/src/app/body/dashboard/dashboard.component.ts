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

  public rawData: Observable<RawDataId[]>;
  public rawCollection: AngularFirestoreCollection<RawDataType>;
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

  async getCurrentSprint() {
    this.rawDocument = this.db.doc<RawDataType>('Main/RawData');
    try {
      await this.rawDocument.ref.get().then(doc=> {
        if(doc.exists){
          var rawData = doc.data();
          this.currentSprintNumber = rawData.CurrentSprintId;
          this.currentSprintName = "S" + this.currentSprintNumber;
        } else {
          console.error("Document does not exists!")
        }
      });
      return "Success";
    } catch (error) {
      return "Error";
    }

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
  }

  changeSprintName(data: {newSprintNumber: number}) {
    this.currentSprintNumber = data.newSprintNumber;
    this.currentSprintName = "S" + this.currentSprintNumber;
  }

  showBacklog() {
    this.currentSprintNumber = -1;
    this.currentSprintName = "Backlog";
  }

  showTasks(category: string) {
    this.router.navigate(['/Tasks', category, this.currentSprintName])
  }
}
