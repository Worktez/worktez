import { Component, OnInit, ViewChild } from '@angular/core';
import { Sprint, SprintDataId, TeamDataId } from 'src/app/Interface/TeamInterface';
import { ApplicationSettingsService } from 'src/app/services/application-settings.service';
import { BackendService } from 'src/app/services/backend.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  componentName: string = "BOARD";

  showContent: boolean = false;
  teamData: TeamDataId[] = [];
  selectedTeamId: string = "Dev";
  teamCurrentSprintNumber: number;
  sprintData: Sprint;
  currentSprintName: string;

  constructor(public navbarHandler: NavbarHandlerService, public backendService: BackendService, public applicationSettingsService: ApplicationSettingsService) { }

  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
    this.navbarHandler.addToNavbar(this.componentName);

    // Efficient for now
    this.readApplicationData();
  }

  readApplicationData() {
      this.applicationSettingsService.getTeamDetails().subscribe(teams => {
        this.teamData = teams;
        teams.forEach(element => {
          if(element.TeamId == this.selectedTeamId) {
            this.teamCurrentSprintNumber = element.CurrentSprintId;
          }
        });
        this.readSprintData();
      });
  }

  setSprintDetails(teamId: string, currentSprintId: number) {
    this.selectedTeamId = teamId;
    this.teamCurrentSprintNumber = currentSprintId;
    this.readSprintData();
  }

  readSprintData() {
    this.showContent = false;
    this.applicationSettingsService.getSprintsDetails(this.selectedTeamId, this.teamCurrentSprintNumber).subscribe(sprints => {
      this.sprintData = sprints[0];
      this.currentSprintName = "S"+this.sprintData.SprintNumber;
      this.showContent = true;
    });
  }

  changeSprintNumber(filterSprintNumber: any){
    console.log(filterSprintNumber);
    this.teamCurrentSprintNumber = filterSprintNumber;
    this.currentSprintName = "S"+this.teamCurrentSprintNumber;
    this.readSprintData();
  }
}
