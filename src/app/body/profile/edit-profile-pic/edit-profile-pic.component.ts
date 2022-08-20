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
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { FileData, FileUpload } from 'src/app/Interface/FileInterface';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { FileUploadService } from 'src/app/services/fileUploadService/file-upload.service';

@Component({
  selector: 'app-edit-profile-pic',
  templateUrl: './edit-profile-pic.component.html',
  styleUrls: ['./edit-profile-pic.component.css']
})
export class EditProfilePicComponent implements OnInit {
  @ViewChild("closeBtn", { static: false }) public closeBtn: ElementRef;

  @Input('uid') uid: string;
  @Input('email') email: string;
  @Input('displayName') displayName: string;
  @Input('imageUrl') imageUrl: string;
  // @Input('profilePicPhoto') profilePicPhoto: FileData;

  componentName: string = "Edit Profile Pic"

  choosePhoto: boolean = true
  enableLoader: boolean = false
  showClose: boolean = false
  enableCropper: boolean = false

  imageUrlTemp: string = "";

  percentage: number = 0
  basePath: string;
  private currentFileUpload: FileUpload;
  public fileName: string

  @Output() editProfilePicCompleted = new EventEmitter<{ completed: boolean, photoUrl: string}>();

  constructor(public uploadService: FileUploadService, private functions: AngularFireFunctions, private errorHandlerService: ErrorHandlerService) {}

  ngOnInit(): void {
    this.choosePhoto = true;

    if(this.imageUrl== "") {
      this.enableCropper = false
    } else {
      this.enableCropper = true
    }

    this.imageUrlTemp = this.imageUrl;
    console.log(this.imageUrlTemp);

    this.basePath = '/Users/' + this.uid + '/ProfilePic';
  }

  cropPhotoCompleted(data: { completed: boolean, photoUrl: string, file: FileUpload }) {
    this.enableCropper = false;
    
    this.imageUrlTemp = data.photoUrl;
    this.currentFileUpload = data.file;
    if(data.file != undefined) {
      this.fileName = this.currentFileUpload.file.name;
      this.uploadService.pushFileToTaskStorage(this.currentFileUpload, this.basePath, "ProfilePic")
      .subscribe(percentage => {
        this.percentage = Math.round(percentage);
      },
      error => {
        console.log(error);
      });
    }
    this.setProfilePic(data.photoUrl);

  }

  setProfilePic(croppedImage) {
    const callable = this.functions.httpsCallable('users/updateProfilePic');

    callable({ Uid: this.uid, PhotoURL: croppedImage, DisplayName: this.displayName, Email: this.email }).subscribe({
      next: (data) => {
        console.log("Successful");
      },
      error: (error) => {
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError", "Api");
        console.error(error);
      },
      complete: () => console.info('Successful updated image')
    });

  this.editProfilePicDone();
}

  editProfilePicDone() {
    this.showClose = true;
    this.choosePhoto = false;
    this.editProfilePicCompleted.emit({ completed: true, photoUrl: this.imageUrlTemp});
  }
}
