/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* Author: Aditya Khedekar <aditya3034@gmail.com>
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
import { Meet } from 'src/app/Interface/MeetInterface';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { map } from "rxjs";

@Component({
  selector: 'app-show-meet-details',
  templateUrl: './show-meet-details.component.html',
  styleUrls: ['./show-meet-details.component.css']
})
export class ShowMeetDetailsComponent implements OnInit {

  meetData:Meet[]=[];

  @Input('meet') meet:Meet;
  teamName: any;
  MeetToDelete: any;
  deletedMeetEnabled: boolean;
  applicationSettings: any;
  constructor(public authService: AuthService, private functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService) {}

  ngOnInit(): void {
    this.getMeetData();
  }  



  getMeetData() {
    const uid = this.authService.getLoggedInUser();
    const callable = this.functions.httpsCallable("meet/getMeetDetails");
    callable({ Uid: uid }).pipe(map(actions => {
        return actions.data as Meet[];
      })).subscribe({
        next: (data) => {
          if (data) {
            this.meetData = data            
          }
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.info("Fetched Meet Data Successfully");
        }
      })
  }
  deletedMeet(index) {
    const uid = this.authService.getLoggedInUser();
    const callable = this.functions.httpsCallable("meet/deleteMeet");
      callable({Uid: uid, Id: this.meetData[index].MeetDocId}).subscribe({
        next(data) { 
         console.log("Meet deleted Successfully") 
        },
        error: (error) => {
          console.log("Error", error);
          this.errorHandlerService.showError = true;
          this.errorHandlerService.getErrorCode("InternalError","Api");
          console.error(error);
        },
        complete: () => {
          console.info("Successfully updated in db");
          this.getMeetData();
        } 
      });
  }
}
