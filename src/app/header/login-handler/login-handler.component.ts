import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/Interface/UserInterface';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-login-handler',
  templateUrl: './login-handler.component.html',
  styleUrls: ['./login-handler.component.css']
})
export class LoginHandlerComponent implements OnInit {
  user: User
  public userObservable: Observable<User>

  organizationAvailable: boolean = false;
  constructor(public authService: AuthService, public router: Router, public backendService: BackendService) { }

  ngOnInit(): void {
    this.userObservable = this.authService.afauth.user.pipe(map(action => {
      const data = action as User;
      this.user = data
      this.authService.user = data;
      this.authService.getUserSettings();
      return { ...data }
    })
    );
  }

}
