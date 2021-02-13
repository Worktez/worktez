import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ApplicationSettingsService } from 'src/app/services/application-settings.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-create-new-organization',
  templateUrl: './create-new-organization.component.html',
  styleUrls: ['./create-new-organization.component.css']
})
export class CreateNewOrganizationComponent implements OnInit {

  profilePic: File = null;
  showCustomLabel: boolean = false

  orgLabels: { Name: string, Domain: string, Email: string, Description: string } = {
    Name: "",
    Domain: "",
    Email: "",
    Description: "",
  }

  team: { Id: string, Name: string, Description: string, ManagerEmail: string, Members: string } = {
    Id: "",
    Name: "",
    Description: "",
    ManagerEmail: "",
    Members: ""
  }


  statusLabels: { IceBox: boolean, ReadyToStart: boolean, UnderProgess: boolean, Blocked: boolean, Completed: boolean } = {
    IceBox: false,
    ReadyToStart: false,
    UnderProgess: false,
    Blocked: false,
    Completed: false
  }
  priorityLabels: { Low: boolean, Medium: boolean, High: boolean } = {
    Low: false,
    Medium: false,
    High: false
  }
  difficultyLabels: { Low: boolean, Medium: boolean, High: boolean } = {
    Low: false,
    Medium: false,
    High: false
  }
  taskLabels: { Bug: boolean, Story: boolean, SubTask: boolean, CustomLabel: string } = {
    Bug: false,
    Story: false,
    SubTask: false,
    CustomLabel: ""
  }

  step: number = 1
  enableLoader: boolean = false

  constructor(public location: Location, public appSettings: ApplicationSettingsService, public validationService: ValidationService, private functions: AngularFireFunctions) { }

  ngOnInit(): void {
  }

  backToDashboard() {
    this.location.back()
  }

  handleFileInput(files: FileList) {
    this.profilePic = files.item(0);
    console.log(this.profilePic);
  }

  async nextStep() {
    if (this.step === 1) {
      let data = [{ label: "organizationName", value: this.orgLabels.Name },
      { label: "organizationDomain", value: this.orgLabels.Domain },
      { label: "organizationEmail", value: this.orgLabels.Email }];
      var condition = await (this.validationService.checkValidity(data)).then(res => {
        return res;
      });
      if (condition) {
        console.log("Inputs are valid");
        this.createNewOrganization();
      }
      else {
        console.log("Organization not created! Validation error");
      }
    }
    if (this.step === 2) {
      let data = [
        { label: "teamName", value: this.team.Name },
        { label: "teamId", value: this.team.Id },
        { label: "teamDescription", value: this.team.Description },
        { label: "teamManagerEmail", value: this.team.ManagerEmail },
        { label: "teamMemberEmails", value: this.team.Members }
      ];

      var condition = await (this.validationService.checkValidity(data)).then(res => {
        return res;
      });
      if (condition) {
        console.log("Inputs are valid");
        this.createNewTeam();
      }
      else {
        console.log("Team not created! Validation error");
      }
    }
    if (this.step === 3) {
      // let data = [{ label: "organizationName", value: this.orgLabels.Name },
      // { label: "organizationDomain", value: this.orgLabels.Domain },
      // { label: "organizationEmail", value: this.orgLabels.Email }];
      // var condition = await (this.validationService.checkValidity(data)).then(res => {
      //   return res;
      // });
      if (true) {
        console.log("Inputs are valid");
        this.createOrganizationLabels();
      }
      else {
        console.log("Labels have not setup! Validation error");
      }
      console.log(this.statusLabels);
      console.log(this.priorityLabels);
      console.log(this.difficultyLabels);
      console.log(this.taskLabels);
    }
  }

  prevStep() {
    this.step -= 1
  }

  async createNewOrganization() {
    this.enableLoader = true;
    const callable = this.functions.httpsCallable('createNewOrganization');

    try {
      const result = await callable(this.orgLabels).toPromise();
      console.log("Successfully created the Organization");
      console.log(result);
      this.step += 1
      this.enableLoader = false;
    } catch (error) {
      this.enableLoader = false;
      console.error("Error", error);
    }
  }
  async createNewTeam() {
    this.enableLoader = true;
    let teamMemberEmailArray = []
    this.team.Members.split(",").map(member => {
      teamMemberEmailArray.push(member.trim());
    })

    const callable = this.functions.httpsCallable('createNewTeam');

    try {
      const result = await callable({ Team: this.team, TeamMemberEmails: teamMemberEmailArray, OrganizationEmail: this.orgLabels.Email }).toPromise();
      console.log("Successfully created the Team");
      console.log(result);
      this.step += 1
      this.enableLoader = false;
    } catch (error) {
      this.enableLoader = false;
      console.error("Error", error);
    }
  }
  async createOrganizationLabels() {
    this.enableLoader = true;
    const callable = this.functions.httpsCallable('createOrganizationLabels');

    try {
      const result = await callable({ StatusLabels: this.statusLabels, PriorityLabels: this.priorityLabels, DifficultyLabels: this.difficultyLabels, TaskLabels: this.taskLabels }).toPromise();
      console.log("Successfully created the Organization Labels");
      console.log(result);
      this.enableLoader = false;
    } catch (error) {
      this.enableLoader = false;
      console.error("Error", error);
    }
  }
}

