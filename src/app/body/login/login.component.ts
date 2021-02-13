import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarHandlerService } from 'src/app/services/navbar-handler.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  componentName: string = "LOGIN"

  constructor(public authService: AuthService, public router: Router, public navbarHandler: NavbarHandlerService, public errorHandlerService: ErrorHandlerService) { }


  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
  }

  onSignInWithGoogle() {
    this.authService.googleSignIn().then(() => {
      this.router.navigate(['']);
    }).catch((err) => {
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError");
      console.log(err);
    });
  }

  onLogOut() {
    this.authService.logout().then(() => {
      this.router.navigate(['']);
    });
  }
}
