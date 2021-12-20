import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/Interface/TeamInterface';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-teams-card',
  templateUrl: './teams-card.component.html',
  styleUrls: ['./teams-card.component.css']
})
export class TeamsCardComponent implements OnInit {

  @Input('team') team: Team

  @Output() updatedDetails = new EventEmitter<boolean>();

  addMemberEnabled: boolean = false
  teamToAddMember: Team

  constructor(public router: Router, private functions: AngularFireFunctions, public backendService: BackendService) { }

  ngOnInit(): void {}

  updateTeam(TeamId: string) {
    this.router.navigate(['/UpdateTeam', TeamId]);
  }

  async deleteTeam() {
    const orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable('teams/deleteTeam');
    try {
      const result = await callable({OrganizationDomain: orgDomain, TeamName: this.team.TeamName, TeamId: this.team.TeamId}).toPromise();
      this.team.TeamStatus = -1;
    } catch (error) {
      console.error("Error", error);
    }
  }

  enableAddMember(team: Team) {
    this.teamToAddMember = team;
    this.addMemberEnabled = true;
  }

  addedMember(data: { completed: boolean, memberEmail: string }) {
    this.updatedDetails.emit(true);
    this.addMemberEnabled = false;
  }
}
