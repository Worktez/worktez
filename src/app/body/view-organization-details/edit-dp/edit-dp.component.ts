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
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FileUpload } from 'src/app/Interface/FileInterface';
import { FileUploadService } from 'src/app/services/fileUploadService/file-upload.service';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

@Component({
  selector: 'app-edit-dp',
  templateUrl: './edit-dp.component.html',
  styleUrls: ['./edit-dp.component.css']
})
export class EditDpComponent implements OnInit {

  @ViewChild("closeBtn", { static: false }) public closeBtn: ElementRef;

  @Input('orgDomain') orgDomain: string;
  @Input('imageUrl') imageUrl: string;

  componentName: string = "Edit Organization Logo"
  choosePhoto: boolean = true
  enableLoader: boolean = false
  showClose: boolean = false
  enableCropper: boolean = false

  imageUrlTemp: string = "";
  selectedFile: FileList

  percentage: number = 0
  basePath: string;
  private currentFileUpload: FileUpload;
  public fileName: string

  @Output() editOrgLogoCompleted = new EventEmitter<{ completed: boolean, imageUrl: string }>();

  constructor(public uploadService: FileUploadService, private functions: AngularFireFunctions, private errorHandlerService: ErrorHandlerService) {}


  ngOnInit(): void {
    this.choosePhoto = true;
    if(this.imageUrl== "") {
      this.enableCropper = false
    } 
    else {
      this.enableCropper = true
    }
    this.imageUrlTemp = this.imageUrl;
    console.log(this.imageUrlTemp);

    this.basePath = '/Organizations/' + this.orgDomain + '/LogoFiles';
  }

  cropPhotoCompleted(data: { completed: boolean, photoUrl: string, file: FileUpload  }) {
    this.enableCropper = false;
    
    this.imageUrlTemp = data.photoUrl;
    this.currentFileUpload = data.file;
    if(data.file != undefined) {
      this.fileName = this.currentFileUpload.file.name;
      this.uploadService.pushFileToTaskStorage(this.currentFileUpload, this.basePath, "Logo")
      .subscribe(percentage => {
        this.percentage = Math.round(percentage);
      },
      error => {
        console.log(error);
      });
    }
    this.setOrgLogo(data.photoUrl);
  }

  setOrgLogo(croppedImage) {
    const callable = this.functions.httpsCallable('organization/updateOrgLogo');

    callable({ OrgDomain: this.orgDomain, PhotoURL: croppedImage}).subscribe({
      next: (data) => {
        console.log("Successful");
      },
      error: (error) => {
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError", "Api");
        console.error(error);
      },
      complete: () => console.info('Successfully updated image')
    });

  this.editOrgLogoDone();
}

  editOrgLogoDone() {
    this.showClose = true;
    this.choosePhoto = false;
    this.editOrgLogoCompleted.emit({ completed: true, imageUrl: this.imageUrlTemp});
}
}
