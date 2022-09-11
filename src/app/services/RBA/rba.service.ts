import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { map } from 'rxjs';
import { AuthService } from '../auth.service';
import { MemberData, Permissions, defaultPermissions } from 'src/app/Interface/UserInterface';

@Injectable({
  providedIn: 'root'
})
export class RBAService {
  public isRbaReady: boolean = false;
  public isAdmin: boolean;
  public teamManager: boolean; 
  public memberData: MemberData;
  public members: MemberData[];
  public permissions: Permissions;
  userEmail: string = "";
  constructor(public authService: AuthService, private functions: AngularFireFunctions ) {
  } 
  setDefaultPermissions(){
    this.permissions= defaultPermissions as Permissions;
  }
  assignPermissions(){

    if(this.isAdmin){
      console.log("C")
      this.permissions.addMember = true;
      this.permissions.removeMember = true;
      this.permissions.createTask = true;
      this.permissions.editTask = true;
      this.permissions.deleteTask = true;
      this.permissions.createTeam = true;
      this.permissions.editTeam = true;
      this.permissions.deleteTeam = true;
      this.permissions.createSprint = true;
      this.permissions.completeSprint = true;
      this.permissions.editOrganization = true;
      this.permissions.viewMemberRoles = true;
      this.permissions.editMemberRoles = true;
      this.permissions.addDefaultLabel= true;
      this.permissions.createNewLabel= true;
      this.permissions.editLabel= true;
      this.permissions.deleteLabel= true;
      }
    
    else if(this.teamManager){
      console.log("B");
      this.permissions.addMember = true;
      this.permissions.removeMember = true;
      this.permissions.createTask = true;
      this.permissions.editTask = true;
      this.permissions.deleteTask = true;
      this.permissions.createTeam = true;
      this.permissions.editTeam = true;
      this.permissions.deleteTeam = true;
      this.permissions.createSprint = true;
      this.permissions.completeSprint = true;
      this.permissions.editOrganization = true;
      this.permissions.viewMemberRoles = true;
      this.permissions.editMemberRoles = true;
      this.permissions.addDefaultLabel= true;
      this.permissions.createNewLabel= true;
      this.permissions.editLabel= true;
      this.permissions.deleteLabel= true;
    }
      this.isRbaReady = true;
  }

  getRbaDetails(orgAppKey: string, userEmail: string) {
    this.userEmail= userEmail;
    const callable = this.functions.httpsCallable("organization/getMemberDetails");
     callable({OrgAppKey: orgAppKey, Email: this.userEmail}).pipe(
      map(actions => {
        return actions.memberData ;
    })).subscribe({
      next: (data) =>{
        this.memberData = data;
        this.isAdmin = data.IsAdmin;
        this.teamManager = data.TeamManager;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.assignPermissions();
        console.log("Getting Organisation Member Details Complete")}
    })   
  }

  getAllOrgMembers(orgDomain : string) {
    const callable = this.functions.httpsCallable("organization/getAllOrgMembers");
    return callable({OrgDomain: orgDomain}).pipe(
      map(actions => {
        const membersData = actions.membersData as MemberData[]
        this.members = membersData
        return membersData;
    }));
  }
}