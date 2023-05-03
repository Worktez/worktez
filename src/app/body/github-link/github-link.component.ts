import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import { GitOrgData } from 'src/app/Interface/githubUserData';
import { BackendService } from 'src/app/services/backend/backend.service';
import { GithubServiceService } from 'src/app/services/github-service/github-service.service';
import { TeamServiceService } from 'src/app/services/team/team-service.service';

@Component({
  selector: 'app-github-link',
  templateUrl: './github-link.component.html',
  styleUrls: ['./github-link.component.css']
})
export class GithubLinkComponent implements OnInit {

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
  gitToken: string;
  owner: string;
  projectUrl: string;
  createdAt: string;
  projectId: number;

  @Output() addedProject = new EventEmitter<{ completed: boolean, memberOrgName: string, projLink: string, searchType: string }>();

  constructor(private githubService: GithubServiceService, public backendService: BackendService, private functions: AngularFireFunctions, public teamService: TeamServiceService) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.memberOrgName) {
      if (this.searchType == 'organisation' && this.linkType == 'Public') {
        this.githubService.getGithubUserRepos(this.memberOrgName).pipe(map(data => {
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
          this.githubService.getGithubPrivateRepos(this.bearerToken).pipe(map(data => {
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
          this.githubService.getGithubAllRepos(this.bearerToken).pipe(map(data => {
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
        this.githubService.getGithubUserRepos(this.memberOrgName).pipe(map(data => {
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
          this.githubService.getGithubPrivateRepos(this.bearerToken).pipe(map(data => {
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
          this.githubService.getGithubAllRepos(this.bearerToken).pipe(map(data => {
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

  getGitDetails(){
    this.organizationDomain = this.backendService.getOrganizationDomain();
    this.githubService.getGithubRepoDetails(this.bearerToken, this.projLink).subscribe({
      next: (data) => {
        this.owner=data['owner']['login'];
        this.projectUrl=data['clone_url'];
        this.createdAt=data['created_at'];
        this.projectId = data['id'];
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log("Successfully fetched repo details");
        this.teamService.addGitDetails(this.organizationDomain, this.teamName, this.createdAt, this.owner, this.bearerToken, this.projectId, this.projLink, this.projectUrl, "Github");
      }
      
    })
  }

  setBearerToken() {
    this.enableLoader=true;
    this.organizationDomain = this.backendService.getOrganizationDomain();
    if(this.bearerToken != undefined){
      this.gitToken = btoa(this.bearerToken)
    }else{
      this.gitToken = "";
    }
    this.teamService.updateGitDetails(this.organizationDomain, this.teamName, this.gitToken);
    this.getGitDetails();
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

  addProjLink(projLink: string) {
    this.projLink=projLink;   
    this.enableLoader=true;
    this.setBearerToken()
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
