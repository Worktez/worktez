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
import { Component, Input, OnInit, Output, ViewChild , EventEmitter } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Label ,Team} from 'src/app/Interface/TeamInterface';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';


@Component({
  selector: 'app-edit-label-prop',
  templateUrl: './edit-label-prop.component.html',
  styleUrls: ['./edit-label-prop.component.css']
})
export class EditLabelPropComponent implements OnInit {
  componentName: string = "EDIT-LABEL-PROP";

  @ViewChild('form') form: NgForm;
  @Input('label') label: Label;
  @Input('teamName') teamName: string;
  @Output() editLabelCompleted = new EventEmitter<{ completed: boolean }>();
  @Output() getTeamLabelsByScope = new EventEmitter();
  enableLoader: boolean = false;
  showClose: boolean=false;

  constructor(private fuctions:AngularFireFunctions, private authService: AuthService, public errorHandlerService: ErrorHandlerService, private backendService: BackendService) { }

  ngOnInit(): void {

  }

    submit(){
    this.enableLoader=true;
    const orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.fuctions.httpsCallable('teams/editLabel');
     callable({DisplayName: this.label.DisplayName, Status: this.label.Status, ColorCode: this.label.ColorCode, IconName: this.label.IconName, Id: this.label.Id, TeamName: this.teamName, OrgDomain: orgDomain}).subscribe({
      next: (data) => {
        this.getTeamLabelsByScope.emit();
        this.enableLoader=false;
        this.showClose=true;
      },
      error: (error) => {
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        this.enableLoader = false;
        console.error(error);
      },
      complete: () => console.info('Successful ')
    });
  }

  editLabelDone(){
    this.editLabelCompleted.emit({ completed:true });
  }

  backToLabelDetails() {
    window.location.reload();
  }

}
