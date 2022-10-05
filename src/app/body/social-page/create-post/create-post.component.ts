import { Component, ElementRef, EventEmitter, OnInit, Input, Output, ViewChild } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { FormControl, NgForm } from '@angular/forms';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { map, Observable, startWith } from 'rxjs';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { event } from 'firebase-functions/v1/analytics';
import { FileUploadService } from 'src/app/services/fileUploadService/file-upload.service';
import { FileUpload } from 'src/app/Interface/FileInterface';


declare var jQuery:any;

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @Output() createPostCompleted = new EventEmitter<{ completed: boolean }>();


  componentName: string = "CREATE-POST";

  post : string;
  company: string;
  enableLoader: boolean;
  urls = [];
  choosePhoto: boolean = true
  selectedFile: FileList

  basePath:string;
  currentFileUpload: FileUpload;
  fileName: string;
  percentage: number = 0

  postId : string;
  date : string;
  
  constructor(private functions: AngularFireFunctions, private toolService: ToolsService, public errorHandlerService: ErrorHandlerService, private backendService: BackendService, public authService: AuthService, public applicationSetting: ApplicationSettingsService, public popupHandlerService: PopupHandlerService, public uploadService: FileUploadService) { }
  ngOnInit(): void {
    this.choosePhoto = true;
    this.urls = [];
    const uid = this.authService.user.uid
    this.basePath = '/Social/' + 'posts/' + uid + '/postImages'  ;
  }
  

  onSelectFile(event){
        this.selectedFile = event.target.files;
        const file = this.selectedFile.item(0);

        this.currentFileUpload = new FileUpload(file);
        this.fileName = this.currentFileUpload.file.name;

        this.uploadService.pushFileToTaskStorage(this.currentFileUpload, this.basePath, 'postImages')
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

        var reader = new FileReader();
        reader.onload = (event: any) => {

          this.urls.push(event.target.result)
        }
        reader.readAsDataURL(file);
      
  }
  
  async submit() {
    let data = [
      { label: "company", value: this.company },
    { label: "post", value: this.post },
    ];
    if(this.post){
      this.createPost(); 
      this.enableLoader=false  
      this.createPostCompleted.emit({ completed: true });
    }
    else{
      console.log("error")
    }
  }

  createPost() {
    this.enableLoader = true;
    const uid = this.authService.getLoggedInUser();
    const date = this.toolService.date();
    const time = this.toolService.time();

    const callable = this.functions.httpsCallable('socialPage/addPost');
    callable({Uid: uid, Post: this.post, Urls: this.urls, LastUpdatedDate: date, LastUpdatedTime: time  }).subscribe({
      next: (data) => {
        console.log("Successfully");
      },
      error: (error) => {
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError");
        this.enableLoader = false;
        console.error(error);
      },
      complete: () => console.info('Successfully added post')
    });
    this.close();
    }


    close() {
      jQuery('#createPost').modal('hide');
      jQuery('#form').trigger("reset");
      this.createPostCompleted.emit({ completed: true });
    }

    removeImg(remove: string) {
      const index = this.urls.indexOf(remove);
      if (index != -1) {
        this.urls.splice(index, 1);
      } else {
        console.error("Error - Cannot remove image. Image not found");
      }
    }

  } 


function generateBase64String(arg0: string): any {
  throw new Error('Function not implemented.');
}
  