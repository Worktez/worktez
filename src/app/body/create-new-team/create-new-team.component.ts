import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamDataId } from 'src/app/Interface/TeamInterface';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-new-team',
  templateUrl: './create-new-team.component.html',
  styleUrls: ['./create-new-team.component.css']
})
export class CreateNewTeamComponent implements OnInit {
  componentName: string = "CREATE-NEW-TEAM"

  organizationDomain: string
  appKey: string
  childStep: number = 1
  teamAdmin: string
  uid: string
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

  constructor(private route: ActivatedRoute, private functions: AngularFireFunctions, public validationService: ValidationService, private router: Router,private authService: AuthService, private location: Location, public applicationSettings: ApplicationSettingsService, public backendService: BackendService, public toolsService: ToolsService) { }

  ngOnInit(): void {
    this.appKey = this.authService.getAppKey();
    this.backendService.getOrgDetails(this.appKey);
    this.organizationDomain = this.backendService.getOrganizationDomain();
    this.teamAdmin = this.authService.getUserEmail();
    this.uid = this.authService.getLoggedInUser();
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

  type: string[] = ["Bug", "Story", "Sub Task"]
  statusLabels: string[] = ["0@@Ice Box", "1@@Ready to start", "2@@Under Progress", "3@@Blocked", "4@@Completed"]
  priorityLabels: string[] = ["2@@High", "1@@Medium", "0@@Low"]
  difficultyLabels: string[] = ["2@@High", "1@@Medium", "0@@Low"]

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
      this.labelFunc(isChecked, labelValue, this.type)
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
    // this.teamFormSubmitted.emit({ submitted: true })
    const callable = this.functions.httpsCallable('teams');
    if (this.organizationDomain == undefined) {
      this.organizationDomain = this.backendService.getOrganizationDomain();
    }

    try {
      const result = await callable({ mode: "create", OrganizationDomain: this.organizationDomain, TeamName: this.teamName, TeamId: this.teamId, TeamDescription: this.teamDescription, TeamAdmin: this.teamAdmin, TeamManagerEmail: this.teamManagerEmail, TeamMembers: this.teamMembers, TypeLabels: this.type, StatusLabels: this.statusLabels, PriorityLabels: this.priorityLabels, DifficultyLabels: this.difficultyLabels, Uid: this.uid, OrganizationAppKey: this.appKey }).toPromise();
      console.log(result);
      this.enableLoader = false;
      // this.teamFormSubmitted.emit({ submitted: false });
      this.router.navigate(['MyDashboard']);
    } catch (error) {

      this.enableLoader = false;
      console.error("Error", error);
    }
  }

  async updateExistingTeam() {
    this.enableLoader = true;
    // this.teamFormSubmitted.emit({ submitted: true })
    const callable = this.functions.httpsCallable('teams');
    if (this.organizationDomain == undefined) {
      this.organizationDomain = this.backendService.getOrganizationDomain();
    }

    try {
      const result = await callable({ mode: "update", OrganizationDomain: this.organizationDomain, TeamName: this.teamName, TeamId: this.teamId, TeamDescription: this.teamDescription, TypeLabels: this.type, StatusLabels: this.statusLabels, PriorityLabels: this.priorityLabels, DifficultyLabels: this.difficultyLabels }).toPromise();
      console.log(result);
      this.enableLoader = false;
      // this.teamFormSubmitted.emit({ submitted: false });
      this.router.navigate(['MyDashboard']);
    } catch (error) {

      this.enableLoader = false;
      console.error("Error", error);
    }
  }

  close() {
    // this.location.back();
    this.router.navigate(["MyDashboard"]);
  }
}
