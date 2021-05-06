import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';
import { Team } from 'src/app/Interface/TeamInterface';
import { OrgTeamService } from 'src/app/services/org-team.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {

  @Input("orgDomain") organizationDomain: string
  @Output() teamFormSubmitted = new EventEmitter<{ submitted: boolean }>();

  componentName: string = "TEAM-DETAILS"

  childStep: number = 1

  constructor(private functions: AngularFireFunctions, public validationService: ValidationService, private router: Router, public orgTeamService: OrgTeamService) { }

  ngOnInit(): void {
      try{
        this.orgTeamService.getTeamDetails().subscribe(
        data =>{
          this.teamName = data.TeamName;
          this.teamId = data.TeamId;
          this.teamDescription = data.TeamDescription;
          this.teamManagerEmail = data.TeamManagerEmail;
          this.teamMembers = data.TeamMembers.join(',');
      }, error=>{
          throw error;
        }
    );}catch(error){
      console.log("Team does not exist");
    }
  }

  teamDetails: Team
  teamName: string;
  teamId: string
  teamDescription: string = ""
  teamManagerEmail: string
  teamMembers: string
  teamMemberEmailArray: string[] = []

  handleIdInput() {
    this.teamId = this.teamName.slice(0, 3);
  }

  taskLabels: string[] = ["Bug", "Story", "Sub Task"]
  statusLabels: string[] = ["Ice Box", "Ready to start", "Under Progress", "Blocked", "Completed"]
  priorityLabels: string[] = ["High", "Medium", "Low"]
  difficultyLabels: string[] = ["High", "Medium", "Low"]

  labelFunc(checked: boolean, value: string, array: string[]) {
    if (checked === false) {
      for (var i = 0; i < array.length; i++) {
        if (array[i] === value) {
          array.splice(i, 1);
        }
      }
    }
    else {
      array.push(value);
    }
  }

  getLabels(event: Event) {
    let labelName = (<HTMLInputElement>event.target).name;
    let labelValue = (<HTMLInputElement>event.target).value;
    let isChecked = (<HTMLInputElement>event.target).checked;
    if (labelName === "Task") {
      this.labelFunc(isChecked, labelValue, this.taskLabels)
    }
    if (labelName === "Status") {
      this.labelFunc(isChecked, labelValue, this.statusLabels)
    };
    if (labelName === "Priority") {
      this.labelFunc(isChecked, labelValue, this.priorityLabels)
    };
    if (labelName === "Difficulty") {
      this.labelFunc(isChecked, labelValue, this.difficultyLabels)
    };
  }

  async nextChildStep() {
    let data = [
      { label: "teamName", value: this.teamName },
      { label: "teamId", value: this.teamId },
      { label: "teamDescription", value: this.teamDescription },
      { label: "teamManagerEmail", value: this.teamManagerEmail },
      { label: "teamMemberEmails", value: this.teamMembers }
    ];

    var condition = await (this.validationService.checkValidity(this.componentName, data)).then(res => {
      return res;
    });
    if (condition) {
      console.log("Inputs are valid");
      this.teamMembers.split(",").map(member => {
        this.teamMemberEmailArray.push(member.trim());
      })
      this.childStep += 1
    }
    else {
      console.log("Team not created! Validation error");
    }
  }

  prevChildStep() {
    this.childStep -= 1
  }

  submit() {
    //Functionality to Show Error When none of the option is checked in Particular labelName can be added
    this.createNewTeamWithLabels()
  }

  async createNewTeamWithLabels() {
    this.teamFormSubmitted.emit({ submitted: true })
    const callable = this.functions.httpsCallable('createNewTeamWithLabels');

    try {
      const result = await callable({ OrganizationDomain: this.organizationDomain, TeamName: this.teamName, TeamId: this.teamId, TeamDescription: this.teamDescription, TeamManagerEmail: this.teamManagerEmail, TeamMembers: this.teamMemberEmailArray, TaskLabels: this.taskLabels, StatusLabels: this.statusLabels, PriorityLabels: this.priorityLabels, DifficultyLabels: this.difficultyLabels }).toPromise();
      console.log(result);
      this.teamFormSubmitted.emit({ submitted: false });
      this.router.navigate(['login']);
    } catch (error) {
      console.error("Error", error);
    }
  }
}
