import { Component, Input, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Team } from 'src/app/Interface/TeamInterface';
import { BackendService } from 'src/app/services/backend/backend.service';
import { TeamServiceService } from 'src/app/services/team/team-service.service';

@Component({
  selector: 'app-github-integration',
  templateUrl: './github-integration.component.html',
  styleUrls: ['./github-integration.component.css']
})
export class GithubIntegrationComponent implements OnInit {

  @Input('team') team: Team

  teamToAddGithub: Team;
  addProjectEnabled: boolean = false;
  typeLink: string;
  projectLinked: boolean= false;
  repoLink: string;
  repoLoc: string;
  githubTokenExists: boolean = false;
  enableAddToken: boolean = false;
  bearerToken: string = "";
  showClose: boolean = false;
  enableLoader: boolean = false;

  constructor(private teamService: TeamServiceService, private backendService: BackendService, private functions: AngularFireFunctions) { }

  ngOnInit(): void {
    this.checkGitProject();
    this.checkGitToken(this.team.GitToken);
  }

  enableAddOrganisationLink(team: Team) {
    this.teamToAddGithub = team;
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
        this.githubTokenExists=false;
      }
      else{
        this.githubTokenExists=true;
      }
    }
  }

  addedProject(data: { completed: boolean, memberEmail: string, projLink: string}) {
    this.addProjectEnabled = false;
    if(data.completed==true){
      this.projectLinked=data.completed;
      this.repoLink=data.projLink;
      this.repoLoc='Github';
      this.teamService.teamsDataJson[this.team.TeamId].ProjectLink = this.repoLink;
      this.teamService.teamsDataJson[this.team.TeamId].ProjectLocation = this.repoLoc;
    }
  }

  addTokenEnable(){
    this.enableAddToken = true
  }

  unLinkGithub(){
    this.repoLoc='Github';
    this.repoLink="";
    this.addProjLink(this.repoLink);
  }

  addProjLink(projLink: string){
    this.repoLink=projLink;
    this.enableLoader=true;
    const organizationDomain = this.backendService.getOrganizationDomain();
    this.team.ProjectLink=projLink;
    this.teamService.addGitDetails(organizationDomain, this.team.TeamName, '', '', '', null, '' ,'','');
    this.enableLoader=false;
    this.showClose = true;
  }

  back() {
    this.enableAddToken= false;
    this.showClose = false
    // this.getTeamData();
  }

  addToken() {
    this.enableLoader=true;
    const organizationDomain = this.backendService.getOrganizationDomain();
    const teamName = this.team.TeamName
    const gitToken = btoa(this.bearerToken)
    this.teamService.updateGitDetails(organizationDomain, teamName, gitToken);
    this.checkGitToken(gitToken);
    this.enableLoader=false;
    this.showClose = true;
   
  }
}
