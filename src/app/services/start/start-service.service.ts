import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Team } from 'src/app/Interface/TeamInterface';
import { ApplicationSettingsService } from '../applicationSettings/application-settings.service';
import { AuthService } from '../auth.service';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class StartServiceService {

  accessLevel: number;
  uid: string;
  userEmail: string;
  selectedTeamId: string;
  teams: string[];
  showTeams: boolean = false;
  showTeamsData: boolean = false;
  teamData: Team;
  teamCurrentSprintNumber: number = -100;
  currentSprintNumber: number = 0;
  changeTeam: boolean = false;
  teamMembers: string[];
  teamIdExists: boolean = false;
  teamName: string;
  managerEmail: string;
  role: string;

  private userDataState: Subject<boolean> = new Subject<boolean>();
  public userDataStateObservable = this.userDataState.asObservable();

  private applicationDataState: Subject<boolean> = new Subject<boolean>();
  public applicationDataStateObservable = this.applicationDataState.asObservable();


  constructor(public authService: AuthService, public applicationSettingsService: ApplicationSettingsService, public backendService: BackendService) { }

  startApplication() {
    this.userDataState.next(false);
    this.accessLevel = 0;
    this.authService.afauth.user.subscribe(data => {
      this.userEmail = data.email;
      this.uid = data.uid;
      this.authService.userAppSettingObservable.subscribe(data => {
        if (data.SelectedOrgAppKey) {
          if(data.SelectedTeamId != "") {
            this.selectedTeamId = data.SelectedTeamId;
            this.teamIdExists = true;
            console.log(this.uid);
            console.log(data.SelectedOrgAppKey);
            this.authService.getListedTeams(this.uid, data.SelectedOrgAppKey);
            this.accessLevel = 1;
            if (this.applicationSettingsService.editedTeamId != data.SelectedTeamId && this.applicationSettingsService.editedTeamId != "") {
              this.selectedTeamId = this.applicationSettingsService.editedTeamId;
            } else {
              this.selectedTeamId = data.SelectedTeamId;
              this.applicationSettingsService.editedTeamId = this.selectedTeamId;
            }
            this.backendService.organizationsData.subscribe(data => {
              this.authService.myTeamsListObservable.subscribe(data => {
                this.teams = data;
                this.showTeams = true;
                this.readApplicationData();
                this.userDataState.next(true);
              });
            });
          } else {
            this.teamIdExists = false;
          }
        }
      });
    });
  }

  readApplicationData() {
    this.applicationDataState.next(false);
    this.applicationSettingsService.getTeamDetails(this.selectedTeamId).subscribe(teams => {
      this.teamData = teams;
      
      if (this.teamData.TeamId == this.selectedTeamId) {
        if (this.applicationSettingsService.editedSprintId != this.teamData.CurrentSprintId && this.changeTeam == false && this.applicationSettingsService.editedSprintId != 0 ) {
          this.teamCurrentSprintNumber = this.applicationSettingsService.editedSprintId;
          this.currentSprintNumber = this.teamData.CurrentSprintId;
        } else {
          this.teamCurrentSprintNumber = this.teamData.CurrentSprintId;
          this.currentSprintNumber = this.teamData.CurrentSprintId;
          this.applicationSettingsService.editedSprintId = this.currentSprintNumber;
          this.changeTeam = false;
        }
        this.teamMembers = this.teamData.TeamMembers;

      }
      this.teamName = teams.TeamName;
      this.managerEmail = teams.TeamManagerEmail;
      if (teams.TeamManagerEmail == this.userEmail) {
        this.role = "Manager";
      } else {
        this.role = "Member";
      }
      this.showTeamsData = true;
      this.applicationDataState.next(true);
      return this.teamData;
    });
  }
}
