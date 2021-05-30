import { Component, OnInit } from '@angular/core';
import { ApplicationSettingsService } from '../services/application-settings.service';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  public useEmulator = environment.useEmulators;
  showLoader: boolean = true;
  showlogin: boolean = false;

  constructor(public applicationSettingsService: ApplicationSettingsService,public authService: AuthService, public backendService: BackendService) { }

  ngOnInit(): void {
    this.authService.afauth.user.subscribe(data => {
      this.showLoader = false;
      this.showlogin = false;
      if(data == null || data == undefined) {
        this.showlogin = true;
      }
    });
  }

}
