import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { GitData } from 'src/app/Interface/githubReleaseData';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
@Component({
  selector: 'app-whats-new',
  templateUrl: './whats-new.component.html',
  styleUrls: ['./whats-new.component.css']
})
export class WhatsNewComponent implements OnInit {
  componentName: string = "WHATS NEW"
  versionName: string;
  bodyArray: Array<string>
  updatesArray: Array<string> 
  releaseData: GitData[]

  constructor(private httpService: HttpServiceService, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    try{
      this.httpService.getReleaseDetails().pipe(map(data => {
        const objData = data as GitData[];
        this.releaseData = objData;
        this.bodyArray=data[0]['body'].split("\n")
        this.updatesArray=this.bodyArray.slice(this.bodyArray.indexOf('### Features:\r'),this.bodyArray.indexOf('## Release Credit:\r'))
        const featIndex = this.updatesArray.indexOf('### Features:\r');
        this.updatesArray[featIndex]= 'Features :';

        const bugIndex = this.updatesArray.indexOf('### Bugs:\r');
        this.updatesArray[bugIndex]= 'Bugs :';
        this.versionName = this.bodyArray[2]
        this.versionName=this.versionName.replace('**','')
        this.versionName=this.versionName.replace('**','')
      
        this.updatesArray[0]=this.updatesArray[0].replace('###','')
      })).subscribe(data => {

      });
    } catch (error) {
      this.errorHandlerService.showError = true;
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError", "Api");
    }  
 
}



}
