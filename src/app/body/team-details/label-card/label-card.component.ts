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
import { Component, Input, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Label, Team } from 'src/app/Interface/TeamInterface';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { RBAService } from 'src/app/services/RBA/rba.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TeamServiceService } from 'src/app/services/team/team-service.service';

@Component({
  selector: 'app-label-card',
  templateUrl: './label-card.component.html',
  styleUrls: ['./label-card.component.css']
})
export class LabelCardComponent implements OnInit {
  @Input('scope') scope: string;
  @Input('team') team: Team;

  labels: Label[] = [];
  labelsArray: string[] = [];
  labelsReady: boolean = false;
  displayName: string = ""
  showAddLabel: boolean = false
  showEditLabelProp: boolean = false;
  addLabelEnabled: boolean = false;
  gotLabelData: boolean=false;
  deletedLabelEnabled: boolean=false;
  labelToDelete: Label = null;
  labelToEdit: string;

  public labelDataObservable: Label

  constructor(private functions: AngularFireFunctions,public rbaService :RBAService, private backendService: BackendService , public errorHandlerService: ErrorHandlerService, public teamService: TeamServiceService) { }

  ngOnInit(): void {
    this.labelsArray = this.getLabelsArray(this.scope);
    this.labels = this.teamService.teamsLabelsJson[this.team.TeamId][this.scope];
    this.labelsReady =  true;
  }

  getLabelsArray(scope: string) {
    if(scope == "Priority"){
      return this.team.Priority;
    }
    else if(scope == "Difficulty"){
      return this.team.Difficulty;
    }
    else if(scope == "Type"){
      return this.team.Type;
    }
    else if(scope == "Status"){
      return this.team.Status;
    } 
    else if(scope == "MilestoneStatus"){
      return this.team.MilestoneStatus;
    }
  }

  onLabelDrop(event: CdkDragDrop<Label[]>){
    moveItemInArray(this.labelsArray, event.previousIndex, event.currentIndex);
    const orgDomain = this.backendService.getOrganizationDomain();
    this.teamService.reorderLabels(orgDomain, this.team.TeamName, this.scope, this.labelsArray);
    this.updateLabelsArrayInService();
  }

  openEditProperties(item: string) {
    this.showEditLabelProp = true;
    this.labelToEdit = item;
  }

  editLabelCompleted( data : { completed : boolean, updatedLabelsArray: string[]}){
    if(data.completed){
      this.labelsArray = data.updatedLabelsArray;
      this.updateLabelsArrayInService();
      console.log(data.updatedLabelsArray);
    }
    this.showEditLabelProp = false;
  }

  updateLabelsArrayInService(){
    if(this.scope == "Priority"){
      this.teamService.teamsDataJson[this.team.TeamId].Priority =   this.labelsArray ;
      }
      else if(this.scope == "Difficulty"){
        this.teamService.teamsDataJson[this.team.TeamId].Difficulty = this.labelsArray ;
      }
      else if(this.scope == "Type"){
        this.teamService.teamsDataJson[this.team.TeamId].Type = this.labelsArray;
      }
      else if(this.scope == "Status"){
        this.teamService.teamsDataJson[this.team.TeamId].Status = this.labelsArray ;
      } 
      else if(this.scope == "MilestoneStatus"){
        this.teamService.teamsDataJson[this.team.TeamId].MilestoneStatus = this.labelsArray;
      }
  }

  addLabel(){
    this.addLabelEnabled = true; 
  }

  addLabelCompleted () {
     this.addLabelEnabled = false;
  }

  setLabelToEdit(index: number){
    this.labelToEdit = this.labelsArray[index];
    this.showEditLabelProp=true;
  }
  setLabelTodelete(item: string){
    this.labelToDelete=this.teamService.teamsLabelsJson[this.team.TeamId][this.scope][item];
    this.deletedLabelEnabled=true;
  }
  deletedLabel() {
    if(this.labelToDelete != null){
    const orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable("teams/deleteLabel");
    callable({OrgDomain: orgDomain,TeamName: this.team.TeamName, Id:this.labelToDelete.Id}).subscribe({
      next: (data) => {
        console.log(this.labelsArray.indexOf(this.labelToDelete.DisplayName));
        this.labelsArray.splice(this.labelsArray.indexOf(this.labelToDelete.DisplayName), 1);
        this.updateLabelsArrayInService();
      
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

