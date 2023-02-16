/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* Author : Swapnil Bankar <swapnilbankar1010@gmail.com>
*    
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/  
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GitCDMServiceService {

  constructor(private httpClient: HttpClient) { }

  getPullRequests(repoLink: string,projectLoc:string){
    var url='';
    
    if(projectLoc=='github'){
       url = environment.githubApiUrl + "/repos/"+repoLink+"/pulls";
    }
    else{
      url = environment.gitlabApiUrl + "/projects/"+repoLink+"/merge_requests?state=open";
   }
    return this.httpClient.get(url);
  }

  getPrDetails(prApiLink: string, mergeRequestID: string,projectLoc:string){
    var url='';

    if(projectLoc=='github'){
       url = environment.githubApiUrl + "/repos/"+prApiLink;
    }
    else{
      url = environment.gitlabApiUrl + "/projects/"+prApiLink+"/merge_requests/"+mergeRequestID;
    }

    return this.httpClient.get(url);
  }
  
  getGitUserRepos(memberUserName: string,projectLoc:string) {
    var url='';

    if(projectLoc=='github'){
         url = environment.githubApiUrl + "/users/" + memberUserName + "/repos";
    }
    else{
         url = environment.gitlabApiUrl + "/users/" + memberUserName + "/projects";
    }

    return this.httpClient.get(url);
  }

  getGitPrivateRepos(bearerToken: string,memberUserName: string,projectLoc:string) {
    var url='';

    let httpOptions = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    };

    if(projectLoc=='github'){
       url = environment.githubApiUrl + "/user/" + "repos?visibility=private";
    }
    else{
         url = environment.gitlabApiUrl + "/users/" + memberUserName +"/projects?visibility=private";
    }

    return this.httpClient.get(url, httpOptions);

  }

  getGitAllRepos(bearerToken: string,memberUserName: string,projectLoc:string) {
    var url='';

    let httpOptions = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    };

    if(projectLoc=='github'){
       url = environment.githubApiUrl + "/user/" +"repos?";
    }
    else{
         url = environment.gitlabApiUrl + "/users/" + memberUserName + "/projects";
    }

    return this.httpClient.get(url, httpOptions);
  }

  getGitOrgRepos(memberOrgName: string,projectLoc:string) {
    var url='';

    if(projectLoc=='github'){
      url = environment.githubApiUrl+ "/orgs/" + memberOrgName + "/repos";
    }
    else{
      const url = environment.gitlabApiUrl + "/groups?custom_attributes[search]=" + memberOrgName; 
    }

    return this.httpClient.get(url);
  }

  createGitIssue(title: any, description: any, repoLink: string, bearerToken: any,projectLoc:string) {

    let httpOptions = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    };
    
    var url='';

    if(projectLoc=='github'){
       url = environment.githubApiUrl + "/repos/"+repoLink+"/issues";
    }
    else{
       url = environment.gitlabApiUrl + "/projects/" + repoLink + "/issues";
    }

    const payload = {
        title: title,
        body: description
    }

    return this.httpClient.post(url, JSON.stringify(payload), httpOptions);

  }


  markdownGithubDoc(bearerToken: string, body: string){
    const url = environment.githubApiUrl +"/markdown/raw";

    return this.httpClient.post(url, body.toString(), { responseType: 'text', headers: {
      'Authorization': 'Bearer'+bearerToken,
      'Content-Type': 'text/plain',
    },});
  }

  updateGithubRelease(release_id: string, bearerToken: string, tagName: string, targetBranch: string, releaseName: string, releaseDescription: string, draft: boolean, prerelease: boolean, generate_release_notes: boolean, projectLink: string){
    const url = environment.githubApiUrl+"/repos/"+projectLink+"/releases/"+release_id;

    let httpOptions = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    };

    const data = {    
      tag_name: tagName,
      target_commitish: targetBranch,
      name: releaseName,
      body: releaseDescription,
      draft: draft,
      prerelease: prerelease,
      generate_release_notes: generate_release_notes,
    };

    return this.httpClient.post(url, JSON.stringify(data), httpOptions);
  }

  deleteGithubRelease(release_id: string, bearerToken: string){
    const url = environment.gitApiUrl+"/releases/"+release_id;
    
    let httpOptions = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    };

    return this.httpClient.delete(url, httpOptions);
  }

  getReleaseByReleaseId(release_id: string, bearerToken: string, projectLink: string){
    const url = environment.githubApiUrl+"/repos/"+projectLink+"/releases/"+release_id;

    let httpOptions = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    };

    return this.httpClient.get(url, httpOptions);
  }

  createGithubRelease(bearerToken: string,releaseName: string, tagName: string, targetBranch: string, releaseDescription: string, response: boolean, response1: boolean, response2: boolean, projectLink: string){
    const url = environment.githubApiUrl+"/repos/"+projectLink+"/releases";

    let httpOptions = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    };
    
    const data = {    
      tag_name:tagName,
      target_commitish:targetBranch,
      name:releaseName,
      body:releaseDescription,
      draft: response,
      prerelease: response1,
      generate_release_notes: response2,
    };

    return this.httpClient.post(url, JSON.stringify(data), httpOptions);
  }

  getProjectReleaseDetails(projectLink: string){
    const url = environment.githubApiUrl +"/repos/"+projectLink+"/releases";
    return this.httpClient.get(url);
  }

}
