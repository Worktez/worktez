/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* Author: Simran Nigam <nigamsimran14@gmail.com>
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { FormControl, NgForm } from '@angular/forms';
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

  iconName = new FormControl();
  colorCode = new FormControl();

  displayName: string;
  scope: string;

  showClose: boolean = false;
  enableLoader: boolean = false
  addLabelEnabled: boolean=false;

  constructor( public popupHandlerService: PopupHandlerService, private authService: AuthService ,public backendService: BackendService, private functions:AngularFireFunctions ,public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.addLabelEnabled=true;
  }

 submit(){
     this.enableLoader=true;
     const orgDomain = this.backendService.getOrganizationDomain();
     const callable = this.functions.httpsCallable('teams/addLabel');
     console.log(this.colorCode.value);
     callable({ColorCode:this.colorCode.value, DisplayName:this.displayName, IconName:this.iconName.value, Scope:this.scope, OrgDomain: orgDomain ,TeamName: this.teamName}).subscribe({
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

  selectedIconName(item) {
    if(item.selected == false) {
      this.iconName.setValue("");
      this.close();
    } else {
      this.iconName.setValue(item.data);
    }
  }

  selectedColorName(item) {
    if(item.selected == false) {
      this.colorCode.setValue("");
      this.close();
    } else {
      var temp = item.data as string
      temp = temp.slice(1);
      this.colorCode.setValue(temp);
    }
  }

  close(){
    jQuery('#addLabel').modal('hide');
    jQuery('#form').trigger("reset");
    this.addLabelCompleted.emit();
  }

}
