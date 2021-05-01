import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeamDataId, Team, Sprint, SprintDataId } from '../Interface/TeamInterface';

@Injectable({
  providedIn: 'root'
})
export class ApplicationSettingsService {

  teamDetails: Team;
  public teamData: Observable<TeamDataId[]>;
  public teamCollection: AngularFirestoreCollectionGroup<Team>;
  
  public sprintData: Observable<SprintDataId[]>;
  public sprintCollection: AngularFirestoreCollectionGroup<Sprint>;

  constructor(private db: AngularFirestore) { }

  getTeamDetails(orgId: string) {
    console.log(orgId);
    this.teamCollection = this.db.collectionGroup<Team>('Teams', ref => ref.where('OrganizationId', '==', orgId));
    this.teamData = this.teamCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Team;
        this.teamDetails = data;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.teamData;
  }

  getSprintsDetails(orgId: string, teamId: string, sprintNumber: number) {
    console.log(orgId);
    this.sprintCollection = this.db.collectionGroup<Sprint>('Sprints', ref => ref.where('OrganizationId', '==', orgId).where('TeamId', '==', teamId).where('SprintNumber', '==', sprintNumber));
    this.sprintData = this.sprintCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Sprint;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.sprintData;
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
