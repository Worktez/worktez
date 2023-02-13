import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { NgForm } from '@angular/forms';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { FileUploadService } from 'src/app/services/fileUploadService/file-upload.service';
import { FileUpload } from 'src/app/Interface/FileInterface';
import { defaultPost, Post } from 'src/app/Interface/SocialInterface';
import { SocialPageServiceService } from 'src/app/services/social-page-service/social-page-service.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @Output() createPostCompleted = new EventEmitter<{ completed: boolean, post: Post }>();
  @Input('choosePhoto') choosePhoto: boolean;
  componentName: string = "CREATE-POST";

  post : Post;
  company: string;
  enableLoader: boolean;
  selectedFile: FileList

  basePath:string;
  currentFileUpload: FileUpload;
  fileName: string;
  percentage: number = 0

  postId : string;
  date : string;
  
  constructor(private functions: AngularFireFunctions, private toolService: ToolsService, public errorHandlerService: ErrorHandlerService, private backendService: BackendService, public authService: AuthService, public applicationSetting: ApplicationSettingsService, public popupHandlerService: PopupHandlerService, public uploadService: FileUploadService, private toolsService: ToolsService, public socialPageService: SocialPageServiceService) { }
  ngOnInit(): void {
    this.post = defaultPost;
    this.post.ImagesUrl=[];
    this.post.Content="";
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

      this.post.ImagesUrl.push(event.target.result)
    }
    reader.readAsDataURL(file);
  }
  
  submit() {
    let data = [
      { label: "company", value: this.company },
      { label: "post", value: this.post },
    ];
    if(this.post){
      this.createPost(); 
      this.enableLoader=false  
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
    this.post.Uid = uid;
    this.post.CreationDate=date;
    this.post.CreationTime=time;
    const lastUpdatedEpochTime = this.toolsService.today().valueOf();

    const callable = this.functions.httpsCallable('socialPage/addPost');
    callable({Uid: this.post.Uid, Content: this.post.Content, Urls: this.post.ImagesUrl, LastUpdatedDate: this.post.CreationDate, LastUpdatedTime: this.post.CreationTime,  LastUpdatedEpochTime: lastUpdatedEpochTime}).subscribe({
      next: (data) => {
        this.post.PostId = data.PostId;
        const newPost = {
          Uid: this.post.Uid,
          CreationTime: this.post.CreationDate,
          CreationDate: this.post.CreationTime,
          LastUpdatedDate: this.post.CreationDate,
          LastUpdatedTime: this.post.CreationTime,
          Content: this.post.Content,
          LastUpdatedEpochTime: lastUpdatedEpochTime,
          PostCreationEpochTime: lastUpdatedEpochTime,
          Reach: 0,
          Reactions: 0,
          CommentCounter: 0,
          PostId: this.post.PostId,
          Status: "OK",
          ImagesUrl: this.post.ImagesUrl,
          Comments: [],
          Reactionss: [], 
        }
        this.socialPageService.socialPageDataJson.push(newPost);
      },
      error: (error) => {
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError");
        this.enableLoader = false;
        console.error(error);
      },
      complete: () => {
        this.createPostDone();
        this.close();
        console.info('Successfully added post');
      }
    });
  }

    createPostDone(){
      this.createPostCompleted.emit({ completed: true, post: this.post });
    }

    close() {
      // jQuery('#createPost').modal('hide');
      // jQuery('#form').trigger("reset");
      this.post.ImagesUrl = [];
    }

    removeImg(remove: string) {
      const index = this.post.ImagesUrl.indexOf(remove);
      if (index != -1) {
        this.post.ImagesUrl.splice(index, 1);
      } else {
        console.error("Error - Cannot remove image. Image not found");
      }
    }

  }
  