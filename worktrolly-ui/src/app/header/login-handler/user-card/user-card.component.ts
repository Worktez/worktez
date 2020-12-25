import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Interface/UserInterface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input('user') user: User
  showCard: boolean = false
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }
  toogleCard() {
    this.showCard = !this.showCard
  }
  onLogout() {
    this.authService.logout();
  }
}
