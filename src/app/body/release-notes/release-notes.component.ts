import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { GitData } from 'src/app/Interface/githubReleaseData';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.css']
})
export class ReleaseNotesComponent implements OnInit {
  componentName: string = "RELEASE NOTES"

  releaseData: GitData[] 

  constructor(public navbarHandler: NavbarHandlerService, private httpService: HttpServiceService) { }

  ngOnInit(): void {

    this.navbarHandler.resetNavbar();
    this.navbarHandler.addToNavbar(this.componentName);
    
    try {
      this.httpService.getReleaseDetails().pipe(map(data => {
        const objData = data as GitData[];
        this.releaseData=objData;
        return objData;
      })).subscribe(data => {

      });
    } catch (error) {      
    }
  }

}
