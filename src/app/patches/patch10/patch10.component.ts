import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AuthService } from 'src/app/services/auth.service';
import { PatchService } from 'src/app/services/patch/patch.service';
import { Patch } from 'src/app/Interface/PatchInterface';

@Component({
  selector: 'app-patch10',
  templateUrl: './patch10.component.html',
  styleUrls: ['./patch10.component.css']
})
export class Patch10Component implements OnInit {

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

  async patch10() {
    this.showLoader = true;
    console.log("Patch10 function running");
    console.log(this.orgDomain, this.newfield, this.newFieldValue);
    const callable = this.functions.httpsCallable('patch/patch10');
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
    this.patchService.getPatchData("Patch10").subscribe(data => {
      this.patch = data;
    });
  }

}
