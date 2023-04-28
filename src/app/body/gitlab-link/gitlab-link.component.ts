import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { map } from 'rxjs';
import { GitOrgData } from 'src/app/Interface/githubUserData';
import { BackendService } from 'src/app/services/backend/backend.service';
import { GitlabServiceService } from 'src/app/services/gitlab-service/gitlab-service.service';
import { TeamServiceService } from 'src/app/services/team/team-service.service';

@Component({
  selector: 'app-gitlab-link',
  templateUrl: './gitlab-link.component.html',
  styleUrls: ['./gitlab-link.component.css']
})
export class GitlabLinkComponent implements OnInit {

  @Input("teamName") teamName: string;
  @Input("teamId") teamId: string;
  @Input("typeLink") typeLink: string;
  memberOrgName: string;
  searchType: string = 'organisation';
  projLink: string;
  organizationDomain: string;
  dataFetched: boolean = false;
  showClose: boolean = false;
  showSubmitButton: boolean = false;
  objData: GitOrgData[] = [];
  enableLoader: boolean=false;
  noRepoFound: boolean=false
  linkType: string = "Public";
  bearerToken: string;
  gitlabToken: string
  projLoc: string;
  owner: string;
  projectUrl: string;
  createdAt: string;
  projectId: number;

  @Output() addedProject = new EventEmitter<{ completed: boolean, memberOrgName: string, projLink: string, searchType: string }>();

  constructor(public backendService: BackendService, private functions: AngularFireFunctions,private gitlabService: GitlabServiceService, public teamService: TeamServiceService) { }

  ngOnInit(): void {

  }
  
  submit() {
    if (this.memberOrgName) {
      if (this.searchType == 'organisation' && this.linkType == 'Public') {
        this.gitlabService.getGitlabUserRepos(this.memberOrgName).pipe(map(data => {
          const objData = data as GitOrgData[];
          return objData;
        })).subscribe({
          next: (data) => {
            this.objData = data;
            this.dataFetched = true;
            console.log("Successfull");
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('Successfull')
        });
      } else if (this.searchType == 'organisation') {
        if (this.linkType=='Private'){
          this.gitlabService.getGitlabPrivateRepos(this.bearerToken, this.memberOrgName).pipe(map(data => {
            const objData =data as GitOrgData[];
            return objData;
          })).subscribe({
            next: (data) => {
              this.objData = data;
              this.dataFetched = true;
              console.log("Successfull");
            },
            error: (error) => {
              console.error(error);
            },
            complete: () => console.info('Successfull')
          })
        } else if(this.linkType=='All') {
          this.gitlabService.getGitlabAllRepos(this.bearerToken, this.memberOrgName).pipe(map(data => {
            const objData =data as GitOrgData[];
            return objData;
          })).subscribe({
            next: (data) => {
              this.objData = data;
              this.dataFetched = true;
              console.log("Successfull");
            },
            error: (error) => {
              console.error(error);
            },
            complete: () => console.info('Successfull')
          })
        }
      }
      else if(this.searchType == 'username' && this.linkType == 'Public') {
        this.gitlabService.getGitlabUserRepos(this.memberOrgName).pipe(map(data => {
          const objData = data as GitOrgData[];
          return objData;
        })).subscribe({
          next: (data) => {
            this.objData = data;
            this.enableLoader=false;
            this.dataFetched = true;
            console.log("Successfull");
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('Successfull')
        });
      }
      else if (this.searchType == 'username') {
        if (this.linkType=='Private'){
          this.gitlabService.getGitlabPrivateRepos(this.bearerToken, this.memberOrgName).pipe(map(data => {
            const objData =data as GitOrgData[];
            return objData;
          })).subscribe({
            next: (data) => {
              this.objData = data;
              this.dataFetched = true;
              console.log("Successfull");
            },
            error: (error) => {
              console.error(error);
            },
            complete: () => console.info('Successfull')
          })
        } else if(this.linkType=='All') {
          this.gitlabService.getGitlabAllRepos(this.bearerToken, this.memberOrgName).pipe(map(data => {
            const objData =data as GitOrgData[];
            return objData;
          })).subscribe({
            next: (data) => {
              this.objData = data;
              this.dataFetched = true;
              console.log("Successfull");
            },
            error: (error) => {
              console.error(error);
            },
            complete: () => console.info('Successfull')
          })
        }
      }
      }
         
  }

  addGitDetails() {
    this.gitlabService.getGitlabProjDetails(this.bearerToken, this.projectId).subscribe({
      next: (data) => {
        this.owner = data['namespace']['name'];
        this.projectUrl = data['http_url_to_repo'];
        this.projectId = data['id'];
        this.createdAt = data['created_at'];
        this.organizationDomain = this.backendService.getOrganizationDomain();
        this.teamService.addGitDetails(this.organizationDomain, this.teamName, this.createdAt, this.owner, this.bearerToken, this.projectId, this.projLink, this.projectUrl, "gitlab");
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.info("Successful")
      }
    })

  }

  setBearerToken() {
    this.enableLoader=true;
    this.organizationDomain = this.backendService.getOrganizationDomain();
    if(this.bearerToken != undefined){
      this.gitlabToken = btoa(this.bearerToken)
    }else{
      this.gitlabToken = "";
    }
    this.teamService.updateGitDetails(this.organizationDomain, this.teamName, this.gitlabToken);
    this.addGitDetails();
    this.enableLoader=false;
    this.showClose = true;
  }

  setLinkType(linkType: string) {
    if (linkType == 'Public') {
      this.linkType = "Public";
    }
    if (linkType == 'Private'){
      this.linkType = "Private";
    }
    if (linkType == 'All') {
      this.linkType = "All"
    }

  }

  addProjLink(projLink: string, projId: number) {
    this.projectId=projId;
    this.projLink=projLink;
    this.enableLoader=true;
    this.setBearerToken();   
  }

  added() {
    if(this.projLink != undefined && this.projLink!=""){
    this.addedProject.emit({ completed: true, memberOrgName: this.memberOrgName, projLink:this.projLink, searchType:this.searchType});
  }
    else{
      this.addedProject.emit({ completed: false, memberOrgName: this.memberOrgName, projLink:this.projLink, searchType:this.searchType});
    }
  }


}
