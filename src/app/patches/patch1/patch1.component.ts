import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AuthService } from 'src/app/services/auth.service';
import { PatchService } from 'src/app/services/patch/patch.service';

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
  patchName: string;
  patchDescription: string;
  CreationDate: string;
  UpdatedOn: string;
  LastUsedByOrg: string;
  LastUsedByUid: string;

  constructor(private functions: AngularFireFunctions, private location: Location, public authService: AuthService, public patchService: PatchService) { }

  ngOnInit(): void {
    this.showLoader = true;
    this.authService.afauth.user.subscribe(data => {
      this.authService.userAppSettingObservable.subscribe(data => {
        if (data.AppKey) {
          this.uid = this.authService.userAppSetting.uid;
          this.getPatchData();
          this.showLoader = false;
        }
      });
    });
    console.log("patch running");
  }

  async patch1() {
    this.showLoader = true;
    console.log("Patch1 function running");
    console.log(this.orgDomain, this.orgId, this.teamId);
    const callable = this.functions.httpsCallable('patch');
    await callable({ mode: "patch1", OrgId: this.orgId, OrgDomain: this.orgDomain, TeamId: this.teamId, Uid: this.uid }).toPromise().then(result => {
      this.showLoader = false;
      console.log(result);
    });
  }

  backToDashboard() {
    this.location.back()
  }

  getPatchData() {
    this.patchService.getPatchData("Patch1").subscribe(data => {
      this.patchName = data.Name;
      this.patchDescription = data.Description;
      this.LastUsedByOrg = data.LastUsedByOrg;
      this.LastUsedByUid = data.LastUsedByUid;
      this.CreationDate = data.CreationDate;
      this.UpdatedOn = data.UpdatedOn;
    });
  }
}
