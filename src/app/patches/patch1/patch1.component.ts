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
import { PatchService } from 'src/app/services/patch/patch.service';
import { Patch } from 'src/app/Interface/PatchInterface';

@Component({
  selector: 'app-patch1',
  templateUrl: './patch1.component.html',
  styleUrls: ['./patch1.component.css']
})
export class Patch1Component implements OnInit {
  orgId: string;
  orgDomain: string;
  teamId: string;
  showLoader: boolean = false;
  uid: string;
  patch: Patch;
  patchObservableReady: boolean= false;

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
    this.patchService.patchObservable.subscribe((data) => {
      this.patchObservableReady = true;
    });
    console.log("patch running");
  }

  async patch1() {
    this.showLoader = true;
    console.log("Patch1 function running");
    console.log(this.orgDomain, this.orgId, this.teamId);
    const callable = this.functions.httpsCallable('patch/patch1');
    await callable({OrgId: this.orgId, OrgDomain: this.orgDomain, TeamId: this.teamId, Uid: this.uid }).subscribe({
      next: (result) => {
        this.showLoader = false;
        console.log(result);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.info('successful')
    });
  }

  backToDashboard() {
    this.location.back()
  }

  getPatchData() {
    this.patchService.getPatchData("Patch1").subscribe(data => {
      this.patch = data;
    });
  }
}
