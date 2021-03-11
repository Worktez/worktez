import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Main, MainDataId, RawDataType } from '../Interface/RawDataInterface';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  public rawDataObservable: Observable<RawDataType>;
  public rawDocument: AngularFirestoreDocument<RawDataType>;

  public mainData: Observable<MainDataId[]>;
  public mainCollection: AngularFirestoreCollection<Main>;

  currentSprintNumber: number = 0;
  currentSprintName: string;

  constructor(private db: AngularFirestore) { }

  getCurrentSprint() {
    this.rawDocument = this.db.doc<RawDataType>('RawData/AppDetails');
    this.rawDataObservable = this.rawDocument.snapshotChanges().pipe(
      map(actions => {
        const data = actions.payload.data() as RawDataType;
        if (this.currentSprintNumber == 0) {
          this.currentSprintNumber = data.CurrentSprintId;
          this.currentSprintName = "S" + this.currentSprintNumber;
        }

        return { ...data }
      })
    )
    return this.rawDataObservable
  }

  setCurrentSprint(sprintNumber: number) {
    this.currentSprintNumber = sprintNumber;
    if (this.currentSprintNumber == -1) {
      this.currentSprintName = "Backlog";
    }
    else if (this.currentSprintNumber == -2) {
      this.currentSprintName = "Deleted";
    }
    else if (sprintNumber == 0) {
      this.getCurrentSprint();
    } else {
      this.currentSprintName = "S" + this.currentSprintNumber;
    }
    console.log(this.currentSprintName);
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
}
