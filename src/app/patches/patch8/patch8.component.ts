import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AuthService } from 'src/app/services/auth.service';
import { PatchService } from 'src/app/services/patch/patch.service';
import { Patch } from 'src/app/Interface/PatchInterface';

@Component({
  selector: 'app-patch8',
  templateUrl: './patch8.component.html',
  styleUrls: ['./patch8.component.css']
})
export class Patch8Component implements OnInit {

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

  async patch8() {
    this.showLoader = true;
    console.log("Patch8 function running");
    console.log(this.orgDomain, this.newfield, this.newFieldValue);
    const callable = this.functions.httpsCallable('patch/patch8');
    await callable({OrgDomain: this.orgDomain, newField: this.newfield, NewFieldValue: this.newFieldValue, NewFieldValueType: this.newFieldValueType, Uid: this.uid}).toPromise().then(result => {
      this.showLoader = false;
      console.log(result);
      alert(result);
    });
  }


  backToDashboard() {
    this.location.back()
  }

  getPatchData() {
    this.patchService.getPatchData("Patch8").subscribe(data => {
      this.patch = data;
    });
  }

}
