import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeamDataId, Team } from '../Interface/TeamInterface';

@Injectable({
  providedIn: 'root'
})
export class ApplicationSettingsService {

  public teamData: Observable<TeamDataId[]>;
  public teamCollection: AngularFirestoreCollectionGroup<Team>;

  constructor(private db: AngularFirestore) { }

  getTeamDetails(orgId: string) {
    console.log(orgId);
    this.teamCollection = this.db.collectionGroup<Team>('Teams', ref => ref.where('OrganizationId', '==', orgId));
    this.teamData = this.teamCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Team;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.teamData;
  }

  getTeamId() {
    return this.teamData;
  }

  status: string[] = [
    "Ice Box",
    "Ready to start",
    "Under Progress",
    "Blocked",
    "Completed"
  ]
  priority: string[] = [
    "High",
    "Medium",
    "Low"
  ]
  difficulty: string[] = [
    "High",
    "Medium",
    "Low"
  ]
  category: string[] = [
    "Business",
    "Development",
    "Marketing",
    "Other"
  ]
}
