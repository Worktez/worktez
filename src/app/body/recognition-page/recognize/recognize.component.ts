import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { BackendService } from 'src/app/services/backend/backend.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { UntypedFormControl } from '@angular/forms';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Reward } from 'src/app/Interface/RewardInterface';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

@Component({
  selector: 'app-recognize',
  templateUrl: './recognize.component.html',
  styleUrls: ['./recognize.component.css']
})
export class RecognizeComponent {
  componentName: string = "RECOGNITIONS";
  recognized: boolean;
  teamMembers: string[] = [];
  enableLoader: boolean = false
  teamName: string
  statusLabels: string[]
  priorityLabels: string[]
  difficultyLabels: string[]
  type: string[]
  taskType: string = null
  parentTaskId: string
  showClose: boolean = false;
  currentSprintNumber: number
  backlogSprintNumber: number
  sprintNumber: number
  project: string = null
  assetList: string[]
  rewardsName = [];

  // rewardeeEmail: string;
  description: string;



  rewardName = new UntypedFormControl();

  rewardeeEmail = new UntypedFormControl();
  filteredOptionsAssignee: Observable<string[]>;

  constructor(private authService: AuthService, public popupHandlerService: PopupHandlerService, private functions: AngularFireFunctions, public backendService: BackendService, public applicationSetting: ApplicationSettingsService, public errorHandlerService: ErrorHandlerService) { }
  ngOnInit() {
    this.project = this.authService.getTeamId();
    this.readTeamData(this.project);
    this.rewardsNameList();

  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.teamMembers.filter(option => option.toLowerCase().includes(filterValue));
  }

  readTeamData(teamId: string) {
    this.enableLoader = true;
    this.applicationSetting.getTeamDetails(teamId);
    const team = this.applicationSetting.team;
    this.priorityLabels = team.Priority;
    this.statusLabels = team.Status;
    this.type = team.Type;
    this.difficultyLabels = team.Difficulty;
    this.teamMembers = team.TeamMembers;
    this.teamName = team.TeamName;
    this.sprintNumber = team.CurrentSprintId;
    this.currentSprintNumber = team.CurrentSprintId;
    this.backlogSprintNumber = -1;

    this.filteredOptionsAssignee = this.rewardeeEmail.valueChanges.pipe(
      startWith(''),
      map((value) => {
        return this._filter(value)
      }),
    );

  }


  close() {
    this.recognized = false;
  }


  rewardsNameList() {
    const callable = this.functions.httpsCallable('rewards/getDigitalAssets');
    callable({}).pipe(
      map(actions => {
        return actions.data as Reward[];
      })).subscribe({
        next: (data) => {
          if (data) {
            data.forEach((reward) => {
              this.rewardsName.push(reward.AssetName);
            });
          }
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.info("Fetched Rewards Data Successfully");
          // this.showLoader = false;
        }
      });
  }

  selectedRewardee(item) {
    if (item.selected == false) {
      this.rewardeeEmail.setValue("");
      this.close();
    } else {
      this.rewardeeEmail.setValue(item.data);
    }
  }

  selectedReward(item) {
    if (item.selected == false) {
      this.rewardName.setValue("");
      this.close();
    } else {
      this.rewardName.setValue(item.data);
    }
  }


  recignize() {
    let email =  this.rewardeeEmail.value;
    let rewardName =this.rewardName.value;
    let description = this.description;
    const orgDomain = this.backendService.organizationDetails.OrganizationDomain;
    const callable = this.functions.httpsCallable('users/addUserRewards');
    callable({ Email: email, RewardName: rewardName, Description: description, OrgDomain: orgDomain }).subscribe({
      next: (data) => {
        this.showClose = true;
      },
      error: (error) => {
        console.log("error");
        this.enableLoader = false;
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError", "Api");
        console.error(error);
      },
      complete: () => console.info('Successful edited')
    });
    console.log("Successfully recognized member");
    this.recognized = true;
    this.showClose = true;
    window.location.reload();

  }
}
