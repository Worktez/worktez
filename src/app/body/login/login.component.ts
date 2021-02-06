import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarHandlerService } from 'src/app/services/navbar-handler.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  componentName: string = "Login"

  constructor(public authService: AuthService, public router: Router, public navbarHandlerService: NavbarHandlerService) { }

  ngOnInit(): void {
    this.navbarHandlerService.setNavbar(this.componentName);
  }
  onSignInWithGoogle() {
    this.authService.googleSignIn().then(() => {
      this.router.navigate(['']);
    }).catch((err) => {
      console.log(err);
    });
  }
  onLogOut() {
    this.authService.logout().then(() => {
      this.router.navigate(['']);
    });
  }
}
