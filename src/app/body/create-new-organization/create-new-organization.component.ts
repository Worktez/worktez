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
import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { NgForm, FormGroup, FormControl, Validators} from '@angular/forms';
import { FileUploadService } from 'src/app/services/fileUploadService/file-upload.service';
import { FileUpload } from 'src/app/Interface/FileInterface';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend/backend.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { app } from 'firebase-functions/v1';
import { CookieService } from 'ngx-cookie-service';
import { StartServiceService } from 'src/app/services/start/start-service.service';

@Component({
  selector: 'app-create-new-organization',
  templateUrl: './create-new-organization.component.html',
  styleUrls: ['./create-new-organization.component.css']
})
export class CreateNewOrganizationComponent implements OnInit {

  componentName: string = "CREATE-NEW-ORGANIZATION"

  enableLoader: boolean = false
  logoUploaded: boolean = false
  orgAdmin: string
  orgAdminUid: string
  orgLogoURL: string
  orgLogo: FileUpload
  orgId:string
  basePath: string
  fileName: string
  percentage: number = 0;
  OrgDomains =[];
  orgDomainsAvailable: boolean = true

  createNewOrgForm= new FormGroup({
    orgName: new FormControl('', Validators.required),
    orgDomain: new FormControl('', [Validators.required, Validators.pattern("^(?:[a-z0-9][a-z0-9-]{0,61}[a-z0-9]\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$")]),
    orgEmail: new FormControl('', [Validators.required, Validators.email]),
    orgDescription: new FormControl('', Validators.required),
  })
  get orgName(){return this.createNewOrgForm.get('orgName')};
  get orgDomain(){return this.createNewOrgForm.get('orgDomain')};
  get orgEmail(){return this.createNewOrgForm.get('orgEmail')};
  get orgDescription(){return this.createNewOrgForm.get('orgDescription')};
  
  constructor(private navbarHandler: NavbarHandlerService, public startService: StartServiceService, public functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService, private fireStorage: AngularFireStorage, private location: Location, private authService: AuthService, public router: Router,public uploadService: FileUploadService,public backendService: BackendService, public cookieService: CookieService) { }
  ngOnInit(): void {
    this.orgAdmin = this.authService.getUserEmail();
    this.orgAdminUid = this.authService.getLoggedInUser()
    this.navbarHandler.resetNavbar()
    this.navbarHandler.addToNavbar(this.componentName);
    ((this.authService.myOrgCollectionsData.forEach(item=>{
      (item.forEach(item=>{
        this.OrgDomains.push(item.OrgDomain);
      }));
    })))

    
   }

  submit() {
    const orgName= this.orgName.value;
    const orgDomain= this.orgDomain.value;
    const orgEmail= this.orgEmail.value;
    const orgDescription= this.orgDescription.value;
    this.enableLoader = true;
    const callable = this.functions.httpsCallable('organization/createOrg');
    callable({OrganizationName: orgName, OrganizationEmail: orgEmail, OrganizationDomain: orgDomain, OrganizationAdmin: this.orgAdmin,  OrganizationAdminUid: this.orgAdminUid, OrganizationDescription: orgDescription, OrganizationLogoURL: this.orgLogoURL }).subscribe({
      next: (result) => {
        this.orgId = result[2];
        this.uploadLogo();
        this.enableLoader = false;
        this.startService.startApplication();
        this.router.navigate(["CreateNewTeam"]);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.info(' successfully created new organization')
    });
  }

  uploadedLogo(data: { completed: boolean, logoFile: FileUpload, photoUrl: string }) {
    this.enableLoader=false
    this.logoUploaded = data.completed;
    this.orgLogo = data.logoFile;
    this.orgLogoURL = data.photoUrl;
    this.fileName = data.logoFile.file.name;
  }

  delete() {
    this.logoUploaded = false;
  }

  uploadLogo () {
    this.basePath = '/Organizations/'+this.orgId+'/Logo';
    this.uploadService.pushFileToTaskStorage(this.orgLogo, this.basePath, "Logo");
  }

  close() {
    this.location.back();
  }

  checkOrgDomainAvailabilityLive() {
    for (let i = 0; i < this.OrgDomains.length; i++) {
      if (this.OrgDomains[i]==this.orgDomain.value) {
        this.orgDomainsAvailable = false;
        break;
      }else {
          this.orgDomainsAvailable = true;
          this.enableLoader = false;
      }
    }
  }
}