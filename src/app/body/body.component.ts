import { Component, OnInit } from '@angular/core';
import { ApplicationSettingsService } from '../services/application-settings.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  loader: boolean = true;

  constructor(public applicationSettingsService: ApplicationSettingsService,public authService: AuthService ) { }

  ngOnInit(): void {
  }

}
