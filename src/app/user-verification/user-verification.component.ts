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
import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.css']
})
export class UserVerificationComponent implements OnInit {
  componentName: string = "USER-VERIFICATION"
  teamName: string
  organizationDomain: string
  userEmail: string
  teamId: string
  userDataReady: boolean = false;

  constructor(private route: ActivatedRoute, private functions: AngularFireFunctions, public authService: AuthService, public errorHandlerService: ErrorHandlerService, public router: Router) { }

  ngOnInit(): void {
    this.organizationDomain = this.route.snapshot.params['organizationDomain'];
    this.teamName = this.route.snapshot.params['teamName'];
    this.userEmail = this.route.snapshot.params['userEmail'];
    this.teamId = this.route.snapshot.params['teamId'];

    this.authService.afauth.user.subscribe((data) => {
      this.userDataReady = true;
    });
  }

  async verifyUser() {
    const callable = this.functions.httpsCallable('users/verify');
      await callable({OrganizationDomain: this.organizationDomain, TeamName: this.teamName, UserEmail: this.userEmail, TeamId: this.teamId }).subscribe({
        next: (data) => {
          this.router.navigate(['/']);
          console.log("Successful ");
        },
        error: (error) => {
          this.errorHandlerService.showError = true;
          this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        },
        complete: () => console.info('Successful')
    });
      
  }

}