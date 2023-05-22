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
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { FileUpload } from 'src/app/Interface/FileInterface';
import { FileUploadService } from 'src/app/services/fileUploadService/file-upload.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

@Component({
  selector: 'app-add-contributors',
  templateUrl: './add-contributors.component.html',
  styleUrls: ['./add-contributors.component.css']
})
export class AddContributorsComponent implements OnInit {

  @Input('organizationId') organizationId: string
  @Output() addNewContributorCompleted = new EventEmitter<{ completed: boolean }>();

  private currentFileUpload: FileUpload;
  private selectedFile: FileList;
  percentage: number = 0;
  public fileName: string;
  componentName: string = "Contributors"
  enableLoader: boolean = false
  public title: string;
  public name: string;
  public aboutme: string;
  public email: string;
  public githubAccount: string;
  public linkedInAccount: string;

  private basePath: string;
  public fileUpload:boolean = false;

  constructor(private functions: AngularFireFunctions, public popupHandlerService: PopupHandlerService, private uploadService: FileUploadService, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.basePath = '/Contributors/documents';
  }

  close() {
    this.addNewContributorCompleted.emit({ completed: true });
  }

  detectFiles(event) {
    this.fileUpload=true;
    this.selectedFile = event.target.files;
    const file = this.selectedFile.item(0);

    this.currentFileUpload = new FileUpload(file);
    this.fileName = this.currentFileUpload.file.name;

    this.uploadService.pushFileToTaskStorage(this.currentFileUpload, this.basePath, "ContributorsDocuments")
    .subscribe({
      next: (percentage) => {
        this.percentage = Math.round(percentage);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.info('Upload successful')
    }
    );
  }

  submit() {
    this.enableLoader = true
    const callable = this.functions.httpsCallable('contributors/addContributor');
      callable({ email: this.email, about: this.aboutme, photoUrl: this.currentFileUpload.url, title: this.title, name: this.name, Github: this.githubAccount, LinkedIn: this.linkedInAccount }).subscribe({
        next: (data) => {
          console.log("Successful ");
        },
        error: (error) => {
          this.enableLoader = false;
          this.errorHandlerService.showError = true;
          this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        },
        complete: () => console.info('Successful ')
    });
    this.close();
  }
}
