import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  isHomePage: boolean = false;

  constructor(private httpService: HttpServiceService, public router: Router) { }

  ngOnInit(): void {
    if (this.router.url == "/")  {
      this.isHomePage = true;
    } else {
      this.isHomePage =  false;
    }
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
  privacy(){
    this.router.navigate(['/privacy']);
  }

  copyright(){
    this.router.navigate(['/copyright']);
  }
}
