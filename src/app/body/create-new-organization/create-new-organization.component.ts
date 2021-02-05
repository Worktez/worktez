import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-new-organization',
  templateUrl: './create-new-organization.component.html',
  styleUrls: ['./create-new-organization.component.css']
})
export class CreateNewOrganizationComponent implements OnInit {

  orgName: string
  orgEmail: string

  step: number = 1
  email: string

  constructor(public location: Location) { }

  ngOnInit(): void {
  }
  backToDashboard() {
    this.location.back()
  }
  nextStep() {
    this.step += 1
  }
  prevStep() {
    this.step -= 1
  }
  onSubmit() {

  }
}
