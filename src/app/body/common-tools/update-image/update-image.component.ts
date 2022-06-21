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
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUploadService } from 'src/app/services/fileUploadService/file-upload.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FileUpload } from 'src/app/Interface/FileInterface';

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.css']
})
export class UpdateImageComponent implements OnInit {

  @Input('imageUrl') imageUrl: string;

  @Output() cropPhotoCompleted = new EventEmitter<{ completed: boolean, photoUrl: string, file: FileUpload }>();

  componentName: string = "UPDATE-IMAGE"
  croppedImage: string;
  percentage: number;
  basePath: string;

  imgChangeEvt: any = '';
  cropImgPreview: any = '';

  selectedFile: FileList

  currentFileUpload: FileUpload
  showSaveButton: boolean

  constructor(public backendService: BackendService, public uploadService: FileUploadService, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    if(this.imageUrl == "") {
      this.showSaveButton = false
    } else {
      this.showSaveButton = true
    }
  }

  cropPhotoDone() {
    this.cropPhotoCompleted.emit({ completed: true, photoUrl: this.croppedImage, file: this.currentFileUpload });
  }
  
  onFileChange(event: any): void {
      this.imageUrl = ""
      this.imgChangeEvt = event;
      this.selectedFile = event.target.files;
      const file = this.selectedFile.item(0);
      this.currentFileUpload = new FileUpload(file);
      this.showSaveButton = true
  }
  cropImg(e: ImageCroppedEvent) {
      this.cropImgPreview = e.base64;
      this.croppedImage = this.cropImgPreview;
  }
  imgLoad() {
      // display cropper tool
  }
  initCropper() {
      // init cropper
  }
  
  imgFailed() {
      // error msg
  }

}
