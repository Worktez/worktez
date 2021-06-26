import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-create-new-organization',
  templateUrl: './create-new-organization.component.html',
  styleUrls: ['./create-new-organization.component.css']
})
export class CreateNewOrganizationComponent implements OnInit {

  componentName: string = "CREATE-NEW-ORGANIZATION"

  enableLoader: boolean = false
  step: number = 1
  orgDomain: string

  constructor(public location: Location, public appSettings: ApplicationSettingsService, public validationService: ValidationService, private functions: AngularFireFunctions) { }

  ngOnInit(): void { }

  changeStepAndGetOrg(data: { step: number, organizationDomain: string }) {
    this.step = data.step
    this.orgDomain = data.organizationDomain
  }
  onTeamFormSubmitted(data: { submitted: boolean }) {
    this.enableLoader = data.submitted
  }
}

