import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Sprint, SprintDataId, Team, TeamDataId } from 'src/app/Interface/TeamInterface';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { AuthService } from 'src/app/services/auth.service';
import { FeatureCardComponent } from './feature-card/feature-card.component';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @ViewChildren(FeatureCardComponent) child: QueryList<FeatureCardComponent>;

  componentName: string = "BOARD";
  currentSprintNumber: number = 0;
  showContent: boolean = false;
  uid: string;
  teamData: Team;
  selectedTeamId: string;
  teamCurrentSprintNumber: number = -100;
  sprintData: Sprint;
  currentSprintName: string;
  accessLevel: number;
  showTeams: boolean = false;
  teams: string[];
  sprintNotExist: boolean = false;
  teamMembers: string[];
  changeTeam: boolean = false;
  DaysUp: any;
  workPercentCalc: any;
  workPercentage: number;
  today: any = new Date();
  EDate: any;
  SDate: any;
  

  constructor(public authService: AuthService, public navbarHandler: NavbarHandlerService, public backendService: BackendService, public applicationSettingsService: ApplicationSettingsService, private functions: AngularFireFunctions) { }

  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
    this.navbarHandler.addToNavbar(this.componentName);

    this.accessLevel = 0;
    this.authService.afauth.user.subscribe(data => {
      this.authService.userAppSettingObservable.subscribe(data => {
        this.uid= data.uid;
        this.selectedTeamId= data.SelectedTeamId;
        if (data.SelectedOrgAppKey) {
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
            });
          });
        }
      });
    });
  }

  readApplicationData() {
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
      this.readSprintData();
    });
  }

  async getSprintDetails(teamId: string) {
    this.sprintNotExist = false;
    this.showContent = false;
    this.applicationSettingsService.editedTeamId = teamId;
    this.selectedTeamId = teamId;
    this.changeTeam = true;
    this.readApplicationData();
    const callable = this.functions.httpsCallable('users/updateSelectedTeam');
    try {
      const result = await callable({Uid: this.uid , SelectedTeam: this.selectedTeamId}).toPromise();
      console.log("Successful updated Selected Team in db");
    } catch (error) {
      console.log(error);
    }
  }

  readSprintData() {
    this.showContent = false;
    this.child.forEach(child => {
      child.highlightSelectedTeam(this.selectedTeamId);
    })
    if (this.teamCurrentSprintNumber != 0) {
      this.applicationSettingsService.getSprintsDetails(this.teamCurrentSprintNumber).subscribe(sprints => {
        if (sprints) {
          this.sprintData = sprints;
          this.currentSprintName = "S" + this.sprintData.SprintNumber;
          this.EDate = new Date(this.sprintData.EndDate.replace('/','-'));
          this.SDate = new Date(this.sprintData.StartDate.replace('/','-'));
          this.DaysUp = Math.abs((this.today - this.SDate)/(1000 * 60 * 60 * 24));
          if(this.today > this.EDate) {
            this.workPercentCalc = 100;
          } else if(this.today < this.SDate) {
            this.workPercentCalc = 0;
          } else {
            this.workPercentCalc = Math.abs((parseInt(this.DaysUp)) /((this.EDate - this.SDate)/(1000 * 60 * 60 * 24)) * 100);
        }
          this.workPercentage = parseInt(this.workPercentCalc);
          this.showContent = true;
        } else {
          console.log("Not existing");
          this.showContent = true;
          this.sprintNotExist = true;
        }
      });
    } else {
      this.showContent = true
      this.changeSprintNumber(-1);
    }
  }

  changeSprintNumber(filterSprintNumber: any) {
    this.teamCurrentSprintNumber = filterSprintNumber;
    this.currentSprintName = "S" + this.teamCurrentSprintNumber;
    this.applicationSettingsService.editedSprintId = filterSprintNumber;
    this.readSprintData();
  }
}