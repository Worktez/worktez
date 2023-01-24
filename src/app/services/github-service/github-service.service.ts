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

  createGithubIssue(title: any, description: any, repoLink: string, bearerToken: any) {
    const url = environment.githubApiUrl + "/repos/"+repoLink+"/issues";

    let httpOptions = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    };

    const payload = {
        title: title,
        body: description
    }

    return this.httpClient.post(url, JSON.stringify(payload), httpOptions);
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
