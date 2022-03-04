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
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { GitData } from '../Interface/githubReleaseData';
import { AuthService } from '../services/auth.service';
import { StartServiceService } from '../services/start/start-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  tag_name: string
  userDataReady: boolean = false;

  constructor(public startService: StartServiceService, public authService: AuthService, private httpService: HttpServiceService, public router: Router) { }

  ngOnInit(): void {
        this.httpService.getReleaseDetails().pipe(map(data => {
          const objData = data[0] as GitData;
          return objData;
        })).subscribe({
          next: (data) => {
            this.tag_name = data.tag_name;
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('Getting Release data successful')
        });
  }
  privacy(){
    this.router.navigate(['/privacy']);
  }

  copyright(){
    this.router.navigate(['/copyright']);
  }

  contributors() {
    this.router.navigate(['/contributors']);
  }

  termsandcondition() {
    this.router.navigate(['/termsandcondition'])
  }
  build(){
    this.router.navigate(['/releasenotes']);
  }
}
