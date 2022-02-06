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
import { FileData, FileUpload } from 'src/app/Interface/FileInterface';
import { FileUploadService } from 'src/app/services/fileUploadService/file-upload.service';

@Component({
  selector: 'app-upload-logo',
  templateUrl: './upload-logo.component.html',
  styleUrls: ['./upload-logo.component.css']
})
export class UploadLogoComponent implements OnInit {

  @Output() uploadedLogo = new EventEmitter<{ completed: boolean, logoFile: FileUpload }>();

  private basePath: string;
  private selectedFile: FileList;
  private currentFileUpload: FileUpload;
  percentage: number = 0;
  public fileName: string;

  constructor(public uploadService: FileUploadService) { }

  ngOnInit(): void { }

  detectFiles(event) {
    this.selectedFile = event.target.files;
    const file = this.selectedFile.item(0);

    this.currentFileUpload = new FileUpload(file);
    this.fileName = this.currentFileUpload.file.name;
    this.uploadedLogo.emit({ completed: true, logoFile: this.currentFileUpload});
  }

  changeFileStatus(data: {changeStatus: string, file: FileData} ) {
    if(data.changeStatus == "delete") {
      this.uploadService.deleteFile(data.file);
    }
  }
}
