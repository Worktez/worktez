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
import { ValidationService } from 'src/app/services/validation/validation.service';
import { FileUploadService } from 'src/app/services/fileUploadService/file-upload.service';
import { FileUpload } from 'src/app/Interface/FileInterface';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend/backend.service';

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
  orgName: string
  orgDomain: string
  orgEmail: string
  orgDescription: string = ""
  orgLogoURL: string
  orgLogo: FileUpload
  orgId:string
  basePath: string
  fileName: string
  percentage: number = 0;

  constructor(public validationService: ValidationService, public functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService, private fireStorage: AngularFireStorage, private location: Location, private authService: AuthService, public router: Router,public uploadService: FileUploadService,public backendService: BackendService) { }
  ngOnInit(): void {
    this.orgAdmin = this.authService.getUserEmail();
    this.orgAdminUid = this.authService.getLoggedInUser()
   }

  async submit() {
    let data = [
      { label: "organizationName", value: this.orgName },
      { label: "organizationDomain", value: this.orgDomain },
      { label: "organizationEmail", value: this.orgEmail },
    ];
    var condition = await (this.validationService.checkValidity(this.componentName, data)).then(res => {
      return res;
    });
    if (condition && this.logoUploaded) {
      console.log("Inputs are valid");
      this.createNewOrganization();
    }
    else {
      console.log("Organization not created! Validation error");
    }
  }

  async createNewOrganization() {
    this.enableLoader = true;
    const callable = this.functions.httpsCallable('organization/createOrg');
    await callable({OrganizationName: this.orgName, OrganizationEmail: this.orgEmail, OrganizationDomain: this.orgDomain, OrganizationAdmin: this.orgAdmin,  OrganizationAdminUid: this.orgAdminUid, OrganizationDescription: this.orgDescription, OrganizationLogoURL: this.orgLogoURL }).toPromise().then(result => {
      this.orgId = result[2];
      this.uploadLogo();
      this.enableLoader = false;
      this.router.navigate(["CreateNewTeam"]);
    });
  }

  uploadedLogo(data: { completed: boolean, logoFile: FileUpload }) {
    this.logoUploaded = data.completed;
    this.orgLogo = data.logoFile;
    this.orgLogoURL = data.logoFile.url;
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
}