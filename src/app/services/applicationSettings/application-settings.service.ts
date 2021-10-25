import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team, Sprint } from '../../Interface/TeamInterface';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})

export class ApplicationSettingsService {
  public editedTeamId: string = "";
  public editedSprintId: number = 0;
  team: Team;

  public teamData: Observable<Team>;

  public sprintDataObservable: Observable<Sprint>;

  constructor(private backendService: BackendService, private functions: AngularFireFunctions) { }

  getTeamDetails(teamId: string) {
    const orgDomain = this.backendService.organizationDetails.OrganizationDomain;
    const callable = this.functions.httpsCallable("teams");
    this.teamData = callable({mode: "getTeamData", OrganizationDomain: orgDomain, TeamId: teamId}).pipe(
      map(actions => {
        this.team = actions.resultData as Team
        return this.team;
    }));

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
