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
import { BackendService } from 'src/app/services/backend/backend.service';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { map, Observable } from "rxjs";




@Component({
  selector: 'app-show-meet-details',
  templateUrl: './show-meet-details.component.html',
  styleUrls: ['./show-meet-details.component.css']
})
export class ShowMeetDetailsComponent implements OnInit {

  meetData:Meet[]=[];

  meet: Meet;
  teamName: any;
  MeetToDelete: any;
  deletedMeetEnabled: boolean;
  applicationSettings: any;
  constructor(public authService: AuthService, private functions: AngularFireFunctions,private backendService: BackendService, public errorHandlerService: ErrorHandlerService, public startService: StartServiceService) {}

  ngOnInit(): void {
    this.getMeetData();
  }  

  getMeetData() {
    const email = this.authService.getUserEmail();
    const callable = this.functions.httpsCallable("meet/getMeetDetails");
    callable({ Email: email }).pipe(map(actions => {
      return actions.data as Meet[];
    })).subscribe({
      next: (data) => {
        if (data) {
          this.meetData = data.reverse();           
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
  // Delete Meet deletes the meeting for all the users.
  deletedMeet(index) {
    const callable = this.functions.httpsCallable("meet/deleteMeet");
      callable({RoomId: this.meetData[index].RoomId}).subscribe({
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

  // Ignore meet removes the user from the meeting
  igonreMeet(index) {
    const email = this.authService.getUserEmail();
    const callable = this.functions.httpsCallable("meet/ignoreMeet");
      callable({Email: email, RoomId: this.meetData[index].RoomId}).subscribe({
        next(data) { 
         console.log("Meet Ignored Successfully") 
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