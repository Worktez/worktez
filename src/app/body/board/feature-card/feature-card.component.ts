import { Component, Input, OnInit } from '@angular/core';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.css']
})
export class FeatureCardComponent implements OnInit {

  @Input('cardName') cardName: string;

  constructor(public applicationSettingsService: ApplicationSettingsService, public backendService: BackendService) { }

  ngOnInit(): void {
  }
}
