import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { GitData } from 'src/app/Interface/githubReleaseData';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { HttpServiceService } from 'src/app/services/http/http-service.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
@Component({
  selector: 'app-whats-new',
  templateUrl: './whats-new.component.html',
  styleUrls: ['./whats-new.component.css']
})
export class WhatsNewComponent implements OnInit {
  componentName: string = "WHATS NEW"
  versionName: string;
  bodyArray: string[] = []
  updatesArray: string[] = []
  releaseData: GitData[]

  constructor(private httpService: HttpServiceService, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
      this.httpService.getReleaseDetails().pipe(map(data => {
        const objData = data as GitData[];
        return objData;
      })).subscribe({
        next:(data) => {
          this.releaseData = data;
          for(const key in this.releaseData) {
            this.bodyArray = [];
            if (this.releaseData[key]) {
              const stmp = this.releaseData[key].body.indexOf("### Features:");
              if(stmp != -1) {
                const etmp = this.releaseData[key].body.indexOf("## ", stmp+4);
                var temp = this.releaseData[key].body.slice(stmp, etmp);
                temp = temp.slice(temp.indexOf("\n")+1, temp.lastIndexOf("\r")-1);
                this.bodyArray = temp.split("\n");
              }
            }
            if(this.bodyArray.length) {
              for (const key in this.bodyArray) {
                if (this.bodyArray[key].length) {
                  const element = this.bodyArray[key];
                  this.updatesArray.push(element.substring(3));
                  if(this.updatesArray.length >= 20) {
                    break;
                  }
                }
              }
            }
            if(this.updatesArray.length >= 20) {
              break;
            }
          }
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.log("completed fetching data");
        }
       });
             
}


}
