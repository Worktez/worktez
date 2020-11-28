import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
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

  currentSprintNumber: number;
  currentSprintName: string;

  public mainData: Observable<MainDataId[]>;
  public mainCollection: AngularFirestoreCollection<Main>;

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.rawCollection = this.db.collection<RawDataType>('RawData');
    this.rawData = this.rawCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as RawDataType;
        this.currentSprintNumber = data.CurrentSprintId;
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
}
