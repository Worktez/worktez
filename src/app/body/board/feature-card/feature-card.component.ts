import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationSettingsService } from 'src/app/services/application-settings.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.css']
})
export class FeatureCardComponent implements OnInit {

  @Input('cardName') cardName: string;
  @Input('currentSprintNumber') currentSprintNumber: number;


  constructor(public applicationSettingsService: ApplicationSettingsService, public backendService: BackendService) { }

  ngOnInit(): void {
  }
}
