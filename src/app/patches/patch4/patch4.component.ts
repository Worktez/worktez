import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFireFunctions } from '@angular/fire/functions';
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
    this.showLoader = true;
  }

  async patch4() {
    this.showLoader = true;
    console.log("Patch4 function running");
    const callable = this.functions.httpsCallable('patch');
    await callable({ mode: "patch4", OrgDomain: this.orgDomain, Uid: this.uid}).toPromise().then(result => {
      this.showLoader = false;
      console.log(result);
      alert(result);
    });
  }

  backToDashboard() {
    this.location.back()
  }


}
