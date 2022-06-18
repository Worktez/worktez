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
             if (this.releaseData[key]) {
               this.bodyArray = this.releaseData[key].body.split("\n");
               const startIndex = this.bodyArray.indexOf('### Features:\r');
               const endIndex = this.bodyArray.indexOf('## Release Credit:\r');     
               if(startIndex != -1){
                this.updatesArray=this.bodyArray.slice(startIndex,endIndex);
                console.log(this.updatesArray);
                return this.updatesArray;
              }
 
              }

           }
         },
         error: (error) => {

         },
         complete: () => {
          console.log("completed fetching data");
         }
      });
}



}
