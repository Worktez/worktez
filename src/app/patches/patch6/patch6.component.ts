import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';

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
  fieldName: string;
  fieldValue: string;

  constructor(private functions: AngularFireFunctions, private location: Location, public authService: AuthService) { }

  ngOnInit(): void {
    this.showLoader = false;
    this.authService.afauth.user.subscribe(data => {
      this.authService.userAppSettingObservable.subscribe(data => {
        if (data.SelectedOrgAppKey) {
          this.uid = this.authService.userAppSetting.uid;
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
    const callable = this.functions.httpsCallable('patch');
    await callable({ mode: "patch6", OrgDomain: this.orgDomain, Uid: this.uid}).toPromise().then(result => {
      this.showLoader = false;
      console.log(result);
      alert(result);
    });
  }

  backToDashboard() {
    this.location.back();
  }

}
