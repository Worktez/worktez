import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { PatchService } from 'src/app/services/patch/patch.service';
import { Patch } from 'src/app/Interface/PatchInterface';

@Component({
  selector: 'app-patch6',
  templateUrl: './patch6.component.html',
  styleUrls: ['./patch6.component.css']
})
export class Patch6Component implements OnInit {

  orgId: string;
  orgDomain: string;
  showLoader: boolean = true;
  uid: string;
  newfield: string;
  newFieldValue: any;
  newFieldValueType: string;
  patch: Patch;

  constructor(private functions: AngularFireFunctions, private location: Location, public authService: AuthService, public patchService: PatchService) { }

  ngOnInit(): void {
    this.showLoader = false;
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

  async patch6() {
    this.showLoader = true;
    console.log("Patch6 function running");
    console.log(this.orgDomain);
    const callable = this.functions.httpsCallable('patch/patch6');
    await callable({OrgDomain: this.orgDomain, Uid: this.uid}).toPromise().then(result => {
      this.showLoader = false;
      console.log(result);
      alert(result);
    });
  }

  backToDashboard() {
    this.location.back();
  }

  getPatchData() {
    this.patchService.getPatchData("Patch6").subscribe(data => {
      this.patch = data;
    });
  }

}
