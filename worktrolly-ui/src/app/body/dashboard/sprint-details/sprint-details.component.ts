import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { Main, MainDataId, RawDataId, RawDataType } from 'src/app/Interface/RawDataInterface';
import { AngularFireFunctions } from '@angular/fire/functions';

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

  @Output() changeSprint = new EventEmitter<{ newSprintNumber: number }>();

  filterSprintNumber: number;
  sprintCompleted: boolean = false;
  sprintStatus: string;

  constructor(private db: AngularFirestore, private router: Router, private functions: AngularFireFunctions, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  changeSprintNumber() {
    this.changeSprint.emit({ newSprintNumber: this.filterSprintNumber });
  }

  async completeSprint() {
    
    this.sprintStatus = "Completed";
    const callable = this.functions.httpsCallable('updateSprintStatus');

    try {
      const result = await callable({ CurrentSprintName: this.currentSprintName, SprintStatus: this.sprintStatus }).toPromise();
      console.log(this.sprintStatus);
      console.log("Successfully updated Status");
      this.sprintCompleted = true;
    } catch (error) {
      console.error("Error", error);
    }
  }
}
