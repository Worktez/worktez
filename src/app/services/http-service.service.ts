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

  getReleaseDetails(){
    return this.httpClient.get(this.gitReleaseApiUrl);
  }

  getGithubUserDetails() {
    const url = environment.githubApiUrl + "/users/printf-twinkle";
    return this.httpClient.get(url);
  }

  getGithubUserRepos() {
    const url = environment.githubApiUrl + "/users/printf-twinkle/repos";
    return this.httpClient.get(url);
  }

  getGithubOrgRepos(memberOrgName) {
    const url = environment.githubApiUrl + "/orgs/" + memberOrgName + "/repos";
    console.log("the url:", url);
    return this.httpClient.get(url);
  }
}
