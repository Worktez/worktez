import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GithubServiceService {

  constructor(private httpClient: HttpClient) { 
  }

  getPullRequests(repoLink: string){
    const url = environment.githubApiUrl + "/repos/"+repoLink+"/pulls";
    return this.httpClient.get(url);
  }

  getPrDetails(prApiLink: string){
    const url = environment.githubApiUrl + "/repos/"+prApiLink;
    return this.httpClient.get(url);
  }
  
  getGithubUserRepos(memberUserName: string) {
    const url = environment.githubApiUrl + "/users/" + memberUserName + "/repos";
    console.log("github");
    return this.httpClient.get(url);
  }

  getGithubPrivateRepos(bearerToken: string) {
    let httpOptions = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    };

    const url = environment.githubApiUrl + "/user/" + "repos?visibility=private";
    return this.httpClient.get(url, httpOptions);

  }

  getGithubAllRepos(bearerToken: string) {
    let httpOptions = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    };

    const url = environment.githubApiUrl + "/user/" +"repos?";
    return this.httpClient.get(url, httpOptions);
  }

  getGithubOrgRepos(memberOrgName: string) {
    const url = environment.githubApiUrl+ "/orgs/" + memberOrgName + "/repos";
    return this.httpClient.get(url);
  }

  createGithubIssue(title: any,description: any,repoLink: string,bearerToken: any) {
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
