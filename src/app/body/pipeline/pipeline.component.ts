import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GithubServiceService } from 'src/app/services/github-service/github-service.service';

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.css']
})
export class PipelineComponent {
  workflows;
  showLoader: boolean = false;
  noData: boolean = false;
  repoName: string = '';
  ownerName: string = '';

  constructor(private http: HttpClient, private githubService: GithubServiceService) {}

  ngOnInit() {
    this.showLoader = true;
    this.getWorkflows();
  }

  getWorkflows() {
    if (this.ownerName !== '' && this.repoName !== '') {
      this.showLoader = true;
      this.githubService.getCompletedWorkflowRuns(this.ownerName, this.repoName).subscribe(data => {
        this.workflows = data['workflow_runs'];
        console.log(this.workflows);
        this.showLoader = false;
        if (this.workflows.length === 0) {
          this.noData = true;
        } else {
          this.noData = false;
        }
      });
    }
  }

  searchWorkflowRuns() {
    this.getWorkflows();
  }
}

