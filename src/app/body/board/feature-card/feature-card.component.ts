import { Component, Input, OnInit } from '@angular/core';
import { ApplicationSettingsService } from 'src/app/services/application-settings.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.css']
})
export class FeatureCardComponent implements OnInit {

  @Input('cardName') cardName: string;

  selected: boolean = false;
  hovering: boolean = false;

  constructor(public applicationSettingsService: ApplicationSettingsService, public backendService: BackendService) { }

  ngOnInit(): void {
  }

  highlightSelectedTeam(selectedTeamId: string) {
    if(this.cardName == selectedTeamId) {
      this.selected = true;
    } else {
      this.selected = false;
    }
  }
}
