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

  getPrDetails(){
    const url = environment.gitApiUrl + "/repos/Worktez/worktez/pulls";
    return this.httpClient.get(url);
  }

  getReleaseDetails(){
    return this.httpClient.get(this.gitReleaseApiUrl);
  }

  getGithubUserRepos(memberUserName) {
    const url = environment.gitApiUrl + "/users/" + memberUserName + "/repos";
    return this.httpClient.get(url);
  }

  getGithubOrgRepos(memberOrgName) {
    const url = environment.gitApiUrl + "/orgs/" + memberOrgName + "/repos";
    console.log("the url:", url);
    return this.httpClient.get(url);
  }
}
