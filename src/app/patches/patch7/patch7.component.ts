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
import { AuthService } from 'src/app/services/auth.service';
import { PatchService } from 'src/app/services/patch/patch.service';
import { Patch } from 'src/app/Interface/PatchInterface';

@Component({
  selector: 'app-patch7',
  templateUrl: './patch7.component.html',
  styleUrls: ['./patch7.component.css']
})
export class Patch7Component implements OnInit {

  orgId: string;
  orgDomain: string;
  newfield: string;
  newFieldValue: any;
  newFieldValueType: string;
  showLoader: boolean = false;
  uid: string;
  patch: Patch;

  constructor(private functions: AngularFireFunctions, private location: Location, public authService: AuthService, public patchService: PatchService) { }

  ngOnInit(): void {
    this.showLoader = true;
    this.authService.afauth.user.subscribe(data => {
      this.authService.userAppSettingObservable.subscribe(data => {
        if (data.SelectedOrgAppKey) {
          this.uid = this.authService.userAppSetting.uid;
          this.getPatchData();
          this.showLoader = false;
        }
      });
    });
    console.log("patch running");
  }

  async patch7() {
    this.showLoader = true;
    console.log("Patch7 function running");
    console.log(this.orgDomain, this.newfield, this.newFieldValue);
    const callable = this.functions.httpsCallable('patch/patch7');
    await callable({OrgDomain: this.orgDomain, newField: this.newfield, NewFieldValue: this.newFieldValue, NewFieldValueType: this.newFieldValueType, Uid: this.uid}).subscribe({
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

  getPatchData() {
    this.patchService.getPatchData("Patch7").subscribe(data => {
      this.patch = data;
    });
  }

}