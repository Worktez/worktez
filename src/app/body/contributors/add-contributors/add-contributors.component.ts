import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { FileUpload } from 'src/app/Interface/FileInterface';
import { FileUploadService } from 'src/app/services/fileUploadService/file-upload.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

declare var jQuery:any;

@Component({
  selector: 'app-add-contributors',
  templateUrl: './add-contributors.component.html',
  styleUrls: ['./add-contributors.component.css']
})
export class AddContributorsComponent implements OnInit {

  @Input('organizationId') organizationId: string
  @Output() addContributor = new EventEmitter<{ completed: boolean }>();

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

  private basePath: string;

  constructor(private functions: AngularFireFunctions, public popupHandlerService: PopupHandlerService, private uploadService: FileUploadService, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.basePath = '/Contributors/documents';
  }

  close() {
    jQuery('#addNewMember').modal('hide');
    jQuery('#form').trigger("reset");
    this.addContributor.emit({ completed: true });
  }

  detectFiles(event) {
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

  async submit() {
    this.enableLoader = true
    const callable = this.functions.httpsCallable('contributors');
    console.log(this.aboutme);
    try {
      const result = await callable({mode: "addContributor", email: this.email, about: this.aboutme, photoUrl: this.currentFileUpload.url, title: this.title, name: this.name }).toPromise();
    } catch (error) {
      this.enableLoader = false;
      this.errorHandlerService.showError = true;
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
    }
    this.close();
  }
}
