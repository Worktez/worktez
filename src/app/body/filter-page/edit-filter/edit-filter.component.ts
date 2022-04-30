/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* Author: Simran Nigam <nigamsimran14@gmail.com>
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/
import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { NgForm } from '@angular/forms';
import { CustomFilter } from 'src/app/Interface/UserInterface';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

@Component({
  selector: 'app-edit-filter',
  templateUrl: './edit-filter.component.html',
  styleUrls: ['./edit-filter.component.css']
})
export class EditFilterComponent implements OnInit {
  componentName: string = "EDIT-FILTER-PROPERTY";

  @ViewChild('form') form: NgForm;
  @Input('customFilter') customFilter:CustomFilter;
  @Input('teamName') teamName: string;
  description: string;
  filterName: string;
  @Output() editFilterCompleted = new EventEmitter<{ completed:boolean }>();
  @Output() getTeamFiltersByScope = new EventEmitter();
  enableLoader: boolean = false;  
  showClose: boolean=false;

  constructor(private functions: AngularFireFunctions, private authService: AuthService, private backendService: BackendService, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
  }

  submit(){
    this.enableLoader=true;
    const orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable('filterPage/editFilter');
    callable({FilterName: this.customFilter.FilterName, Status: this.customFilter.Status, Id: this.customFilter.FilterId, TeamNmae: this.teamName, OrgDomain: orgDomain}).subscribe({
      next: (data) => {
          this.getTeamFiltersByScope.emit();
          this.enableLoader=false;
          this.showClose=true;
      },
      error: (error) => {
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName,"InternalError","Api");
        this.enableLoader = false;
        console.error(error);
      },
      complete: () => console.info('Successful')
    });
  }

  editFilterDone(){
    this.editFilterCompleted.emit({ completed:true });
  }

  backToFilterPage(){
    window.location.reload();
  }
}
