import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FileData } from 'src/app/Interface/FileInterface';

@Component({
  selector: 'app-show-files',
  templateUrl: './show-files.component.html',
  styleUrls: ['./show-files.component.css']
})
export class ShowFilesComponent implements OnInit {

  @Input('file') file: FileData
  @Output() changeFileStatus = new EventEmitter<{ changeStatus: string, file: FileData}>();

  shortName: string = "";
  
  constructor() { }

  ngOnInit(): void {
    this.generateShortName();
  }

  generateShortName() {
    this.shortName += this.file.FileName.substring(0,8);
    this.shortName += "...";
    this.shortName += this.file.FileName.substring(this.file.FileName.lastIndexOf("."), this.file.FileName.length);
  }

  download() {
    this.changeFileStatus.emit({changeStatus: "download", file: this.file});
  }

  delete() {
    this.changeFileStatus.emit({changeStatus: "delete", file: this.file});
  }
}
