/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* Author: Abhishek Mishra <am1426620@gmail.com>
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/ 

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/Interface/TeamInterface';
import { MemberData } from 'src/app/Interface/UserInterface';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { RBAService } from 'src/app/services/RBA/rba.service';
import { TeamServiceService } from 'src/app/services/team/team-service.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { User } from 'src/app/Interface/UserInterface';

@Component({
  selector: 'app-members-access',
  templateUrl: './members-access.component.html',
  styleUrls: ['./members-access.component.css']
})
export class MembersAccessComponent implements OnInit {
  @Input('members') members : MemberData[]
  memberRole: string
  enableLoader:  boolean = false;
  organizationDomain: string
  membersEmail = []
  team: Team;
  user:User;
  teamId: string;
  memberCard: boolean = true;
  deleteAccess: boolean = false;
  componentName:string ="MEMBER-ACCESS";
  memberToBeDeleted:string;


  constructor(public userService: UserServiceService, public rbaService: RBAService, private functions: AngularFireFunctions, private backendService: BackendService,   public errorHandlerService: ErrorHandlerService, private teamService: TeamServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {    
    if(this.rbaService.isAdmin == true) {
      this.deleteAccess = true;
    }
    this.members.forEach((element)=>{ 
      if(this.membersEmail.includes(element.Email)){
      }else{
        this.membersEmail.push(element.Email)
      }
      })
  }

  confirmDeleteMember(email:string){
    this.memberToBeDeleted = email;
  }

  removeOrgMember(remove: string) {
    this.enableLoader = true;
    const callable = this.functions.httpsCallable('organization/removeOrgMember');
    
    if (this.organizationDomain == undefined) {
      this.organizationDomain = this.backendService.getOrganizationDomain();
    }
    callable({OrganizationDomain: this.organizationDomain, OrgMembers: this.membersEmail, Remove: remove}).subscribe({
      next: (data) => {
        this.getOrgMembers(this.organizationDomain);
        this.enableLoader = false;
        const index = this.membersEmail.indexOf(remove);
        if (index != -1) {
          this.membersEmail.splice(index, 1);
          console.log("Successfully removed member");
        } else {
          console.log("Error- Cannot remove member. Member not found");
        }
        this.teamService.getTeams(this.organizationDomain);
      },
      error: (error) => {
        this.enableLoader = false;
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        
      },
      complete: () => console.info('Successful ')
    });
  }  

  getOrgMembers(orgDomain: string){
    this.rbaService.getAllOrgMembers(orgDomain).subscribe({
      next: (data) => {
        this.members = data
      },
      error: (error) => {
        console.error(error)
      },
      complete: () => {
        console.log("Completed fetching members list")
      }
    });   
  }
}

