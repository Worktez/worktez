import { not } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import { GitOrgData } from 'src/app/Interface/githubUserData';
import { HttpServiceService } from 'src/app/services/http-service.service';
// import { Octokit } from "@octokit/core";

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
  dataFetched: boolean = false;
  showClose: boolean = false;
  objData: GitOrgData[] = [];
  @Output() addedProject = new EventEmitter<{ completed: boolean, memberOrgName: string }>();

  constructor(private httpService: HttpServiceService) { }

  ngOnInit(): void {
      
  }

  submit() {
    if (this.memberOrgName) {
      console.log(this.memberOrgName)
      this.httpService.getGithubOrgRepos(this.memberOrgName).pipe(map(data => {
        const objData = data as GitOrgData[];
        console.log(objData)
        return objData;
      })).subscribe(data => {
        this.objData = data;
        this.dataFetched = true;
      });
    }    
  }

  added() {
    this.addedProject.emit({ completed: true, memberOrgName: this.memberOrgName});
  }

}
