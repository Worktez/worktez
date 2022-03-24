import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { Label ,Team} from 'src/app/Interface/TeamInterface'
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

declare var jQuery:any;

@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.css']
})
export class AddLabelComponent implements OnInit {

  componentName: string = "ADD-LABEL";
  @Input ('teamName') teamName:string; 
  @ViewChild('form') form: NgForm;
  @Output()  addLabelCompleted = new EventEmitter;
  colorCode: string;
  displayName: string;
  iconName: string;
  scope: string;

  showClose: boolean = false;
  enableLoader: boolean = false
  addLabelEnabled: boolean=false;

  constructor( public popupHandlerService: PopupHandlerService ,private authService: AuthService ,public backendService: BackendService, private functions:AngularFireFunctions ,public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.addLabelEnabled=true;
  }

 submit(){
     this.enableLoader=true;
     const orgDomain = this.backendService.getOrganizationDomain();
     console.log(this.teamName)
     const callable = this.functions.httpsCallable('teams/addLabel');
     callable({ColorCode:this.colorCode, DisplayName:this.displayName, IconName:this.iconName , Scope:this.scope, OrgDomain: orgDomain ,TeamName: this.teamName}).subscribe({
       next:() => {
         console.log("Added New Label");

       },
       error: (error) =>{
         console.error(error);
       },
       complete: () => {
         console.log("Successfully added Label");
         this.showClose=true;
         this.enableLoader=false;
       }
       
     });
  } 

  close(){
    jQuery('#addLabel').modal('hide');
    jQuery('#form').trigger("reset");
    this.addLabelCompleted.emit();
  }

}
