import { Component, Input, OnInit } from '@angular/core';
import { defaultLabel, Label } from 'src/app/Interface/TeamInterface';
import { TeamServiceService } from 'src/app/services/team/team-service.service';

@Component({
  selector: 'app-get-icon',
  templateUrl: './get-icon.component.html',
  styleUrls: ['./get-icon.component.css']
})
export class GetIconComponent implements OnInit {

  @Input('DisplayName') displayName: string;
  @Input('Border') border: boolean;
  @Input('TeamId') teamId: string;
  @Input('Scope') scope: string;


  icon: Label;
  iconReady: boolean = false;

  constructor(private teamService: TeamServiceService) { }

  ngOnInit(): void {
    if(this.teamService.labelsReady)
      this.getlabelProperties();
    else {
      this.teamService.teamLabelDataStateObservable.subscribe({
        next: () => {
          this.getlabelProperties();
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log("Completed getting labels");
        }
      })
    }
  }

  getlabelProperties() {
    if(this.teamService.teamsLabelsJson.length != 0 && this.teamService.teamsLabelsJson[this.teamId][this.scope][this.displayName] != undefined) {
      const label = this.teamService.teamsLabelsJson[this.teamId][this.scope][this.displayName];
      this.icon = label;
      this.iconReady = true;
    } else {
      const label = defaultLabel;
      this.icon = label;
      this.iconReady = true;
    }
  }

}
