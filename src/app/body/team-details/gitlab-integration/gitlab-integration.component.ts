import { Component, Input, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Team } from 'src/app/Interface/TeamInterface';
import { BackendService } from 'src/app/services/backend/backend.service';
import { TeamServiceService } from 'src/app/services/team/team-service.service';

@Component({
  selector: 'app-gitlab-integration',
  templateUrl: './gitlab-integration.component.html',
  styleUrls: ['./gitlab-integration.component.css']
})
export class GitlabIntegrationComponent implements OnInit {

  @Input('team') team: Team

  teamToAddGitlab: Team;
  addProjectEnabled: boolean = false;
  typeLink: string;
  projectLinked: boolean= false;
  repoLink: string;
  repoLoc: string;
  gitlabTokenExists: boolean = false;
  enableAddToken : boolean = false;
  showClose : boolean = false;
  bearerToken: string = "";
  enableLoader: boolean = false;

  constructor(private teamService: TeamServiceService, private backendService: BackendService, private functions: AngularFireFunctions) { }

  ngOnInit(): void {
    this.checkGitProject();
    this.checkGitToken(this.team.GitToken);
  }

  enableAddOrganisationLink(team: Team) {
    this.teamToAddGitlab = team;
    this.addProjectEnabled = true;
    this.typeLink = "Organisation";
  }

  checkGitProject(){
    if(this.team.ProjectLink!=undefined){
      if(this.team.ProjectLink==""){
        this.projectLinked=false;
      }
      else{
        this.projectLinked=true;
        this.repoLink=this.team.ProjectLink;
        this.repoLoc=this.team.ProjectLocation;
      }
    }
  }

  checkGitToken(gitToken: string){
    if(gitToken!=undefined){
      if(gitToken==""){
        this.gitlabTokenExists=false;
      }
      else{
        this.gitlabTokenExists=true;
      }
    }
  }

  addedGitlabProject(data: { completed: boolean, memberEmail: string, projLink: string}) {
    this.addProjectEnabled = false;
    if(data.completed==true){
      this.projectLinked=data.completed;
      this.repoLink=data.projLink;
      this.repoLoc='gitlab';
      this.teamService.teamsDataJson[this.team.TeamId].ProjectLink = this.repoLink;
      this.teamService.teamsDataJson[this.team.TeamId].ProjectLocation = this.repoLoc;
    }
  }

  unLinkGithub(){
    this.repoLink="";
    this.addProjLink(this.repoLink);
  }

  addProjLink(projLink: string){
    this.repoLink=projLink;
    this.enableLoader=true;
    const organizationDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable('teams/addProjLink');
    callable({OrganizationDomain: organizationDomain, TeamName: this.team.TeamName, ProjLink: this.repoLink, ProjLocation: ''}).subscribe({
      next: (data) => {
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

  addTokenEnable(){
    this.enableAddToken = true
  }

  back() {
    this.enableAddToken= false;
    this.showClose = false;
    // this.getTeamData();
  }

  addToken() {
    this.enableLoader=true;
    const organizationDomain = this.backendService.getOrganizationDomain();
    const teamName = this.team.TeamName
    const gitToken = btoa(this.bearerToken)
    const callable = this.functions.httpsCallable('teams/addGitToken');
    callable({OrganizationDomain: organizationDomain, TeamName: teamName, Token: gitToken}).subscribe({
      next: (data) => {
        console.log("Successfully added Token");
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
