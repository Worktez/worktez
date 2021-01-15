import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showError: boolean = false;
  error: string;

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {

  }
  onSignInWithGoogle() {
    this.authService.googleSignIn().then(() => {
      this.router.navigate(['']);
    }).catch((error) => {
      this.showError = true;
      this.error = error;
      console.log(error);
    });
  }
  onLogOut() {
    this.authService.logout().then(() => {
      this.router.navigate(['']);
    });
  }
}
