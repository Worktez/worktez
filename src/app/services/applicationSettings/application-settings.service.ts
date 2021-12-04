import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
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

  public status: string[] = []

  public priority: string[] = []

  public difficulty: string[] = []

  public type: string[] = []

  public project: string[] = []

  public teamData: Observable<Team>;

  public sprintDataObservable: Observable<Sprint>;

  constructor(private backendService: BackendService, private functions: AngularFireFunctions) { }

  getTeamDetails(teamId: string) {
    if(this.team == undefined || this.team.TeamId != teamId) {
      const orgDomain = this.backendService.organizationDetails.OrganizationDomain;
      const callable = this.functions.httpsCallable("teams");
      this.teamData = callable({mode: "getTeamData", OrganizationDomain: orgDomain, TeamId: teamId}).pipe(
        map(actions => {
          this.team = actions.resultData as Team
          this.status = this.team.StatusLabels;
          this.priority = this.team.PriorityLabels;
          this.difficulty = this.team.DifficultyLabels;
          this.type = this.team.Type;
          this.project = this.backendService.organizationDetails.TeamsName;
          return this.team;
      }));
    }
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
}
