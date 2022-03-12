import { Component, Input, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { map } from 'rxjs';
import { Label } from 'src/app/Interface/TeamInterface';
import { BackendService } from 'src/app/services/backend/backend.service';

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

  showEditLabelProp: boolean = false;

  constructor(private functions: AngularFireFunctions, private backendService: BackendService) { }

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
  }

  deletedLabel(item: Label) {
    console.info("Deletign label");
  }

}
