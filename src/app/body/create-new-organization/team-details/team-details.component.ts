import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamDataId } from 'src/app/Interface/TeamInterface';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { Location } from '@angular/common';

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
  teamData: TeamDataId[] = [];
  selectedTeamId: string;
  isUpdateTeam: boolean = false;
  addMemberEnabled: boolean = false;
  teamName: string;
  teamId: string;
  teamDescription: string = "";
  teamManagerEmail: string;
  teamMembers: string[] = [];
  enableLoader: boolean = false;

  constructor(private route: ActivatedRoute, private functions: AngularFireFunctions, public validationService: ValidationService, private router: Router, private location: Location, public applicationSettings: ApplicationSettingsService, public backendService: BackendService, public toolsService: ToolsService) { }

  ngOnInit(): void {
    console.log(this.router.url);
    this.selectedTeamId = this.route.snapshot.params['teamId'];
    console.log(this.selectedTeamId);
    if (this.selectedTeamId != undefined) {
      if (this.router.url.startsWith('/UpdateTeam')) {
        this.isUpdateTeam = true;
      }
      this.applicationSettings.getTeamDetails(this.selectedTeamId).subscribe(teams => {
        this.teamName = teams[0].TeamName;
        this.teamId = teams[0].TeamId;
        this.teamDescription = teams[0].TeamDescription;
        this.teamManagerEmail = teams[0].TeamManagerEmail;
        this.teamMembers = teams[0].TeamMembers;
      });
    }
  }

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
    if (this.isUpdateTeam === false) {
      this.createNewTeamWithLabels()
    } else {
      this.updateExistingTeam()
    }
  }


  addMember() {
    this.addMemberEnabled = true;
  }

  addedMember(data: { completed: boolean, memberEmail: string}) {
    if (this.isUpdateTeam === false && data.memberEmail!="") {
      this.teamMembers.push(data.memberEmail);
    }
    this.addMemberEnabled = false;
  }

  removeMember(remove: string) {
    if (this.isUpdateTeam === false) {
      const index = this.teamMembers.indexOf(remove);
      if (index != -1) {
        this.teamMembers.splice(index, 1);
      } else {
        console.log("Error- Cannot remove member. Member not found");
      }
    } else {
      this.removeMemberDB(remove)
    }
  }

  async removeMemberDB(remove: string) {
    this.enableLoader = true;
    const callable = this.functions.httpsCallable('teams');
    if (this.organizationDomain == undefined) {
      this.organizationDomain = this.backendService.getOrganizationDomain();
    }
    try {
      const result = await callable({ mode: "remove-member", OrganizationDomain: this.organizationDomain, TeamName: this.teamName, TeamMembers: this.teamMembers, Remove: remove}).toPromise();
      console.log(result);
      this.enableLoader = false;
    } catch (error) {
      this.enableLoader = false;
      console.error("Error", error);
    }  
  }

  async createNewTeamWithLabels() {
    this.enableLoader = true;
    this.teamFormSubmitted.emit({ submitted: true })
    const callable = this.functions.httpsCallable('teams');
    if (this.organizationDomain == undefined) {
      this.organizationDomain = this.backendService.getOrganizationDomain();
    }

    try {
      const result = await callable({ mode: "create", OrganizationDomain: this.organizationDomain, TeamName: this.teamName, TeamId: this.teamId, TeamDescription: this.teamDescription, TeamManagerEmail: this.teamManagerEmail, TeamMembers: this.teamMembers, TaskLabels: this.taskLabels, StatusLabels: this.statusLabels, PriorityLabels: this.priorityLabels, DifficultyLabels: this.difficultyLabels, DateOfJoining: this.toolsService.date() }).toPromise();
      console.log(result);
      this.enableLoader = false;
      this.teamFormSubmitted.emit({ submitted: false });
      this.router.navigate(['MyDashboard']);
    } catch (error) {

      this.enableLoader = false;
      console.error("Error", error);
    }
  }

  async updateExistingTeam() {
    this.enableLoader = true;
    this.teamFormSubmitted.emit({ submitted: true })
    const callable = this.functions.httpsCallable('teams');
    if (this.organizationDomain == undefined) {
      this.organizationDomain = this.backendService.getOrganizationDomain();
    }

    try {
      const result = await callable({ mode: "update", OrganizationDomain: this.organizationDomain, TeamName: this.teamName, TeamId: this.teamId, TeamDescription: this.teamDescription, TeamManagerEmail: this.teamManagerEmail, TeamMembers: this.teamMembers, TaskLabels: this.taskLabels, StatusLabels: this.statusLabels, PriorityLabels: this.priorityLabels, DifficultyLabels: this.difficultyLabels, DateOfJoining: this.toolsService.date() }).toPromise();
      console.log(result);
      this.enableLoader = false;
      this.teamFormSubmitted.emit({ submitted: false });
      this.router.navigate(['MyDashboard']);
    } catch (error) {

      this.enableLoader = false;
      console.error("Error", error);
    }
  }

  close() {
    this.location.back();
  }
}
