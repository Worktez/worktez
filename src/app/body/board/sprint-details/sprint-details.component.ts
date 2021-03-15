import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { Main, MainDataId, RawDataId, RawDataType } from 'src/app/Interface/RawDataInterface';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-sprint-details',
  templateUrl: './sprint-details.component.html',
  styleUrls: ['./sprint-details.component.css']
})
export class SprintDetailsComponent implements OnInit {

  @Input('currentSprintName') currentSprintName: string;
  @Input('StartDate') StartDate: string;
  @Input('EndDate') EndDate: string;
  @Input('Status') Status: string;

  @Output() changeSprint = new EventEmitter<number>();

  componentName :string="SPRINT-DETAILS"
  filterSprintNumber: number;

  constructor(private db: AngularFirestore, private router: Router, private functions: AngularFireFunctions, private route: ActivatedRoute,public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
  }

  changeSprintNumber() {
    this.changeSprint.emit(this.filterSprintNumber);
  }

  async changeSprintStatus(sprintStatus: string) {
      
    const callable = this.functions.httpsCallable('updateSprintStatus');

    try {
      const result = await callable({ CurrentSprintName: this.currentSprintName, SprintStatus: sprintStatus }).toPromise();
      console.log(sprintStatus);
      console.log("Successfully updated Status");
    } catch (error) {
      this.errorHandlerService.getErrorCode(this.componentName,"InternalError");
    }
  }
}
