import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Team, TeamDataId } from 'src/app/Interface/TeamInterface';
import { User } from 'src/app/Interface/UserInterface';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashBoardComponent implements OnInit {

  componentName: string = "MY-DASHBOARD"

  user: User
  username: string
  userObservable: Observable<User>
  showContent: boolean = false;
  teamData: TeamDataId[] = [];

  currentSprintName: string;

  selectedTeamId: string = "Dev";
  teamCurrentSprintNumber: number;

  constructor(public router: Router, public authService: AuthService, public backendService: BackendService, public navbarHandler: NavbarHandlerService, public applicationSettingsService: ApplicationSettingsService) { }

  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
    this.navbarHandler.addToNavbar(this.componentName);

    this.readUser();
  }

  readApplicationData() {
    this.applicationSettingsService.getTeamDetails().subscribe(teams => {
          this.teamCurrentSprintNumber = teams[0].CurrentSprintId;
          this.currentSprintName = "S" + this.teamCurrentSprintNumber;
    });
  }
  
  readUser() {
    this.userObservable = this.authService.afauth.user.pipe(map(action => {
      const data = action as User;
      this.user = data;
      if (data == null) {
        this.router.navigate(['/Board']);
      } else {
      this.authService.userAppSettingObservable.subscribe(data => {
        if(data.AppKey) {
          this.selectedTeamId = data.TeamId;
          this.backendService.organizationsData.subscribe(data => {
            if(data.length)
            this.readApplicationData();
          });
        }
      });
    }
      this.username = data.displayName;
      return { ...data }
    }));
  }
}
