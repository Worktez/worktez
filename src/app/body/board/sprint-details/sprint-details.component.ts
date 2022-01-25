import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { Sprint } from 'src/app/Interface/TeamInterface';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';

@Component({
  selector: 'app-sprint-details',
  templateUrl: './sprint-details.component.html',
  styleUrls: ['./sprint-details.component.css']
})
export class SprintDetailsComponent implements OnInit {

  @Input('currentSprintName') currentSprintName: string;
  @Input('currentSprintNumber') currentSprintNumber: number
  @Input('sprintData') sprintData: Sprint;
  @Input('workPercentage') workPercentage: number;
  @Output() currentSprint = new EventEmitter<number>();

  componentName: string = "SPRINT-DETAILS"
  filterSprintNumber: number;
  sprintStatus: string;

  constructor(public applicationSettingsService: ApplicationSettingsService, private functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService, public backendService: BackendService, private router: Router, public popupHandlerService: PopupHandlerService) { }

  ngOnInit(): void {
    this.changeSprintStatus();
  }

   changeSprintStatus() {
    const callable = this.functions.httpsCallable('sprints/updateSprintStatus');
    const appKey = this.backendService.getOrganizationAppKey();
    try {
      if( this.workPercentage == 100 )
      {
        this.sprintStatus = "Completed";
        console.log(this.sprintStatus)
      }
      else 
      {
        this.sprintStatus = "Under Progress";
        console.log(this.sprintStatus)
      }
      const result = callable({AppKey: appKey, CurrentSprintName: this.currentSprintName, SprintStatus: this.sprintStatus, TeamId: this.sprintData.TeamId }).toPromise();
    } catch (error) {
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError");
    }
  }

  forceChangeSprintStatus(sprintStatus:string) {
    const callable = this.functions.httpsCallable('sprints/updateSprintStatus');
    const appKey = this.backendService.getOrganizationAppKey();
    try {
      const result = callable({AppKey: appKey, CurrentSprintName: this.currentSprintName, SprintStatus: sprintStatus, TeamId: this.sprintData.TeamId }).toPromise();
    } catch (error) {
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError");
    }
  }

  changeSprintNumber() {
    this.currentSprint.emit(this.filterSprintNumber);
  }

  startNewSprint() {
    this.popupHandlerService.createNewSprintEnabled= true;
  }

  showTasks() {
    this.router.navigate(['/Tasks', this.sprintData.TeamId, this.currentSprintName])
  }

  ActiveSprint() {
    this.currentSprint.emit(this.currentSprintNumber);
  }

  showBacklog() {
    this.currentSprint.emit(-1);
  }

  showDeleted() {
    this.currentSprint.emit(-2);
  }
}
