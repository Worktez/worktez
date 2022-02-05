/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* 
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/
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
  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }
  toogleCard() {
    this.showCard = !this.showCard
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  profile() {
    this.router.navigate(['/profile', this.authService.userAppSetting.Username]);
  }
}
