import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-patch5',
  templateUrl: './patch5.component.html',
  styleUrls: ['./patch5.component.css']
})
export class Patch5Component implements OnInit {

  orgId: string;
  orgDomain: string;
  showLoader: boolean = false;
  uid: string;

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

  async patch5() {
    this.showLoader = true;
    console.log("Patch5 function running");
    console.log(this.orgDomain);
    const callable = this.functions.httpsCallable('patch');
    await callable({ mode: "patch5", OrgDomain: this.orgDomain, Uid: this.uid}).toPromise().then(result => {
      this.showLoader = false;
      console.log(result);
      alert(result);
    });
  }


  backToDashboard() {
    this.location.back()
  }
}
