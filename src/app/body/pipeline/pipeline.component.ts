import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GithubServiceService } from 'src/app/services/github-service/github-service.service';
import { CookieService } from "ngx-cookie-service";
import { ApplicationSettingsService } from "src/app/services/applicationSettings/application-settings.service";
import { AuthService } from "src/app/services/auth/auth.service";
import { BackendService } from "src/app/services/backend/backend.service";
import { ErrorHandlerService } from "src/app/services/error-handler/error-handler.service";
import { StartServiceService } from "src/app/services/start/start-service.service";
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { TeamServiceService } from 'src/app/services/team/team-service.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { GitlabComponent } from '../task-details/gitlab/gitlab.component';
import { GitlabServiceService } from 'src/app/services/gitlab-service/gitlab-service.service';

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.css']
})
export class PipelineComponent {
  componentName = "PIPELINE"
  workflows;
  workflows2;
  showLoader: boolean = false;
  noData: boolean = false;
  teamIds: string[] = [];
  appkey:string
  teamId: string;
  projectLink: string;
  provider: any;
  ProjectId:number;
  gitlab : boolean = false;

  constructor(private functions: AngularFireFunctions,private http: HttpClient, private githubService: GithubServiceService,public teamService: TeamServiceService, public startService: StartServiceService, public errorHandlerService: ErrorHandlerService,public authService: AuthService, public backendService: BackendService, public applicationSettingsService: ApplicationSettingsService, public cookieService: CookieService, public navbarHandler: NavbarHandlerService, public gitlabService: GitlabServiceService) {}

  ngOnInit() {
    this.navbarHandler.resetNavbar();
    this.navbarHandler.addToNavbar(this.componentName);
    this.showLoader = true;
    this.showLoader = true;
    if (this.startService.showTeams) {
    this.appkey = this.authService.getAppKey();
    this.backendService.getOrgDetails(this.appkey);
      this.teamIds = this.backendService.getOrganizationTeamIds();
      this.teamId = this.authService.getTeamId();
    } else {
      this.startService.userDataStateObservable.subscribe((data) => {
        if (data) {
          this.appkey = this.authService.getAppKey();
          this.backendService.getOrgDetails(this.appkey).subscribe(()=>{
          this.teamIds = this.backendService.getOrganizationTeamIds();
          });
          this.teamId = this.authService.getTeamId();
        }
      });
    }
    this.getWorkflows();
  }

  updateSelectedTeamId(teamId: string) {
    this.showLoader = true;
    this.applicationSettingsService.editedTeamId = teamId;
    this.startService.selectedTeamId = teamId;
    this.authService.userAppSetting.SelectedTeamId = teamId;
    this.startService.readApplicationData();
    this.startService.changeTeam = true;

    const callable = this.functions.httpsCallable('users/updateSelectedTeam');
    callable({Uid: this.startService.uid , SelectedTeam: this.startService.selectedTeamId}).subscribe({
        error: (error) => {
          this.errorHandlerService.showError = true;
          this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
          console.error(error);
        },
        complete: (()=>{
          this.cookieService.set("userSelectedTeamId", teamId);
          this.showLoader = false;
          this.getWorkflows();
        })
    });
  }


  getWorkflows() {
    const orgDomain = this.backendService.getOrganizationDomain();
    const teamName = this.startService.teamName;
    const callable = this.functions.httpsCallable('teams/getGitDetails');
    callable({OrganizationDomain: orgDomain, TeamName: teamName}).subscribe({
      next: (data) => {
        console.log(data[0]);
        this.projectLink = data[0]['ProjectLink'];
        this.provider = data[0]['Provider'];
        this.ProjectId = data[0]['ProjectId'];
        console.log(this.ProjectId);
        console.log(this.provider);
        console.log(this.projectLink);
        if(this.provider=="Github"){
          this.gitlab=false;
          this.githubService.getCompletedWorkflowRuns(this.projectLink).subscribe({
            next: (data) => {
              console.log(data)
              this.workflows = data['workflow_runs'];
              console.log(this.workflows);
              this.showLoader = false;
              if (this.workflows.length === 0) {
                this.noData = true;
              } else {
                this.noData = false;
  
              }
            },
            error: (error) => {
              console.error(error);
            },
            complete: () => {
              this.githubService.getCompletedWorkflowRuns(this.projectLink);
            }
          });
        }
        else{
          this.gitlab=true;
          this.gitlabService.getCompletedWorkflowRuns(this.ProjectId).subscribe({
            next: (data) => {
              console.log(data)
              this.workflows2 = data;
              console.log(this.workflows2);
              this.showLoader = false;
              if (this.workflows2.length === 0) {
                this.noData = true;
              } else {
                this.noData = false;
              }
            },
            error: (error) => {
              console.error(error);
            },
            complete: () => {
              this.gitlabService.getCompletedWorkflowRuns(this.ProjectId);
            }
          });
        }
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.info('Getting Label Data Successful');
      }
    });
  }


}