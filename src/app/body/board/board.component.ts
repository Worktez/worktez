import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Sprint, SprintDataId, Team, TeamDataId } from 'src/app/Interface/TeamInterface';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { AuthService } from 'src/app/services/auth.service';
import { FeatureCardComponent } from './feature-card/feature-card.component';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @ViewChildren(FeatureCardComponent) child: QueryList<FeatureCardComponent>;

  componentName: string = "BOARD";
  showContent: boolean = false;
  sprintData: Sprint;
  currentSprintName: string;
  sprintNotExist: boolean = false;
  DaysUp: any;
  workPercentCalc: any;
  workPercentage: number;
  today: any = new Date();
  EDate: any;
  SDate: any;

  constructor(public startService: StartServiceService, public authService: AuthService, public navbarHandler: NavbarHandlerService, public backendService: BackendService, public applicationSettingsService: ApplicationSettingsService, private functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
    this.navbarHandler.addToNavbar(this.componentName);

    if(this.startService.showTeamsData) {
      this.readSprintData();
    } else {
      this.startService.startApplication();
      this.startService.userDataStateObservable.subscribe((data) => {
        if(data){
          this.startService.applicationDataStateObservable.subscribe((data) => {
            if(data) {
              this.applicationSettingsService.teamData.subscribe((data) => {
                if(data) {
                  this.readSprintData();
                }
              });
            }
          });
        }
      });
    }
  }

  async getSprintDetails(teamId: string) {
    this.sprintNotExist = false;
    this.showContent = false;
    this.applicationSettingsService.editedTeamId = teamId;
    this.startService.selectedTeamId = teamId;
    this.startService.changeTeam = true;
    this.startService.readApplicationData();
    const callable = this.functions.httpsCallable('users/updateSelectedTeam');
    try {
      const result = await callable({Uid: this.startService.uid , SelectedTeam: this.startService.selectedTeamId}).toPromise();
      console.log("Successful updated Selected Team in db");
    } catch (error) {
      this.errorHandlerService.showError = true;
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
      console.log(error);
    }
  }

  readSprintData() {
    this.showContent = false;
    if (this.startService.teamCurrentSprintNumber != 0) {
      if(this.authService.userAppSetting.SelectedTeamId==this.applicationSettingsService.team.TeamId){
        this.applicationSettingsService.getSprintsDetails(this.startService.teamCurrentSprintNumber).subscribe(sprints => {
        this.child.forEach(child => {
          child.highlightSelectedTeam(this.startService.selectedTeamId);
        });
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
    } else{
      this.applicationSettingsService.getTeamDetails(this.authService.userAppSetting.SelectedTeamId).subscribe(data => {
        this.readSprintData();
      });
    }
  }else {
      this.showContent = true
      this.changeSprintNumber(-1);
    }
  }

  changeSprintNumber(filterSprintNumber: any) {
    this.startService.teamCurrentSprintNumber = filterSprintNumber;
    this.currentSprintName = "S" + this.startService.teamCurrentSprintNumber;
    this.applicationSettingsService.editedSprintId = filterSprintNumber;
    this.readSprintData();
  }
}