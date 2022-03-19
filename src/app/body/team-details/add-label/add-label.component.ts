import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { Label ,Team} from 'src/app/Interface/TeamInterface'
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.css']
})
export class AddLabelComponent implements OnInit {

  componentName: string = "ADD-LABEL";

  @ViewChild('form') form: NgForm;
  @Output() addLabelCompleted = new EventEmitter<{ completed: boolean }>();
  @Input('label') label: Label

  team: Team
  colorCode: string;
  displayName: string;
  iconName: string;
  scope: string;
  status: string;
  teamName: string;
  teamId: string;
  teamIds: string[]
  showClose: boolean = false;
  enableLoader: boolean = false
  valid: boolean = true
  labelsReady: boolean = false;
  showAddLabel: boolean = false
  addLabelEnabled: boolean=false;

  constructor( public popupHandlerService: PopupHandlerService ,private authService: AuthService ,public backendService: BackendService, private functions:AngularFireFunctions ,public errorHandlerService: ErrorHandlerService, public validationService: ValidationService) { }

  ngOnInit(): void {
    this.teamIds=this.backendService.getOrganizationTeamIds();
    console.log("check")
    this.addLabelEnabled=true;
  }

  addLabel() {
     this.enableLoader=true;
     const callable=this.functions.httpsCallable('teams/addLabel');
     console.log("check3")
     callable({TeamId: this.teamId, ColorCode:this.colorCode, DisplayName:this.displayName, IconName:this.iconName, Scope: this.scope}).subscribe({
       next: (data) => {
         console.log("Successful created label");
         this.enableLoader=true;
         this.addLabelEnabled=false;
         this.showClose=true;
       },
       error: (error) => {
        this.errorHandlerService.showError=true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        console.error(error);
       },
       complete: () => console.info("Successfully created Label")
     });
  }

  async submit(){
    this.addLabel();
    let data = [{ label: "displayName", value:this.displayName },
     { label: "scope", value: this.scope },
     { label: "colorCode", value: this.colorCode },
     { label: "iconName" , value: this.iconName },
     ];
  } 

  addLabelDone(){
  this.addLabelCompleted.emit({ completed:true });
  }

  close(){
    window.location.reload();
  }

}
