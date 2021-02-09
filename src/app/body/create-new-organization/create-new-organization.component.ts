import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApplicationSettingsService } from 'src/app/services/application-settings.service';

@Component({
  selector: 'app-create-new-organization',
  templateUrl: './create-new-organization.component.html',
  styleUrls: ['./create-new-organization.component.css']
})
export class CreateNewOrganizationComponent implements OnInit {

  profilePic: File = null;

  orgLabels: {} = {
    Name: "",
    Domain: "",
    Email: "",
    Description: "",
  }
  name: string
  id: string
  description: string
  managerEmail: string
  members: string

  statusLabels: {} = {
    IceBox: false,
    ReadyToStart: false,
    UnderProgess: false,
    Blocked: false,
    Completed: false
  }
  priorityLabels: {} = {
    Low: false,
    Medium: false,
    High: false
  }
  difficultyLabels: {} = {
    Low: false,
    Medium: false,
    High: false
  }
  step: number = 1
  enableLoader: false


  constructor(public location: Location, public appSettings: ApplicationSettingsService) {

  }

  ngOnInit(): void {
  }

  backToDashboard() {
    this.location.back()
  }

  nextStep(step: number) {

    if (step === 1) {
      console.log(this.orgLabels)
    }
    if (step === 2) {

    }
    if (step === 3) {

    }
    this.step += 1
  }

  prevStep() {
    this.step -= 1
  }

  onSubmit() {
    console.log(this.statusLabels);
    console.log(this.priorityLabels);
    console.log(this.difficultyLabels);

  }
  handleFileInput(files: FileList) {
    this.profilePic = files.item(0);
    console.log(this.profilePic);
  }
}

