import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeamDataId, Team, Sprint, SprintDataId } from '../Interface/TeamInterface';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationSettingsService {

  public teamData: Observable<TeamDataId[]>;
  public teamCollection: AngularFirestoreCollectionGroup<Team>;
  
  public sprintData: Observable<SprintDataId[]>;
  public sprintCollection: AngularFirestoreCollectionGroup<Sprint>;

  constructor(private db: AngularFirestore, private backendService: BackendService) { }

  getTeamDetails() {
    const orgId = this.backendService.organizationDetails.OrganizationId;
    console.log("here")
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

  getSprintsDetails(teamId: string, sprintNumber: number) {
    const orgId = this.backendService.organizationDetails.OrganizationId;
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
