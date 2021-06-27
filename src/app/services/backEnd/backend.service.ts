import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollectionGroup, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Organizations, OrganizationsDataId } from '../../Interface/OrganizationInterface';
import { RawDataType } from '../../Interface/RawDataInterface';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  organizationDetails: Organizations

  organizationsCollection: AngularFirestoreCollectionGroup<Organizations>
  organizationsData: Observable<OrganizationsDataId[]>

  public rawDataObservable: Observable<RawDataType>;
  public rawDocument: AngularFirestoreDocument<RawDataType>;

  currentSprintNumber: number = 0;
  currentSprintName: string;

  constructor(private db: AngularFirestore) { }

  getOrgDetails(AppKey: string) {
    this.organizationsCollection = this.db.collectionGroup<Organizations>("Organizations", ref => ref.where('AppKey', '==', AppKey));
    this.organizationsData = this.organizationsCollection.snapshotChanges().pipe(
      map(actions => actions.map(action => {
        const data = action.payload.doc.data() as Organizations
        this.organizationDetails = data;
        const id = action.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.organizationsData;
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
  
  getOrganizationTeamIds(){
    return this.organizationDetails.TeamsId;
  }
}
