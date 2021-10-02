import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { GitData } from '../Interface/githubReleaseData';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  tag_name: string

  constructor(private httpService: HttpServiceService) { }

  ngOnInit(): void {
    try {
      this.httpService.getReleaseDetails().pipe(map(data => {
        const objData = data[0] as GitData;
        return objData;
      })).subscribe(data => {
        this.tag_name = data.tag_name;
        
      });
    } catch (error) {
      
    }
  }

}
