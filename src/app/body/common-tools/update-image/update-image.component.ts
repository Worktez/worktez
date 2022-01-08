import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import Cropper from 'cropperjs';
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
  @Input("email") email: string;
  @Input("displayName") displayName: string;

  @Output() cropPhotoCompleted = new EventEmitter<{ completed: boolean }>();

  cropper: Cropper;

  croppedImage: string;
  percentage: number;
  basePath: string;

  constructor(public uploadService: FileUploadService, private functions: AngularFireFunctions) { }

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
      console.log("error");
    }
    this.cropPhotoDone();
  }

  cropPhotoDone() {
    this.cropPhotoCompleted.emit({ completed: true });
  }

}
