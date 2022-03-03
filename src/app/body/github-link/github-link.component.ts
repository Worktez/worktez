import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import { GitOrgData } from 'src/app/Interface/githubUserData';
import { BackendService } from 'src/app/services/backend/backend.service';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-github-link',
  templateUrl: './github-link.component.html',
  styleUrls: ['./github-link.component.css']
})
export class GithubLinkComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @Input("teamName") teamName: string;
  @Input("teamId") teamId: string;
  @Input("typeLink") typeLink: string;
  memberOrgName: string;
  organisation: string;
  username: string;
  projLink: string;
  organizationDomain: string;
  dataFetched: boolean = false;
  showClose: boolean = false;
  showSubmitButton: boolean = false;
  objData: GitOrgData[] = [];
  @Output() addedProject = new EventEmitter<{ completed: boolean, memberOrgName: string, projLink: string, organisaion:string, username:string }>();

  constructor(private httpService: HttpServiceService, public backendService: BackendService, private functions: AngularFireFunctions) { }

  ngOnInit(): void {
      
  }

  submit() {
    if (this.memberOrgName) {
      console.log(this.memberOrgName)
      console.log(this.username)
      console.log(this.organisation)
      if (this.organisation != undefined) {
        this.httpService.getGithubOrgRepos(this.memberOrgName).pipe(map(data => {
          const objData = data as GitOrgData[];
          return objData;
        })).subscribe(data => {
          this.objData = data;
          this.dataFetched = true;
          if(this.projLink != undefined){
            this.addProjLink(this.projLink);
            this.showClose = true;
            console.log("the value of close button is:", this.showClose)
          }
          else {
            this.showSubmitButton = true;
          }
        });
      } 
      else if(this.username != undefined) {
        this.httpService.getGithubUserRepos(this.memberOrgName).pipe(map(data => {
          console.log("hereeweeee")
          const objData = data as GitOrgData[];
          return objData;
        })).subscribe(data => {
          this.objData = data;
          this.dataFetched = true;
          if(this.projLink != undefined){
            this.addProjLink(this.projLink);
            this.showClose = true;
            console.log("the value of close button is:", this.showClose)
          }
          else {
            this.showSubmitButton = true;
          }
        });
      }
      }
         
  }

  async addProjLink(projLink: string) {
    console.log(projLink)
    this.organizationDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable('teams/addProjLink');
  try {
    const result = await callable({OrganizationDomain: this.organizationDomain, TeamName: this.teamName, ProjLink: this.projLink}).toPromise();
    this.showClose = true;
  } catch (error) {
    console.error("Error", error);
  }
  }

  added() {
    this.addedProject.emit({ completed: true, memberOrgName: this.memberOrgName, projLink:this.projLink, organisaion:this.organisation, username:this.username});
  }

}
