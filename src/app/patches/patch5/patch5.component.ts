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
import { Location } from '@angular/common';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-patch5',
  templateUrl: './patch5.component.html',
  styleUrls: ['./patch5.component.css']
})
export class Patch5Component implements OnInit {

  orgId: string;
  orgDomain: string;
  showLoader: boolean = true;
  uid: string;
  fieldName: string;
  fieldValue: string;

  constructor(private functions: AngularFireFunctions, private location: Location, public authService: AuthService) { }

  ngOnInit(): void {
    this.showLoader = false;
    this.authService.afauth.user.subscribe(data => {
      this.authService.userAppSettingObservable.subscribe(data => {
        if (data.SelectedOrgAppKey) {
          this.uid = this.authService.userAppSetting.uid;
          this.showLoader = false;
        }
      });
    });
    console.log("patch running");
  }

  async patch5() {
    this.showLoader = true;
    console.log("Patch5 function running");
    console.log(this.orgDomain);
    const callable = this.functions.httpsCallable('patch/patch5');
    await callable({OrgDomain: this.orgDomain, Uid: this.uid, Key: this.fieldName, Value: this.fieldValue}).subscribe({
      next: (result) => {
        this.showLoader = false;
        console.log(result);
        alert(result);
      },
      error: (error) => {
        
      },
      complete: () => console.info('successful')
    });
  }

  backToDashboard() {
    this.location.back()
  }
}
