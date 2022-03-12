import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs';
import { GitRepoData } from 'src/app/Interface/githubOrgData';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-git',
  templateUrl: './git.component.html',
  styleUrls: ['./git.component.css']
})
export class GitComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @Input('taskId') taskId: string;
  @Input('orgDomain') orgDomain: string;
  prLink: string;
  @Output() addedLink = new EventEmitter<{ completed: boolean, prLink: string }>();
  componentName: string = "LINK"
  linkURL: string;
  linkType: string;
  enableLoader: boolean = false;
  showClose: boolean = false;
  prData: GitRepoData[] = [];

  constructor(private httpService: HttpServiceService, private functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService, public validationService: ValidationService) { }

  ngOnInit(): void {
    this.getPullRequests();
  }

  async submit(url) {
    this.prLink = url;
    console.log(this.prLink)
    this.enableLoader = true;
    console.log(this.orgDomain, this.taskId)
      const callable = this.functions.httpsCallable('linker/setLink');
      this.linkType = "PR"
      this.linkURL = this.prLink
      console.log("this is the link url:", this.linkURL)
      await callable({ OrgDomain: this.orgDomain, TaskID: this.taskId, LinkType: this.linkType, LinkURL: this.linkURL }).subscribe({
        next: (data) => {
          console.log("Successful ");
          this.enableLoader = false;
          this.showClose = true;
          return;
        },
        error: (error) => {
          this.enableLoader = false
          this.errorHandlerService.showError = true;
          this.errorHandlerService.getErrorCode(this.componentName, "InternalError", "Api");
          console.log("Error", error);
          console.error(error);
        },
        complete: () => console.info('Successful')
      });

  }

  getPullRequests() {
    this.httpService.getPrDetails().pipe(map(data => {
      const prData = data as GitRepoData[];     
      return prData;
    })).subscribe(data => {
      this.prData = data;
      console.log("the prs:", data)
    });
  }

  close() {
    this.addedLink.emit({ completed: true, prLink: this.prLink });
  }
}
