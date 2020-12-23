import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit(): void {
  }

  startNewSprint() {
    this.router.navigate(['/StartNewSprint']);
  }

  startNewSession() {
    this.router.navigate(['/CreateNewSession']);
  }
  onLogout() {
    this.auth.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
