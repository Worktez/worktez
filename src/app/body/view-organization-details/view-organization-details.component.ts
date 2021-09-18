import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Organizations } from 'src/app/Interface/OrganizationInterface';
import { Team } from 'src/app/Interface/TeamInterface';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';

@Component({
  selector: 'app-view-organization-details',
  templateUrl: './view-organization-details.component.html',
  styleUrls: ['./view-organization-details.component.css']
})
export class ViewOrganizationDetailsComponent implements OnInit {

  organization: Organizations;
  teams: Team[] = []
  showLoader: boolean = false;
  showOrgDetails: boolean = true;
  addMemberEnabled: boolean = false;
  teamToAddMember: Team;

  constructor(public backendService: BackendService, public authService: AuthService, public applicationSettingsService: ApplicationSettingsService, public router: Router, public navbarHandler: NavbarHandlerService) { }

  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
    this.navbarHandler.addToNavbar("ORGANIZATION DETAILS");
    this.getOrganizationDetails();
  }

  getOrganizationDetails() {
    this.showLoader = true;
    const appKey = this.authService.getAppKey();
    this.teams = [];
    this.backendService.getOrgDetails(appKey).subscribe(data => {
      this.organization = data[0];
      this.organization.TeamsId.forEach(teamId => {
        this.getTeamDetails(teamId);
      });
      this.showLoader = false;
    });
  }

  getTeamDetails(teamId: string) {
    this.applicationSettingsService.getTeamDetails(teamId).subscribe(data => {
      this.teams.push(data[0]);
    });
  }

  updateTeam(TeamId: string) {
    this.router.navigate(['/UpdateTeam', TeamId]);
  }

  createTeam() {
    this.router.navigate(['/CreateTeam']);
  }

  enableAddMember(team: Team) {
    this.teamToAddMember = team;
    this.addMemberEnabled = true;
  }

  addedMember(data: { completed: boolean, memberEmail: string}) {
    this.getOrganizationDetails();
    this.addMemberEnabled = false;
  }
}