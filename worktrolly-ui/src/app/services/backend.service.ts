import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RawDataType } from '../Interface/RawDataInterface';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  public rawDataObservable: Observable<RawDataType>;
  public rawDocument: AngularFirestoreDocument<RawDataType>;


  currentSprintNumber: number;
  currentSprintName: string;

  constructor(private db: AngularFirestore) { }

  getCurrentSprint() {
    this.rawDocument = this.db.doc<RawDataType>('RawData/AppDetails');
    this.rawDataObservable = this.rawDocument.snapshotChanges().pipe(
      map(actions => {
        const data = actions.payload.data() as RawDataType;
        this.currentSprintNumber = data.CurrentSprintId;
        this.currentSprintName = "S" + this.currentSprintNumber;
        return { ...data }
      })
    )
    return this.rawDataObservable
  }
}
