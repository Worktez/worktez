import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GitlabServiceService {

  constructor(private httpClient: HttpClient) { 
  }

  getMergeRequests(projectID: string){ //based on project ID
    const url = environment.gitlabApiUrl + "/projects/"+projectID+"/merge_requests?state=open";
    return this.httpClient.get(url);
  }

  getMrDetails(projectID: string, mergeRequestID: string){ //for each project using project id and merge request id
    const url = environment.gitlabApiUrl + "/projects/"+projectID+"/merge_requests/"+mergeRequestID;
    return this.httpClient.get(url);
  }

  getGitlabUserRepos(memberUserName: string) { //
    const url = environment.gitlabApiUrl + "/users/" + memberUserName + "/projects";
    console.log("gitlab");
    return this.httpClient.get(url);
  }

  getGitlabPrivateRepos(bearerToken: string, memberUserName: string) { /////
    let httpOptions = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    };

    const url = environment.gitlabApiUrl + "/users/" + memberUserName +"/projects?visibility=private";
    return this.httpClient.get(url, httpOptions);

  }

  getGitlabProjDetails(bearerToken: string, projId: number){
    const url =  environment.gitlabApiUrl + "/projects/"+ projId;
    if(bearerToken!=undefined){
      let httpOptions = {
        headers: {
          'Authorization': 'Bearer ' + bearerToken
        }
      };
      return this.httpClient.get(url, httpOptions);
    } else {
      return this.httpClient.get(url);
    }

  }

  getGitlabAllRepos(bearerToken: string, memberUserName: string) { ///////
    let httpOptions = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    };
    
    const url = environment.gitlabApiUrl + "/users/" + memberUserName + "/projects";
    return this.httpClient.get(url, httpOptions);
  }

  getGitlabOrgRepos(memberOrgName: string) { //search group based on search value
    const url = environment.gitlabApiUrl + "/groups?custom_attributes[search]=" + memberOrgName; 
    return this.httpClient.get(url);
  }

  createGitlabIssue(title: any,description: any,projectID: string,bearerToken: string) { ///////
    const url = environment.gitlabApiUrl + "/projects/" + projectID + "/issues";
    let httpOptions = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken,
      }
    };

    const payLoad = {
        title: title,
        body: description
    };

    return this.httpClient.post(url, JSON.stringify(payLoad), httpOptions);
  }

   updateGitlabRelease(bearerToken: string, tagName: string, targetBranch: string, releaseName: string, releaseDescription: string, projectID: number){

    const url = environment.gitlabApiUrl + "/projects/" + projectID + "/releases/"+tagName;

    let httpOptions = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken,
        'Content-Type': 'application/json',
        'content_type': 'text/plain',
      }
    };

    const data = {    
      name: releaseName, 
      tag_name: tagName, 
      description: releaseDescription, 
      ref: targetBranch,
    };

    return this.httpClient.put(url, JSON.stringify(data), httpOptions);
  }

  deleteGitlabRelease(projectID:number, tagName, bearerToken: string){
    const url = environment.gitlabApiUrl + "/projects/" + projectID + "/releases/"+tagName;
    
    let httpOptions = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    };

    return this.httpClient.delete(url, httpOptions);
  }

  getReleaseByTagName(projectID: number, bearerToken: string, tagName: string){
    const url = environment.gitlabApiUrl + "/projects/" + projectID + "/releases/"+tagName;

    let httpOptions = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken
      }
    };

    return this.httpClient.get(url, httpOptions);
  }

  createGitlabRelease(bearerToken: string,releaseName: string, tagName: string, targetBranch: string, releaseDescription: string, projectID: number){
    const url = environment.gitlabApiUrl + "/projects/" + projectID + "/releases";

    let httpOptions = {
      headers: {
        'Authorization': 'Bearer ' + bearerToken,
        'Content-Type': 'application/json',
        'content_type': 'text/plain',
      }
    };
    
    const data = {
      name: releaseName, 
      tag_name: tagName, 
      description: releaseDescription, 
      ref: targetBranch,
  };

    return this.httpClient.post(url, JSON.stringify(data), httpOptions);
  }

  getProjectReleaseDetails(projectID: number){
    const url = environment.gitlabApiUrl + "/projects/" + projectID + "/releases";
    return this.httpClient.get(url);
  }

}
