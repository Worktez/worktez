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

  updateGithubRelease(release_id, bearerToken, tagName, targetBranch, releaseName, releaseDescription, response, response1, response2){
    const url = environment.gitApiUrl+"/releases/"+release_id;
    const headers = {
      'Authorization': 'Bearer ' + bearerToken
    }
    const data = {    
      tag_name:tagName,
      target_commitish:targetBranch,
      name:releaseName,
      body:releaseDescription,
      draft: response,
      prerelease: response1,
      generate_release_notes: response2,
    }

    const reply = fetch(url, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(data),
    })
    
  }

  deleteGithubRelease(release_id, bearerToken){
    const url = environment.gitApiUrl+"/releases/"+release_id;
    const headers = {
      'Authorization': 'Bearer ' + bearerToken
    }
    const reply = fetch(url, {
      method: "DELETE",
      headers: headers,
    })
  }

  getReleaseByReleaseId(release_id, bearerToken){
    const url = environment.gitApiUrl+"/releases/"+release_id;

    let httpOptions = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    };

    return this.httpClient.get(url, httpOptions);
  }

  createGithubRelease(bearerToken,releaseName, tagName, targetBranch, releaseDescription, response, response1, response2){
    console.log(bearerToken);
    const url = environment.gitApiUrl+"/releases";

    const headers = {
      'Authorization': 'Bearer ' + bearerToken
    }

    const data = {    
      tag_name:tagName,
      target_commitish:targetBranch,
      name:releaseName,
      body:releaseDescription,
      draft: response,
      prerelease: response1,
      generate_release_notes: response2,
    }

    const reply = fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data)
    })
    return reply;
  }
}
