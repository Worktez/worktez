import { Component, OnInit } from '@angular/core';
import { Sprint, TeamDataId } from 'src/app/Interface/TeamInterface';
import { ApplicationSettingsService } from 'src/app/services/application-settings.service';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  componentName: string = "BOARD";
  currentSprintNumber:number
  showContent: boolean = false;
  teamData: TeamDataId[] = [];
  selectedTeamId: string;
  teamCurrentSprintNumber: number = -100;
  sprintData: Sprint;
  currentSprintName: string;
  accessLevel: number;
  showTeams: boolean = false;
  teams: [];

  constructor(public authService: AuthService, public navbarHandler: NavbarHandlerService, public backendService: BackendService, public applicationSettingsService: ApplicationSettingsService) { }

  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
    this.navbarHandler.addToNavbar(this.componentName);

    // Efficient for now
    this.accessLevel = 0;
    this.authService.afauth.user.subscribe(data =>{
      this.authService.userAppSettingObservable.subscribe(data => {
        if(data.AppKey) {
          this.accessLevel = 1;
          this.selectedTeamId = data.TeamId;
          this.backendService.organizationsData.subscribe(data => {
            if(data.length) {
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
        if(element.TeamId == this.selectedTeamId) {
          this.teamCurrentSprintNumber = element.CurrentSprintId;
          this.currentSprintNumber=element.CurrentSprintId;
        }
      });
      this.readSprintData();
    });
  }

  getSprintDetails(teamId: string) {
    this.showContent = false;
    this.selectedTeamId = teamId;
    this.readApplicationData();
    // this.readSprintData();
  }

  readSprintData() {
    this.showContent = false;
    this.applicationSettingsService.getSprintsDetails(this.selectedTeamId, this.teamCurrentSprintNumber).subscribe(sprints => {
      this.sprintData = sprints[0];
      this.currentSprintName = "S" + this.sprintData.SprintNumber;
      this.showContent = true;
    });
  }

  changeSprintNumber(filterSprintNumber: any) {
    console.log(filterSprintNumber);
    this.teamCurrentSprintNumber = filterSprintNumber;
    this.currentSprintName = "S"+this.teamCurrentSprintNumber;
    this.readSprintData();
  }
}
