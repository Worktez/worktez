import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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
  orgLogo: File = null;
  orgName: string
  orgDomain: string
  orgEmail: string
  orgDescription: string = ""
  orgLogoURL: string

  constructor(public validationService: ValidationService, public functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService, private fireStorage: AngularFireStorage, private location: Location, private authService: AuthService, public router: Router) { }
  ngOnInit(): void {
    this.orgAdmin = this.authService.getUserEmail();
    this.orgAdminUid = this.authService.getLoggedInUser()
   }

  handleFileInput(files: FileList) {
    this.orgLogo = files.item(0);
    const filePath = `OrganizationLogos/${this.orgLogo.name}`;
    const task = this.fireStorage.upload(filePath, this.orgLogo);
  }

  uploadLogo() {
    this.fireStorage.ref(`OrganizationLogos/${this.orgLogo.name}`).getDownloadURL().subscribe(data => {
      this.orgLogoURL = data
      this.logoUploaded = true
    });
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
    if (condition) {
      console.log("Inputs are valid");
      this.createNewOrganization();
    }
    else {
      console.log("Organization not created! Validation error");
    }
  }

  async createNewOrganization() {
    this.enableLoader = true;
    const callable = this.functions.httpsCallable('organization');
    try {
      const result = await callable({ mode: "create", OrganizationName: this.orgName, OrganizationEmail: this.orgEmail, OrganizationDomain: this.orgDomain, OrganizationAdmin: this.orgAdmin,  OrganizationAdminUid: this.orgAdminUid, OrganizationDescription: this.orgDescription, OrganizationLogoURL: this.orgLogoURL }).toPromise();
      this.enableLoader = false;
      this.router.navigate(["CreateNewTeam"]);
      // this.stepAndOrgDomain.emit({ step: 2, organizationDomain: this.orgDomain })
    } catch (error) {
      this.enableLoader = false;
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError");
    }
  }

  close() {
    this.location.back();
  }
}