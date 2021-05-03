import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RawDataId, RawDataType } from 'src/app/Interface/RawDataInterface';
import { User } from 'src/app/Interface/UserInterface';
import { Router } from '@angular/router';
import { ValidationService } from '../../services/validation.service';
import { Location } from '@angular/common';
import { NavbarHandlerService } from 'src/app/services/navbar-handler.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { BackendService } from 'src/app/services/backend.service';
import { AuthService } from 'src/app/services/auth.service';
import { Organizations } from 'src/app/Interface/OrganizationInterface';
import { ApplicationSettingsService } from 'src/app/services/application-settings.service';
import { Sprint, TeamDataId } from 'src/app/Interface/TeamInterface';

@Component({
  selector: 'app-create-new-sprint',
  templateUrl: './create-new-sprint.component.html',
  styleUrls: ['./create-new-sprint.component.css']
})
export class CreateNewSprintComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @Input('newSprintId') newSprintId: string;

  componentName: string = "CREATE-NEW-SPRINT";
  startDate: string
  endDate: string
  status: string
  enableLoader: boolean = false;
  user: User;

  selectedTeamId: string = "Dev";
  teamCurrentSprintNumber: number;

  teamData: TeamDataId[] = [];
  
  organizationDetails: Organizations

  public rawData: Observable<RawDataId[]>;
  public rawDocument: AngularFirestoreDocument<RawDataType>;

  sprintData: Sprint;

  nextSprintId: number;
  showContent: boolean;

  constructor(private applicationSettingsService: ApplicationSettingsService, private db: AngularFirestore, private functions: AngularFireFunctions, private router: Router, public validationService: ValidationService, private location: Location, public navbarHandler: NavbarHandlerService, public errorHandlerService: ErrorHandlerService, private backendService: BackendService, private authService: AuthService) { }

  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
    this.navbarHandler.addToNavbar(this.componentName);

    this.readApplicationData();
  }

  readApplicationData() {
    this.applicationSettingsService.getTeamDetails().subscribe(teams => {
      this.teamData = teams;
      teams.forEach(element => {
        if(element.TeamId == this.selectedTeamId) {
          this.teamCurrentSprintNumber = element.CurrentSprintId;
          this.nextSprintId = element.CurrentSprintId+1;
        }
      });
      this.readSprintData();
    });
  }
  
  readSprintData() {
    this.showContent = false;
    this.applicationSettingsService.getSprintsDetails(this.selectedTeamId, this.nextSprintId).subscribe(sprints => {
      this.sprintData = sprints[0];

      this.showContent = true;
    });
  }

  loadSprintData() {
    this.teamData.forEach(element => {
      if(element.TeamId == this.selectedTeamId) {
        this.nextSprintId = element.CurrentSprintId+1;
      }
    });
    this.readSprintData();
  }

  async submit() {
    let data = [{ label: "startDate", value: this.startDate },
    { label: "endDate", value: this.endDate },
    { label: "status", value: this.status }];
    var condition = await (this.validationService.checkValidity(this.componentName, data)).then(res => {
      return res;
    });
    if (condition) {
      console.log("Inputs are valid");
      this.createNewSprint();
    }
    else
      console.log("Sprint not created! Validation error");
  }

  async createNewSprint() {
    console.log(this.startDate);
    console.log(this.endDate);
    console.log(this.status);
    this.enableLoader = true;
    const appKey = this.backendService.getOrganizationAppKey();
    const callable = this.functions.httpsCallable('startNewSprint');

    try {
      const result = await callable({AppKey: appKey, StartDate: this.startDate, EndDate: this.endDate, Status: this.status, NewSprintId: this.nextSprintId, TeamId: this.selectedTeamId }).toPromise();

      console.log("Successfully created a new sprint");
      console.log(result);
      this.router.navigate(['/']);
    } catch (error) {
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError");
      this.enableLoader = false;
    }

  }

  backToDashboard() {
    this.location.back();
  }

  

}
