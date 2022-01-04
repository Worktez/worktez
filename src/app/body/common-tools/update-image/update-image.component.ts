import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Cropper from 'cropperjs';
import { FileUpload } from 'src/app/Interface/FileInterface';
import { FileUploadService } from 'src/app/services/fileUploadService/file-upload.service';

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.css']
})
export class UpdateImageComponent implements OnInit {

  @ViewChild("image", { static: false }) public imageElement: ElementRef;

  @Input("imageUrl") imageInput: string;
  @Input("uid") uid: string;

  cropper: Cropper;

  croppedImage: string;
  percentage: number;
  basePath: string;

  constructor(public uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.basePath = '/Users/' + this.uid + '/ProfilePic';
  }

  ngAfterViewInit() {
    this.cropper = new Cropper(this.imageElement.nativeElement, {
      zoomable: false,
      scalable: false,
      aspectRatio: 1,
      crop: () => {
        const canvas = this.cropper.getCroppedCanvas();
        this.croppedImage = canvas.toDataURL("image/png");
        console.log(this.croppedImage);
      }
    })
  }

  setProfilePic() {
    console.log(this.croppedImage);
    // this.uploadService.pushFileToTaskStorage(this.croppedImage, this.basePath, "ProfilePic")
    // .subscribe(percentage => {
    //     this.percentage = Math.round(percentage);
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }

}
