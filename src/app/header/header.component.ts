import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend/backend.service';
import { PopupHandlerService } from '../services/popup-handler/popup-handler.service';
import { User } from '../Interface/UserInterface';
import { AngularFireFunctions } from '@angular/fire/compat/functions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  uid: string;
  isHomePage: boolean = false;

  constructor(public functions: AngularFireFunctions, public router: Router, public backendService: BackendService, public authService: AuthService, public popupHandlerService: PopupHandlerService) { }

  ngOnInit(): void {
    console.log(this.router.url);
    if (this.router.url == '/')  {
      this.isHomePage = true;
    } else { 
      this.isHomePage = false;
    }
    this.authService.afauth.user.subscribe((action) => {
      const data = action as User;
      if(data) {
        this.uid = data.uid;
      }
    }, (error) => {
      console.log(error);
    });
  }

  async setNewOrg(orgDomain: string, orgAppKey: string, selectedTeam: string) {
    const callable = this.functions.httpsCallable("users/setMyOrganization");
    await callable({Uid: this.uid, OrgDomain: orgDomain, OrgAppKey: orgAppKey, SelectedTeam: selectedTeam}).toPromise();
    window.location.reload()
  }

  startNewSprint() {
    this.popupHandlerService.createNewSprintEnabled= true;
  }

  createNewTask() {
    this.popupHandlerService.createNewTaskEnabled= true;
    this.popupHandlerService.resetTaskIds();
  }

  Board() {
    this.router.navigate(['/Board']);
  }

  myDashBoard() {
    this.router.navigate(["/MyDashboard"])
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
