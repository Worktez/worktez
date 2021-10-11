import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ThemeService } from '../services/theme/theme.service';
import { BackendService } from '../services/backend/backend.service';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { MyOrganizationData, User } from '../Interface/UserInterface';
import { AngularFireFunctions } from '@angular/fire/functions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public myOrgCollectionsData: Observable<MyOrganizationData[]>
  uid: string

  constructor(public functions: AngularFireFunctions, public router: Router, public backendService: BackendService, public authService: AuthService, public themeService: ThemeService) { }

  ngOnInit(): void {
    this.authService.afauth.user.subscribe((action) => {
      const data = action as User;
      if(data) {
        this.uid = data.uid;
        this.getListedOrganizationData();
      }
    }, (error) => {
      console.log(error);
    });
  }

  getListedOrganizationData() {
    const callable = this.functions.httpsCallable("users");
    this.myOrgCollectionsData = callable({mode: "getMyOrgList", Uid: this.uid}).pipe(
      map(actions => {
        return actions.data as MyOrganizationData[];
    }));
  }

  setNewOrg(orgDomain: string, orgAppKey: string, selectedTeam: string) {
    const callable = this.functions.httpsCallable("users");
    callable({mode: "setMyOrganization", Uid: this.uid, OrgDomain: orgDomain, OrgAppKey: orgAppKey, SelectedTeam: selectedTeam}).toPromise();
  }

  startNewSprint() {
    this.router.navigate(['/StartNewSprint']);
  }

  startNewSession() {
    this.router.navigate(['/CreateNewSession']);
  }

  Board(){
    this.router.navigate(['/Board']);
  }

  myDashBoard(){
    this.router.navigate(["/MyDashboard"])
  }

  createTeam(){
    this.router.navigate(['/CreateTeam']);
  }

  updateTeam(){
    this.router.navigate(['/UpdateTeam', this.authService.getTeamId()]);
  }

  createNewOrganization() {
    this.router.navigate(['/CreateNewOrganization']);
  }

  home() {
    this.router.navigate(['/']);
  }

  organizationDetails() {
    this.router.navigate(['/ViewOrganizationDetails']);
  }

  tasksEvaluation() {
    this.router.navigate(['/TasksEvaluation']);
  }
}
