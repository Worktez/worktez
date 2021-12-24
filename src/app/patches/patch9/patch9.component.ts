import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Patch } from 'src/app/Interface/PatchInterface';
import { AuthService } from 'src/app/services/auth.service';
import { PatchService } from 'src/app/services/patch/patch.service';

@Component({
  selector: 'app-patch9',
  templateUrl: './patch9.component.html',
  styleUrls: ['./patch9.component.css']
})
export class Patch9Component implements OnInit {

  // Update user information
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

  backToDashboard() {
    this.location.back()
  }

  getPatchData() {
    this.patchService.getPatchData("Patch9").subscribe(data => {
      this.patch = data;
    });
  }

  async patch9() {
    this.showLoader = true;
    console.log("Patch9 function running");
    console.log(this.newfield, this.newFieldValue);
    const callable = this.functions.httpsCallable('patch/patch9');
    await callable({newField: this.newfield, NewFieldValue: this.newFieldValue, NewFieldValueType: this.newFieldValueType, Uid: this.uid}).toPromise().then(result => {
      this.showLoader = false;
      console.log(result);
      alert(result);
    });
  }

}
