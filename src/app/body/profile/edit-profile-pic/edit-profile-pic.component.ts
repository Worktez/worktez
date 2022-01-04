import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile-pic',
  templateUrl: './edit-profile-pic.component.html',
  styleUrls: ['./edit-profile-pic.component.css']
})
export class EditProfilePicComponent implements OnInit {

  @Input('uid') uid: string;

  choosePhoto: boolean = true
  enableLoader: boolean = false
  showClose: boolean = false
  enableCropper: boolean = false

  selectedFile: FileList
  imageUrl: string = ""

  constructor() { }

  ngOnInit(): void {
    this.imageUrl = ""
    this.choosePhoto = true;
    this.enableCropper = false;
  }

  detectImage(imageUpload) {
    this.selectedFile = imageUpload.target.files;
    const file = this.selectedFile.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;

      console.log(this.imageUrl);
      this.choosePhoto = false;
      this.enableCropper = true;
    }
    reader.readAsDataURL(file)

  }

  cancel(){
    this.imageUrl = ""
    this.choosePhoto = true;
    this.enableCropper = false;
  }
}
