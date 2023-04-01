import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { GitData } from 'src/app/Interface/githubReleaseData';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

@Component({
  selector: 'app-release-card',
  templateUrl: './release-card.component.html',
  styleUrls: ['./release-card.component.css']
})
export class ReleaseCardComponent implements OnInit {
  componentName: string = "RELEASE CARDS"
  @Input("release") release: GitData[];
  @Input("teamId") teamId: string;
  releaseData: GitData[] 
 
  constructor( private router: Router, private httpService: HttpServiceService, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
  }

  getReleaseDetails(releaseId: any, tag_name: any){
    if(releaseId == undefined){
      this.router.navigate(['ReleaseDetails/', tag_name]);
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
    } else {
      this.router.navigate(['ReleaseDetails/', releaseId]);
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
    }
  }

}
