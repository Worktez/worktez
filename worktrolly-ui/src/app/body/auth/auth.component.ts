import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  showPassword: boolean = false
  loginError: string
  signupError: string
  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.authService.resetLoginForm();
    this.authService.resetSignupForm();

  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  onSignUpWithEmail() {
    const { email, password, username } = this.authService.signupForm.value;
    this.authService.createUser(email, password, username).then(() => {
      this.navigateToDashboard();
      this.signupError = "";
    }).catch((err) => {
      this.signupError = err.message;
    });
  }
  onLoginWithEmail() {
    const { email, password } = this.authService.loginForm.value;
    this.authService.loginUser(email, password).then(() => {
      this.navigateToDashboard();
      this.loginError = "";
    }).catch((err) => {
      this.loginError = err.message;
    });;
  }
  onSignInWithGoogle() {
    this.authService.googleSignIn().then(() => {
      this.navigateToDashboard();
    }).catch((err) => {
      console.log(err);
    });
  }
  onLogOut() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
  navigateToDashboard() {
    return this.router.navigate(['/']);
  }
}
