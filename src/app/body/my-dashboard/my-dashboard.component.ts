import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { User } from 'src/app/Interface/UserInterface';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler.service';

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

  currentSprintNumber: number;
  currentSprintName: string;

  constructor(public router: Router, public authService: AuthService, public backendService: BackendService, public navbarHandler: NavbarHandlerService) { }

  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
    this.navbarHandler.addToNavbar(this.componentName);
    this.backendService.getCurrentSprint().subscribe(data => {
      this.currentSprintNumber = data.CurrentSprintId;
      this.currentSprintName = "S" + this.currentSprintNumber;
    });
    this.readUser();
  }
  
  readUser() {
    this.userObservable = this.authService.afauth.user.pipe(map(action => {
      const data = action as User;
      this.user = data;
      if (data == null) {
        this.router.navigate(['/Board']);
      }
      this.username = data.displayName;
      return { ...data }
    }));
  }
}
