import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import { GitOrgData } from 'src/app/Interface/githubUserData';
import { BackendService } from 'src/app/services/backend/backend.service';
import { GithubServiceService } from 'src/app/services/github-service/github-service.service';
import { GitlabServiceService } from 'src/app/services/gitlab-service/gitlab-service.service';

@Component({
  selector: 'app-gitlab-link',
  templateUrl: './gitlab-link.component.html',
  styleUrls: ['./gitlab-link.component.css']
})
export class GitlabLinkComponent implements OnInit {

  @ViewChild('form') form: NgForm;
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
  @Output() addedProject = new EventEmitter<{ completed: boolean, memberOrgName: string, projLink: string, searchType: string }>();

  constructor(private githubService: GithubServiceService, public backendService: BackendService, private functions: AngularFireFunctions,private gitlabService: GitlabServiceService) { }

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

  setBearerToken() {
    this.enableLoader=true;
    this.organizationDomain = this.backendService.getOrganizationDomain();
    if(this.bearerToken != undefined){
      this.gitlabToken = btoa(this.bearerToken)
    }else{
      this.gitlabToken = "";
    }
    const callable = this.functions.httpsCallable('teams/addGitToken');
    callable({OrganizationDomain: this.organizationDomain, TeamName: this.teamName, Token: this.gitlabToken, ProjLocation: 'gitlab'}).subscribe({
      next: (data) => {
        console.log("Successfully added Token");
        this.enableLoader=false;
        this.showClose = true;
      },
      error: (error) => {
        console.error(error);
        this.enableLoader=false;
        this.showClose = true;
      },
      complete: () => console.info('Successfully Added Token')
    })
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
    this.organizationDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable('teams/addProjLink');
    callable({OrganizationDomain: this.organizationDomain, TeamName: this.teamName, ProjLink: this.projLink, ProjLocation: 'gitlab'}).subscribe({
      next: (data) => {
        this.setBearerToken()
        console.log("Successfully added project link");
        this.enableLoader=false;
        this.showClose = true;
      },
      error: (error) => {
        console.error(error);
        this.enableLoader=false;
        this.showClose = true;
      },
      complete: () => console.info('Successfully created project link')
    })
    
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
