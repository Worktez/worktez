import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
 private gitReleaseApiUrl: string;

  constructor(private httpClient: HttpClient) { 
    this.gitReleaseApiUrl = environment.gitApiUrl + "/releases";
  }

  getPullRequests(repoLink){
    const url = environment.githubApiUrl + "/repos/"+repoLink+"/pulls";
    return this.httpClient.get(url);
  }

  getPrDetails(prApiLink){
    const url = environment.githubApiUrl + "/repos/"+prApiLink;
    return this.httpClient.get(url);
  }

  getReleaseDetails(){
    return this.httpClient.get(this.gitReleaseApiUrl);
  }

  getGithubUserRepos(memberUserName) {
    const url = environment.githubApiUrl + "/users/" + memberUserName + "/repos";
    return this.httpClient.get(url);
  }

  getGithubPrivateRepos(bearerToken) {
    let httpOptions = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    };

    const url = environment.githubApiUrl + "/user/" +"repos?visibility=private";
    return this.httpClient.get(url, httpOptions);

  }

  getGithubAllRepos(bearerToken) {
    let httpOptions = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    };

    const url = environment.githubApiUrl + "/user/" +"repos?";
    return this.httpClient.get(url, httpOptions);
  }

  getGithubOrgRepos(memberOrgName) {
    const url = environment.githubApiUrl+ "/orgs/" + memberOrgName + "/repos";
    return this.httpClient.get(url);
  }

  createGithubIssue(title,description,repoLink,bearerToken) {
    const url = environment.githubApiUrl + "/repos/"+repoLink+"/issues";
    const token = bearerToken;
    const headers = {
        "Authorization" : `Bearer ${token}`
    }

    const payLoad = {
        title: title,
        body: description
    }

    const response = fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payLoad)
    })
  }

}
