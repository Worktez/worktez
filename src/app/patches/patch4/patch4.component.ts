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
import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AuthService } from 'src/app/services/auth.service';
import { PatchService } from 'src/app/services/patch/patch.service';
import { Patch } from 'src/app/Interface/PatchInterface';

@Component({
  selector: 'app-patch4',
  templateUrl: './patch4.component.html',
  styleUrls: ['./patch4.component.css']
})
export class Patch4Component implements OnInit {
  
  // @ViewChild('form') form: NgForm;
  uid: string;
  patch: Patch;
  orgDomain: string;
  showLoader:boolean = false;

  constructor(private functions: AngularFireFunctions, private location: Location, public authService: AuthService, public patchService: PatchService) { }

  ngOnInit(): void {
  }

  async submitOperation() {
    this.showLoader = true;
    console.log("Patch4 function running");
    const callable = this.functions.httpsCallable('patch/patch4');
    await callable({OrgDomain: this.orgDomain, Uid: this.uid}).subscribe({
      next: (result) => {
        this.showLoader = false;
        console.log(result);
        alert(result);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.info(' successful')
    });
  }

  backToDashboard() {
    this.location.back()
  }


}
