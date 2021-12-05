import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/Interface/TeamInterface';

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

  constructor(public router: Router) { }

  ngOnInit(): void {}

  updateTeam(TeamId: string) {
    this.router.navigate(['/UpdateTeam', TeamId]);
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
