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

  loader: boolean = true;
  public useEmulator = environment.useEmulators;

  constructor(public applicationSettingsService: ApplicationSettingsService,public authService: AuthService, public backendService: BackendService) { }

  ngOnInit(): void {
  }

}
