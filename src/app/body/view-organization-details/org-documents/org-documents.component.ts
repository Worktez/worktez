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
import { Component, Input, OnInit } from '@angular/core';
import { FileData, FileUpload } from 'src/app/Interface/FileInterface';
import { FileUploadService } from 'src/app/services/fileUploadService/file-upload.service';

@Component({
  selector: 'app-org-documents',
  templateUrl: './org-documents.component.html',
  styleUrls: ['./org-documents.component.css']
})
export class OrgDocumentsComponent implements OnInit {

  @Input('organizationId') organizationId: string
  @Input('orgDomain') orgDomain: string

  private currentFileUpload: FileUpload;
  private selectedFile: FileList;
  percentage: number = 0;
  public fileName: string;

  private basePath: string;

  constructor(public uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.basePath = '/Organizations/'+this.organizationId+'/Documents';
    this.uploadService.readFiles(this.orgDomain, "Documents");
  }

  detectFiles(event) {
    this.selectedFile = event.target.files;
    const file = this.selectedFile.item(0);

    this.currentFileUpload = new FileUpload(file);
    this.fileName = this.currentFileUpload.file.name;

    this.uploadService.pushFileToTaskStorage(this.currentFileUpload, this.basePath, "Documents")
    .subscribe({
      next: (percentage) =>{
        this.percentage = Math.round(percentage);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => console.log("Getting Percentage Data Complete")
    }
    );
  }

  changeFileStatus(data: {changeStatus: string, file: FileData} ) {
    if(data.changeStatus == "delete") {
      this.uploadService.deleteFileOrg(data.file);
    }
  }
}
