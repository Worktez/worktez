import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ThemeService } from '../services/theme/theme.service';
import { BackendService } from '../services/backend/backend.service';
import { PopupHandlerService } from '../services/popup-handler/popup-handler.service';
import { User } from '../Interface/UserInterface';
import { AngularFireFunctions } from '@angular/fire/functions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  uid: string

  constructor(public functions: AngularFireFunctions, public router: Router, public backendService: BackendService, public authService: AuthService, public popupHandlerService: PopupHandlerService) { }

  ngOnInit(): void {
    this.authService.afauth.user.subscribe((action) => {
      const data = action as User;
      if(data) {
        this.uid = data.uid;
      }
    }, (error) => {
      console.log(error);
    });
  }

  setNewOrg(orgDomain: string, orgAppKey: string, selectedTeam: string) {
    const callable = this.functions.httpsCallable("users");
    callable({mode: "setMyOrganization", Uid: this.uid, OrgDomain: orgDomain, OrgAppKey: orgAppKey, SelectedTeam: selectedTeam}).toPromise();
  }

  startNewSprint() {
    this.popupHandlerService.createNewSprintEnabled= true;
  }

  createNewTask() {
    this.popupHandlerService.createNewTaskEnabled= true;
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
