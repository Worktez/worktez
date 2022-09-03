import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { BackendService } from '../backend/backend.service';
import { map, Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { MemberData } from 'src/app/Interface/UserInterface';

@Injectable({
  providedIn: 'root'
})
export class RBAService {
  componentName:string = "ROLE-BASED-ACCESS"
  public isRbaReady: boolean = false;
  public isAdmin: boolean = true;
  public memberData: MemberData[];
  public members: [];
  userEmail: string = "";
  constructor(private backendService: BackendService, public authService: AuthService, private functions: AngularFireFunctions ) { }
  
  

  getRbaDetails() {
    const orgDomain = this.backendService.organizationDetails.OrganizationDomain;
    this.userEmail= this.authService.userAppSetting.email;
    console.log(orgDomain, this.userEmail);
    const callable = this.functions.httpsCallable("organization/getMemberDetails");
     callable({OrgDomain: orgDomain, Email: this.userEmail}).pipe(
      map(actions => {
        return actions.memberData as MemberData[];
    })).subscribe({
      next: (data) =>{
        console.log(data)
        this.memberData = data;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => console.log("Getting Organisation Member Details Complete")
    })   
  }

  getAllOrgMembers(orgDomain: string) {
    console.log(orgDomain);
    const callable = this.functions.httpsCallable("organization/getAllOrgMembers");
    const members = callable({OrgDomain: orgDomain}).pipe(
      map(actions => {
        this.members = actions.membersData
        return actions.membersData;
    })); 
    return members
  }
}



