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
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { PatchService } from 'src/app/services/patch/patch.service';
import { Patch } from 'src/app/Interface/PatchInterface';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-schedular-patch',
  templateUrl: './schedular-patch.component.html',
  styleUrls: ['./schedular-patch.component.css']
})
export class SchedularPatchComponent implements OnInit {
  orgAppKey: string;
  orgDomain: string;
  showLoader: boolean = true;
  uid: string;
  teamId: string;
  assignee: string;
  schedularDocId: any;
  patch: Patch;
  patchObservableReady: boolean=false;
  
  constructor(private functions: AngularFireFunctions, private location: Location, public authService: AuthService, public patchService: PatchService,public backendService:BackendService) { }


  ngOnInit(): void {
    this.showLoader = false;
    this.authService.afauth.user.subscribe(data => {
      this.authService.userAppSettingObservable.subscribe(data => {
        if (data.SelectedOrgAppKey) {
          this.uid = this.authService.userAppSetting.uid;
         // this.getPatchData();
          this.showLoader = false;
        }
      });
    });
   /* this.patchService.patchObservable.subscribe((data) => {
      this.patchObservableReady = true;
    });
    */
    console.log("patch running");
  }

  async Patch() {
    this.showLoader = true;
    console.log("SchedularPatch function running");
    console.log(this.orgDomain);
    const orgAppKey = this.backendService.getOrganizationAppKey();
    const assignee = this.authService.getUserEmail();
    const callable = this.functions.httpsCallable('scheduledFnManually/addScheduler');
    await callable({ OrgDomain: this.orgDomain, Uid: this.uid, OrgAppKey:orgAppKey, TeamId: this.teamId, Assignee:assignee, Type: this.schedularDocId }).subscribe({
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
    this.location.back();
  }

 /* getPatchData() {
    this.patchService.getPatchData("addSchedularOrg").subscribe(data => {
      this.patch = data;
    });
  }
  */





}


