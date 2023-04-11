import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GitlabServiceService {

  constructor(private httpClient: HttpClient) { 
  }

  getMergeRequests(projectID: number){ //based on project ID
    console.log(projectID);
    const url = environment.gitlabApiUrl + "/projects/"+projectID+"/merge_requests?state=opened";
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
        'Authorization': 'Bearer ' + bearerToken
      }
    };

    const payLoad = {
        title: title,
        body: description
    };

    return this.httpClient.post(url, JSON.stringify(payLoad), httpOptions);
  }
}
