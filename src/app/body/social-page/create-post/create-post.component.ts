import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { FormControl, NgForm } from '@angular/forms';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { map, Observable, startWith } from 'rxjs';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';


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


  constructor(private functions: AngularFireFunctions, private toolService: ToolsService, public errorHandlerService: ErrorHandlerService, private backendService: BackendService, public authService: AuthService, public applicationSetting: ApplicationSettingsService, public popupHandlerService: PopupHandlerService) { }
  ngOnInit(): void {
  } 

  async submit() {
    let data = [
      { label: "company", value: this.company },
    { label: "post", value: this.post },
    ];
    this.createPost();
    this.enableLoader=false;
    this.createPostCompleted.emit({ completed: true });
  }

  createPost() {
    this.enableLoader = true;
    const uid = this.authService.getLoggedInUser();
    const date = this.toolService.date();
    const time = this.toolService.time();

    const callable = this.functions.httpsCallable('socialPage/addPost');
    callable({Uid:uid, Post: this.post, LastUpdatedDate: date, LastUpdatedTime: time  }).subscribe({
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
  } 