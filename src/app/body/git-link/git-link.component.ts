import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import { GitOrgData } from 'src/app/Interface/githubUserData';
import { BackendService } from 'src/app/services/backend/backend.service';
import { GitCDMServiceService } from 'src/app/services/gitCDM-service/git-cdm-service.service';

@Component({
  selector: 'app-git-link',
  templateUrl: './git-link.component.html',
  styleUrls: ['./git-link.component.css']
})
export class GitLinkComponent implements OnInit {

  @Input("teamName") teamName: string;
  @Input("teamId") teamId: string;
  @Input("typeLink") typeLink: string;
  @Input("projectLoc") projectLoc: string;
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
  projLoc: string;
  
  @Output() addedProject = new EventEmitter<{ completed: boolean, memberOrgName: string, projLink: string, searchType: string }>();

  constructor(private gitService: GitCDMServiceService, public backendService: BackendService, private functions: AngularFireFunctions) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.memberOrgName) {
      if (this.searchType == 'organisation' && this.linkType == 'Public') {
        this.gitService.getGitUserRepos(this.memberOrgName,this.projectLoc).pipe(map(data => {
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
          this.gitService.getGitPrivateRepos(this.bearerToken,this.memberOrgName,this.projectLoc).pipe(map(data => {
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
          this.gitService.getGitAllRepos(this.bearerToken,this.memberOrgName,this.projectLoc).pipe(map(data => {
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
        this.gitService.getGitUserRepos(this.memberOrgName,this.projectLoc).pipe(map(data => {
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
          this.gitService.getGitPrivateRepos(this.bearerToken,this.memberOrgName,this.projectLoc).pipe(map(data => {
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
          this.gitService.getGitAllRepos(this.bearerToken,this.memberOrgName,this.projectLoc).pipe(map(data => {
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
      this.gitToken = btoa(this.bearerToken)
    }else{
      this.gitToken = "";
    }
    const callable = this.functions.httpsCallable('teams/addGitToken');
    callable({OrganizationDomain: this.organizationDomain, TeamName: this.teamName, Token: this.gitToken, ProjLocation: this.projectLoc}).subscribe({
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
    callable({OrganizationDomain: this.organizationDomain, TeamName: this.teamName, ProjLink: this.projLink, ProjLocation: this.projectLoc}).subscribe({
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
