import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamDataId } from 'src/app/Interface/TeamInterface';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';

declare var jQuery:any;

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
  isUpdateTeam: boolean = false;
  addMemberEnabled: boolean = false;
  teamName: string;
  teamId: string;
  teamDescription: string = "";
  teamManagerEmail: string;
  teamMembers: string[] = [];
  enableLoader: boolean = false;
  @Input('teamId') selectedTeamId: string;
  @Output() teamCreated = new EventEmitter<{ completed: boolean }>();
  @Output() teamUpdated = new EventEmitter<{ completed: boolean }>();

  constructor(private route: ActivatedRoute, private functions: AngularFireFunctions, public validationService: ValidationService, private router: Router,private authService: AuthService, private location: Location, public applicationSettings: ApplicationSettingsService, public backendService: BackendService, public toolsService: ToolsService, public popUpHandlerService: PopupHandlerService) { }

  ngOnInit(): void {
    this.authService.afauth.user.subscribe(data => {
      this.authService.userAppSettingObservable.subscribe(data => {
        if (data.SelectedOrgAppKey) {
          this.backendService.organizationsData.subscribe(data => {
            this.loadData();
          });
        }
      });
    });
  }

  loadData() {
    this.appKey = this.authService.getAppKey();
    this.backendService.getOrgDetails(this.appKey);
    this.organizationDomain = this.backendService.getOrganizationDomain();
    this.teamAdmin = this.authService.getUserEmail();
    this.uid = this.authService.getLoggedInUser();

    if (this.selectedTeamId != undefined) {
      this.isUpdateTeam = true;
      this.applicationSettings.getTeamDetails(this.selectedTeamId).subscribe(team => {
        this.teamName = team.TeamName;
        this.teamId = team.TeamId;
        this.teamDescription = team.TeamDescription;
        this.teamManagerEmail = team.TeamManagerEmail;
        this.teamMembers = team.TeamMembers;
      });
    }
  }

  handleIdInput() {
    this.teamId = this.teamName.slice(0, 3);
  }

  type: string[] = ["Bug", "Story", "Sub Task"]
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
    if (data.memberEmail) {
      this.teamMembers.push(data.memberEmail);
    }
    this.addMemberEnabled = false;
  }

  async removeMember(remove: string) {
    if (this.isUpdateTeam === true) {
      await this.removeMemberDB(remove);
    }
    const index = this.teamMembers.indexOf(remove);
    if (index != -1) {
      this.teamMembers.splice(index, 1);
    } else {
      console.log("Error- Cannot remove member. Member not found");
    }
  }

  async removeMemberDB(remove: string) {
    this.enableLoader = true;
    const callable = this.functions.httpsCallable('teams/removeMember');
    if (this.organizationDomain == undefined) {
      this.organizationDomain = this.backendService.getOrganizationDomain();
    }
    try {
      const result = await callable({OrganizationDomain: this.organizationDomain, TeamName: this.teamName, TeamMembers: this.teamMembers, Remove: remove}).toPromise();
      this.enableLoader = false;
    } catch (error) {
      this.enableLoader = false;
      console.error("Error", error);
    }  
  }

  async createNewTeamWithLabels() {
    this.enableLoader = true;
    // this.teamFormSubmitted.emit({ submitted: true })
    const callable = this.functions.httpsCallable('teams/createTeam');
    if (this.organizationDomain == undefined) {
      this.organizationDomain = this.backendService.getOrganizationDomain();
    }

    try {
      const result = await callable({OrganizationDomain: this.organizationDomain, TeamName: this.teamName, TeamId: this.teamId, TeamDescription: this.teamDescription, TeamAdmin: this.teamAdmin, TeamManagerEmail: this.teamManagerEmail, TeamMembers: this.teamMembers, TypeLabels: this.type, StatusLabels: this.statusLabels, PriorityLabels: this.priorityLabels, DifficultyLabels: this.difficultyLabels, Uid: this.uid, OrganizationAppKey: this.appKey }).toPromise();
      this.enableLoader = false;
      // this.teamFormSubmitted.emit({ submitted: false });
      jQuery('#createNewTeam').modal('hide');
      jQuery('#form').trigger("reset");
      this.teamCreated.emit({ completed: true });
      this.router.navigate(['MyDashboard']);
    } catch (error) {

      this.enableLoader = false;
      console.error("Error", error);
    }
  }

  async updateExistingTeam() {
    this.enableLoader = true;
    // this.teamFormSubmitted.emit({ submitted: true })
    const callable = this.functions.httpsCallable('teams/updateTeam');
    if (this.organizationDomain == undefined) {
      this.organizationDomain = this.backendService.getOrganizationDomain();
    }

    try {
      const result = await callable({OrganizationDomain: this.organizationDomain, TeamName: this.teamName, TeamId: this.teamId, TeamDescription: this.teamDescription, TeamManagerEmail: this.teamManagerEmail, TypeLabels: this.type, StatusLabels: this.statusLabels, PriorityLabels: this.priorityLabels, DifficultyLabels: this.difficultyLabels }).toPromise();
      this.enableLoader = false;
      // this.teamFormSubmitted.emit({ submitted: false });
      jQuery('#createNewTeam').modal('hide');
      jQuery('#form').trigger("reset");
      this.teamUpdated.emit({ completed: true });
      this.router.navigate(['MyDashboard']);
    } catch (error) {

      this.enableLoader = false;
      console.error("Error", error);
    }
  }

  close() {
    jQuery('#createNewTeam').modal('hide');
    jQuery('#form').trigger("reset");
    this.teamCreated.emit({ completed: true });
    this.teamUpdated.emit({ completed: true });
  }
}
