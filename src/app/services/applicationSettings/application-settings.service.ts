import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeamDataId, Team, Sprint } from '../../Interface/TeamInterface';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})

export class ApplicationSettingsService {
  public editedTeamId: string = "";
  public editedSprintId: number = 0;
  team: Team;

  public teamData: Observable<TeamDataId[]>;
  public teamCollection: AngularFirestoreCollectionGroup<Team>;

  public sprintDataObservable: Observable<Sprint>;

  constructor(private db: AngularFirestore, private backendService: BackendService, private functions: AngularFireFunctions) { }

  getTeamDetails(teamId: string) {
    const orgId = this.backendService.organizationDetails.OrganizationId;
    this.teamCollection = this.db.collectionGroup<Team>('Teams', ref => ref.where('OrganizationId', '==', orgId).where('TeamId', '==', teamId));
    this.teamData = this.teamCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Team;
        this.team = data;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    return this.teamData;
  }

  getSprintsDetails(SprintNumber: number) {
    const orgDomain = this.backendService.getOrganizationDomain();
    const teamName = this.team.TeamName;
    const callable = this.functions.httpsCallable("sprints");
    this.sprintDataObservable = callable({mode: "getSprintDetails", OrgDomain: orgDomain, TeamName: teamName, SprintNumber: SprintNumber}).pipe(map(actions => {
        return actions.sprintData as Sprint;
    }));
    return this.sprintDataObservable;
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

  project: string[] = [
    "Business",
    "Development",
    "Marketing",
    "Other"
  ]
}
