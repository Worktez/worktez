/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* 
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/
import { Component, Input, OnInit, Output } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { map } from 'rxjs';
import { Label } from 'src/app/Interface/TeamInterface';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-label-card',
  templateUrl: './label-card.component.html',
  styleUrls: ['./label-card.component.css']
})
export class LabelCardComponent implements OnInit {
  @Input('scope') scope: string;
  @Input('teamName') teamName: string;

  labels: Label[] = [];
  labelsReady: boolean = false;
  displayName: string = ""
  showAddLabel: boolean = false
  showEditLabelProp: boolean = false;
  addLabelEnabled: boolean = false;
  gotLabelData: boolean=false;
  deletedLabelEnabled: boolean=false;
  labelToDelete: Label = null;
  labelToEdit: Label = null;

  public labelDataObservable: Label

  constructor(private functions: AngularFireFunctions, private backendService: BackendService , public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getTeamLabelsByScope();
  }

  getTeamLabelsByScope() {
    const orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable("teams/getLabelByScope");
    callable({OrganizationDomain: orgDomain, TeamName: this.teamName, Scope: this.scope}).pipe(
      map(actions => {
        const data = actions.resultData as Label[]
        return data;
      })).subscribe({
        next: (data) => {
          this.labels = data;
          this.labelsReady = true;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => console.info("Completed getting Label Data...")
      });
  }

  openEditProperties(item: Label) {
    this.showEditLabelProp = true;
    this.labelToEdit = item;
    this.getTeamLabelsByScope();
  }

  editLabelCompleted(){
    this.showEditLabelProp = false;
  }

  addLabel(){
    this.addLabelEnabled = true; 
  }

  addLabelCompleted () {
     this.addLabelEnabled = false;
  }

  setLabelToEdit(item: Label){
    this.labelToEdit=item;
    this.showEditLabelProp=true;
  }
  setLabelTodelete(item: Label){
    this.labelToDelete=item;
    this.deletedLabelEnabled=true;
  }

  deletedLabel() {
    if(this.labelToDelete != null){
    const orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable("teams/deleteLabel");
    callable({OrgDomain: orgDomain,TeamName: this.teamName, Id:this.labelToDelete.Id}).subscribe({
      next: (data) => {
        this.getTeamLabelsByScope();
        console.log("Successfull");
      },
      error: (error) => {
        console.log("Error", error);
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode("InternalError","Api");
        console.error(error);
      },
      complete: () => console.info('Successful updated Selected Team in db')
  });
    
    console.info("Deleting label");
  }

}
}

