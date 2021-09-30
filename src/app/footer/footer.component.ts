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
  releaseData: string
  tag_name: string
  id: string
  created_at: string
  published_at: string

  constructor(private httpService: HttpServiceService) { }

  ngOnInit(): void {
    try {
      this.httpService.getReleaseDetails().pipe(map(data => {
        const objData = data[0] as GitData;
        return objData;
      })).subscribe(data => {
        this.tag_name = data.tag_name;
        this.id = data.id;
        this.created_at = data.created_at;
        this.published_at = data.published_at;
      });
    } catch (error) {
      
    }
  }

}
