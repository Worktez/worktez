import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string
  password: string
  username: string
  showPassword: boolean = false
  componentName: string = "LOGIN"

  constructor(public authService: AuthService, public router: Router, public navbarHandler: NavbarHandlerService, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
  }

  onSignInWithGoogle() {
    this.authService.googleSignIn().then(() => {
      this.navigateToDashboard();
    }).catch((err) => {
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError");
      console.log(err);
    });
  }

  onLogOut() {
    this.authService.logout().then(() => {
      this.navigateToDashboard();
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSignUpWithEmail() {
    this.authService.createUser(this.email, this.password, this.username).then(() => {
      this.navigateToDashboard();
    }).catch((err) => {
      console.log(err.message);
    });
  }

  onLoginWithEmail() {
    this.authService.loginUser(this.email, this.password).then(() => {
      this.navigateToDashboard();
    }).catch((err) => {
      console.log(err.message);
    });;
  }

  navigateToDashboard() {
    this.router.navigate(['']);
  }

  onSignUpWithOrg() {
    this.router.navigate(['/CreateNewOrganization']);
  }
}
