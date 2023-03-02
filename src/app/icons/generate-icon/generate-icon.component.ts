import { Component, Input, OnInit } from '@angular/core';
import { Label, defaultLabel } from 'src/app/Interface/TeamInterface';
import { TeamServiceService } from 'src/app/services/team/team-service.service';

@Component({
  selector: 'app-generate-icon',
  templateUrl: './generate-icon.component.html',
  styleUrls: ['./generate-icon.component.css']
})
export class GenerateIconComponent implements OnInit {

  @Input('teamId') teamId: string;
  @Input('scope') scope: string;
  @Input('label') label: string;
  @Input('Border') Border: boolean = false;
  icon: Label;
  iconReady: boolean = false;
  colorCode: string = "";
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
    if(this.teamService.teamsLabelsJson.length != 0 && this.teamService.teamsLabelsJson[this.teamId][this.scope][this.label] != undefined) {
      const label = this.teamService.teamsLabelsJson[this.teamId][this.scope][this.label];
      this.icon = label;
      this.colorCode = "#" + this.icon.ColorCode;
      this.iconReady = true;
    } else {
      const label = defaultLabel;
      this.icon = label;
      this.iconReady = true;
    }
  }
}
