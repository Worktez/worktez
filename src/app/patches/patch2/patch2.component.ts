import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AuthService } from 'src/app/services/auth.service';
import { PatchService } from 'src/app/services/patch/patch.service';
import { Patch } from 'src/app/Interface/PatchInterface';
@Component({
  selector: 'app-patch2',
  templateUrl: './patch2.component.html',
  styleUrls: ['./patch2.component.css']
})
export class Patch2Component implements OnInit {
  orgId: string;
  orgDomain: string;
  taskId: string;
  newfield: string;
  newFieldValue: string;
  showLoader: boolean = false;
  uid: string;
  patch: Patch;

  constructor(private functions: AngularFireFunctions, private location: Location, public authService: AuthService, public patchService: PatchService) { }

  ngOnInit(): void {
    this.showLoader = true;
    this.authService.afauth.user.subscribe(data => {
      this.authService.userAppSettingObservable.subscribe(data => {
        if (data.AppKey && !this.patch) {
          this.uid = this.authService.userAppSetting.uid;
          this.getPatchData();
          this.showLoader = false;
        }
      });
    });
    console.log("patch running");
  }

  async patch2() {
    this.showLoader = true;
    console.log("Patch2 function running");
    console.log(this.orgDomain, this.newfield, this.newFieldValue);
    const callable = this.functions.httpsCallable('patch');
    await callable({ mode: "patch2", OrgDomain: this.orgDomain, newField: this.newfield, NewFieldValue: this.newFieldValue, Uid: this.uid}).toPromise().then(result => {
      this.showLoader = false;
      console.log(result);
      alert(result);
    });
  }


  backToDashboard() {
    this.location.back()
  }

  getPatchData() {
    this.patchService.getPatchData("Patch2").subscribe(data => {
      this.patch = data;
    });
  }
}
