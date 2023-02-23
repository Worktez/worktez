import { Component, Input, OnInit } from '@angular/core';
import { Label, Team } from 'src/app/Interface/TeamInterface';
import { TeamServiceService } from 'src/app/services/team/team-service.service';

@Component({
  selector: 'app-generate-icon',
  templateUrl: './generate-icon.component.html',
  styleUrls: ['./generate-icon.component.css']
})
export class GenerateIconComponent implements OnInit {

  @Input('team') team: Team;
  @Input('scope') scope: string;
  @Input('label') label: string;
  @Input('Border') Border: boolean = false;
  icon: Label;

  colorCode: string = "";
  constructor(private teamService: TeamServiceService) { }

  ngOnInit(): void {
    this.icon = this.teamService.teamsLabelsJson[this.team.TeamId][this.scope][this.label]
    this.colorCode = "#" + this.icon.ColorCode;
  }

}
