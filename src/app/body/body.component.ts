import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationSettingsService } from '../services/applicationSettings/application-settings.service';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend/backend.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

 
  showLoader: boolean = true;
  showlogin: boolean = false;

  constructor(private router: Router, public applicationSettingsService: ApplicationSettingsService,public authService: AuthService, public backendService: BackendService) { }

  ngOnInit(): void {
    this.authService.afauth.user.subscribe(data => {
      if(data) {
        console.log("Logged In Successfully");
      }
      // this.router.navigate(['/Home']);
    });
  }

}
