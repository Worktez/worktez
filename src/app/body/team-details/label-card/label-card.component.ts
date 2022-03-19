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

  public labelDataObservable: Label

  constructor(private functions: AngularFireFunctions, private backendService: BackendService , public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getTeamLabelsByScope();
  }

  getTeamLabelsByScope() {
    console.log(this.scope)
    console.log(this.teamName);
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
    console.log("checking")
  }

  editLabelCompleted(){
    this.showEditLabelProp = false;
  }

  addLabel(){
    this.addLabelEnabled = true; 
    console.log("checking")
  }

  addLabelCompleted () {
     this.addLabelEnabled = true;

  }


  deletedLabel(item: Label) {
    this.deletedLabelEnabled=true
    const orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable("teams/deleteLabel");
    
    callable({OrgDomain: orgDomain,TeamName: this.teamName, Scope: this.scope , Label: item }).subscribe({
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
