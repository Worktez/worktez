import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Notification } from 'src/app/Interface/NotificationInterface';
import { Team, Sprint } from '../../Interface/TeamInterface';
import { AuthService } from '../auth.service';
import { BackendService } from '../backend/backend.service';
import { UserServiceService } from '../user-service/user-service.service';

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

  public notificationListObservable: Observable<Notification[]>;

  teamDataReady: boolean = false;

  constructor(private userService: UserServiceService, private backendService: BackendService, private functions: AngularFireFunctions, private authService: AuthService) { }

  getTeamDetails(teamId: string) {
    if(this.team == undefined || this.team.TeamId != teamId) {
      this.teamDataReady = false;
      const orgDomain = this.backendService.organizationDetails.OrganizationDomain;
      console.log(teamId);
      console.log(orgDomain);
      const callable = this.functions.httpsCallable("teams/getTeamData");
      this.teamData = callable({OrganizationDomain: orgDomain, TeamId: teamId}).pipe(
        map(actions => {
          this.team = actions.resultData as Team
          this.status = this.team.StatusLabels;
          this.priority = this.team.PriorityLabels;
          this.difficulty = this.team.DifficultyLabels;
          this.type = this.team.Type;
          this.project = this.backendService.organizationDetails.TeamsId;
          this.team.TeamMembers.forEach(element => {
            this.userService.checkAndAddToUsersUsingEmail(element);
          });

          if(!this.userService.userReady) {
            this.userService.fetchUserData().subscribe(()=>{
              this.teamDataReady = true;
              console.log("teamDataReady : ", this.teamDataReady);
            });
          }

          return this.team;
      }));
    }
    return this.teamData;
  }

  getSprintsDetails(SprintNumber: number) {
    const orgDomain = this.backendService.getOrganizationDomain();
    const teamName = this.team.TeamName;
    const callable = this.functions.httpsCallable("sprints/getSprintDetails");
    this.sprintDataObservable = callable({OrgDomain: orgDomain, TeamName: teamName, SprintNumber: SprintNumber}).pipe(map(actions => {
        return actions.sprintData as Sprint;
    }));
    return this.sprintDataObservable;
  }

  getNotificationsList() {
    const orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable("notifications/getNotifications");
    this.notificationListObservable = callable({Uid: this.authService.user.uid, OrgDomain: orgDomain}).pipe(map(actions => {
        return actions as Notification[];
    }));
    return this.notificationListObservable;
  }
}
