import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BackendService } from 'src/app/services/backend/backend.service';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @Input("teamName") teamName: string;
  @Input("teamMembers") teamMembers: string[];
  @Input("teamManager") teamManager: string;
  @Input("teamDescription") teamDescription: string;
  @Input("isUpdateTeam") isUpdateTeam: boolean;
  @Output() addedMember = new EventEmitter<{ completed: boolean, memberEmail: string }>();

  componentName: string = "ADD-MEMBER";
  organizationDomain: string
  memberEmail: string
  enableLoader: boolean = false;
  showClose: boolean = false;
  add: boolean = false;

  constructor(public backendService: BackendService,private functions: AngularFireFunctions) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.isUpdateTeam == true) {
      this.addUpdateTeam();
    } else {
      this.addCreateTeam();
    }
  }

async addUpdateTeam() {
  this.organizationDomain = this.backendService.getOrganizationDomain();
  this.enableLoader = true;
  const callable = this.functions.httpsCallable('teams');
  try {
    const result = await callable({ mode: "add-member", OrganizationDomain: this.organizationDomain, TeamName: this.teamName, TeamMembers: this.teamMembers, Add: this.memberEmail, TeamManager: this.teamManager , TeamDescription: this.teamDescription }).toPromise();
    console.log(result);
    this.enableLoader = false;
    this.showClose = true;
  } catch (error) {
    this.enableLoader = false;
    console.error("Error", error);
  }
}

addCreateTeam() {
  this.add= true;
  this.showClose = true;
}

  added() {
    if (this.add == true) {
      this.addedMember.emit({ completed: true, memberEmail: this.memberEmail});
    } else {
      this.addedMember.emit({ completed: true, memberEmail: ""});
    }
  }
}
