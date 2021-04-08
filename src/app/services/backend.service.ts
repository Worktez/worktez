import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Organizations } from '../Interface/OrganizationInterface';
import { Main, MainDataId, RawDataType } from '../Interface/RawDataInterface';
import firebase from "firebase/app";
import { ApplicationSettingsService } from './application-settings.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  organizationDetails: Organizations

  organizationsCollection: AngularFirestoreCollection<Organizations>
  organizationsData: Observable<Organizations[]>

  public rawDataObservable: Observable<RawDataType>;
  public rawDocument: AngularFirestoreDocument<RawDataType>;

  public mainData: Observable<MainDataId[]>;
  public mainCollection: AngularFirestoreCollectionGroup<Main>;

  currentSprintNumber: number = 0;
  currentSprintName: string;

  constructor(private db: AngularFirestore, private applicationSettingsService: ApplicationSettingsService) { }
  
  getCurrentSprint() {
    this.rawDocument = this.db.doc<RawDataType>('Organizations/'+this.organizationDetails.OrganizationDomain+'/RawData/AppDetails');
    this.rawDataObservable = this.rawDocument.snapshotChanges().pipe(
      map(actions => {
        const data = actions.payload.data() as RawDataType;
        if (this.currentSprintNumber == 0) {
          this.currentSprintNumber = data.CurrentSprintId;
          this.currentSprintName = "S" + this.currentSprintNumber;
        }
        return { ...data }
      })
    );
    return this.rawDataObservable;
  }

  async getOrgDetails(AppKey: string) {
    this.organizationsCollection = this.db.collection<Organizations>("Organizations", ref => {
      let queryRef: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      queryRef = queryRef.where('AppKey', '==', AppKey);
      return queryRef;
    });
    await this.organizationsCollection.get().toPromise().then(data => {
      if(!data.empty) {
        data.forEach(async element => {
          this.organizationDetails = element.data();
          this.applicationSettingsService.getTeamDetails(this.getOrganizationId()).toPromise();
        });
      }
    });
    return this.organizationDetails;
  }

  setCurrentSprint(sprintNumber: number) {
    this.currentSprintNumber = sprintNumber;
    if(this.currentSprintNumber == -1){
      this.currentSprintName = "Backlog";
    } else if(sprintNumber == 0){
      this.getCurrentSprint();
    } else{
      this.currentSprintName = "S" + this.currentSprintNumber;
    }
  }

  readCurrentSprintData(){
    this.mainCollection = this.db.collectionGroup<Main>('Sprints', ref => ref.where('OrganizationId', '==', this.organizationDetails.OrganizationId));
    this.mainData = this.mainCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Main;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getOrganizationDomain() {
      return this.organizationDetails.OrganizationDomain;
  }

  getOrganizationAppKey() {
    return this.organizationDetails.AppKey;
  }

  getOrganizationId() {
    return this.organizationDetails.OrganizationId;
  }
}
