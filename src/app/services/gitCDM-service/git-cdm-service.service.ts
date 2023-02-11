import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { TeamServiceService } from '../team/team-service.service';

@Injectable({
  providedIn: 'root'
})
export class GitCDMServiceService {

  addProjectEnabled: boolean = false;
  projectLinked: boolean= false;
  repoLink: string;
  repoLoc: string;
  gitTokenExists: boolean = false;
  enableAddToken: boolean = false;
  showClose: boolean = false;
  enableLoader: boolean = false;

  constructor(private functions: AngularFireFunctions,private teamService: TeamServiceService) { }

  checkGitToken(gitToken: string){
    if(gitToken!=undefined){
      if(gitToken==""){
        this.gitTokenExists=false;
      }
      else{
        this.gitTokenExists=true;
      }
    }
  }

  checkGitProject(ProjectLink:string,ProjectLocation:string){
    if(ProjectLink!=undefined){
      if(ProjectLink==""){
        this.projectLinked=false;
      }
      else{
        this.projectLinked=true;
        this.repoLink=ProjectLink;
        this.repoLoc=ProjectLocation;
      }
    }
  }

  addedProject(data: { completed: boolean, memberEmail: string, projLink: string},TeamId:string,repoLoc:string) {
    this.addProjectEnabled = false;
    if(data.completed==true){
      this.projectLinked=data.completed;
      this.repoLink=data.projLink;
      this.repoLoc=repoLoc;
      this.teamService.teamsDataJson[TeamId].ProjectLink = this.repoLink;
      this.teamService.teamsDataJson[TeamId].ProjectLocation = this.repoLoc;
    }
  }

  addProjLink(projLink: string,teamName: string,organizationDomain: string,projLocation:string){
    this.enableLoader=true;
    const callable = this.functions.httpsCallable('teams/addProjLink');
    callable({OrganizationDomain: organizationDomain, TeamName: teamName , ProjLink: projLink, ProjLocation: projLocation}).subscribe({
      next: (data) => {
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

  addToken(teamName: string,organizationDomain: string,gitToken:string) {
    this.enableLoader=true;
    const callable = this.functions.httpsCallable('teams/addGitToken');
    callable({OrganizationDomain: organizationDomain, TeamName: teamName, Token: gitToken}).subscribe({
      next: (data) => {
        this.checkGitToken(gitToken);
        this.enableLoader=false;
        this.showClose = true;
      },
      error: (error) => {
        console.error(error);
        this.enableLoader=false;
        this.showClose = true;
      },
      complete: () => console.info('Successfully Added Token')
    });
  }
  
}