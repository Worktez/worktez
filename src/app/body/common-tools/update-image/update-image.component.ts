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
import Cropper from 'cropperjs';
import { FileUploadService } from 'src/app/services/fileUploadService/file-upload.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.css']
})
export class UpdateImageComponent implements OnInit {

  @ViewChild("image", { static: false }) public imageElement: ElementRef;

  @Input("imageUrl") imageInput: string;
  @Input("uid") uid: string;
  @Input("email") email: string;
  @Input("displayName") displayName: string;

  @Output() cropPhotoCompleted = new EventEmitter<{ completed: boolean }>();

  cropper: Cropper;
  componentName:string = "UPDATE-IMAGE"
  croppedImage: string;
  percentage: number;
  basePath: string;

  constructor(public uploadService: FileUploadService, private functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.cropper = new Cropper(this.imageElement.nativeElement, {
      zoomable: false,
      scalable: false,
      aspectRatio: 1,
      crop: () => {
        const canvas = this.cropper.getCroppedCanvas();
        this.croppedImage = canvas.toDataURL("image/png");
      },
    });
  }

  async setProfilePic() {
    const callable = this.functions.httpsCallable('users/updateProfilePic');
    try {
      await callable({Uid: this.uid, PhotoURL: this.croppedImage, DisplayName: this.displayName, Email: this.email }).toPromise();
      console.log("Successful");
    } catch (error) {
      this.errorHandlerService.showError = true;
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
      console.log("error");
    }
    this.cropPhotoDone();
  }

  cropPhotoDone() {
    this.cropPhotoCompleted.emit({ completed: true });
  }

}
