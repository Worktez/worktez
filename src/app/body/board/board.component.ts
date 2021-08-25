import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Sprint, SprintDataId, TeamDataId } from 'src/app/Interface/TeamInterface';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { AuthService } from 'src/app/services/auth.service';
import { FeatureCardComponent } from './feature-card/feature-card.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @ViewChildren(FeatureCardComponent) child: QueryList<FeatureCardComponent>;

  componentName: string = "BOARD";
  currentSprintNumber: number
  showContent: boolean = false;
  teamData: TeamDataId[] = [];
  selectedTeamId: string;
  teamCurrentSprintNumber: number = -100;
  sprintData: Sprint;
  currentSprintName: string;
  accessLevel: number;
  showTeams: boolean = false;
  teams: [];
  sprintNotExist: boolean = false;
  zeroSprint: boolean = false;
  teamMembers: string[];

  constructor(public authService: AuthService, public navbarHandler: NavbarHandlerService, public backendService: BackendService, public applicationSettingsService: ApplicationSettingsService) { }

  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
    this.navbarHandler.addToNavbar(this.componentName);

    // Efficient for now
    this.accessLevel = 0;
    this.authService.afauth.user.subscribe(data => {
      this.authService.userAppSettingObservable.subscribe(data => {
        if (data.AppKey) {
          this.accessLevel = 1;
          this.selectedTeamId = data.TeamId;
          this.backendService.organizationsData.subscribe(data => {
            if (data.length) {
              this.teams = data[0].TeamsId;
              this.showTeams = true;
              this.readApplicationData();
            }
          });
        }
      });
    });
  }

  readApplicationData() {
    this.applicationSettingsService.getTeamDetails(this.selectedTeamId).subscribe(teams => {
      this.teamData = teams;
      teams.forEach(element => {
        if (element.TeamId == this.selectedTeamId) {
          this.teamCurrentSprintNumber = element.CurrentSprintId;
          this.currentSprintNumber = element.CurrentSprintId;
          this.teamMembers = element.TeamMembers;
        }
      });
      this.readSprintData();
    });
  }

  getSprintDetails(teamId: string) {
    this.sprintNotExist = false;
    this.zeroSprint = false;
    this.showContent = false;
    this.selectedTeamId = teamId;
    this.readApplicationData();
    // this.readSprintData();
  }

  readSprintData() {
    this.showContent = false;
    this.child.forEach(child => {
      child.highlightSelectedTeam(this.selectedTeamId);
    })
    if (this.teamCurrentSprintNumber != 0) {
      this.applicationSettingsService.getSprintsDetails(this.selectedTeamId, this.teamCurrentSprintNumber).subscribe(sprints => {
        console.log(sprints);
        if (sprints.length != 0) {
          this.sprintData = sprints[0];
          this.currentSprintName = "S" + this.sprintData.SprintNumber;
          this.showContent = true;
        } else {
          console.log("Not existing");
          this.showContent = true;
          this.sprintNotExist = true;
        }
      });
    } else {
      this.showContent = true
      console.log("no sprint");
      this.zeroSprint = true;
      this.changeSprintNumber(-1);
    }
  }

  changeSprintNumber(filterSprintNumber: any) {
    console.log(filterSprintNumber);
    this.teamCurrentSprintNumber = filterSprintNumber;
    this.currentSprintName = "S" + this.teamCurrentSprintNumber;
    this.readSprintData();
  }
}
