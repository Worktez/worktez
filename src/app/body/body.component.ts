import { Component, OnInit } from '@angular/core';
import { ApplicationSettingsService } from '../services/applicationSettings/application-settings.service';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backEnd/backend.service';
import { environment } from '../../environments/environment';
>>>>>>> 8e527f38f34408fb0a7dac1ace93c6502e5a26b8

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

 
  showLoader: boolean = true;
  showlogin: boolean = false;

  constructor(public applicationSettingsService: ApplicationSettingsService,public authService: AuthService, public backendService: BackendService) { }

  ngOnInit(): void {
    this.authService.afauth.user.subscribe(data => {
      console.log("Logged In Successfully");
    });
  }

}
