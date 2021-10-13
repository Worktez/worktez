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
