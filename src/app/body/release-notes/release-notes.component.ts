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
import { map } from 'rxjs';
import { GitData } from 'src/app/Interface/githubReleaseData';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.css']
})
export class ReleaseNotesComponent implements OnInit {
  componentName: string = "RELEASE NOTES"

  releaseData: GitData[] 

  constructor(public navbarHandler: NavbarHandlerService, private httpService: HttpServiceService, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {

    this.navbarHandler.resetNavbar();
    this.navbarHandler.addToNavbar(this.componentName);
    
    try {
      this.httpService.getReleaseDetails().pipe(map(data => {
        const objData = data as GitData[];
        this.releaseData=objData;
        return objData;
      })).subscribe(data => {

      });
    } catch (error) {    
      this.errorHandlerService.showError = true;
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
    }
  }

}
