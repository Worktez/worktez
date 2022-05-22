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
import { CustomFilter } from 'src/app/Interface/TeamInterface';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { StartServiceService } from 'src/app/services/start/start-service.service';

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
  @Output() editFilterCompleted = new EventEmitter<{ completed:boolean }>();
  @Input() getTeamFilters = new EventEmitter();
  enableLoader: boolean = false;  
  showClose: boolean=false;

  constructor(private functions: AngularFireFunctions, private authService: AuthService, private backendService: BackendService, public errorHandlerService: ErrorHandlerService, public StartService: StartServiceService) { }

  ngOnInit(): void {
  }

  submit(){
    this.enableLoader=true;

    const orgDomain = this.backendService.getOrganizationDomain();
    this.teamName =  this.StartService.teamName;
    const callable = this.functions.httpsCallable('filters/editFilter');
    callable({FilterName: this.customFilter.FilterName, FilterJson: this.customFilter.FilterJson, Description:this.customFilter.Description, Id: this.customFilter.Id, TeamName: this.teamName, OrgDomain: orgDomain,Status: this.customFilter.Status}).subscribe({
      next: (data) => {
          this.getTeamFilters.emit();
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
    this.getTeamFilters.emit();
  }

  backToFilterPage(){
    window.location.reload();
  }
}
