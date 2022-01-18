import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { GitData } from '../Interface/githubReleaseData';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  tag_name: string

  constructor(public authService: AuthService, private httpService: HttpServiceService, public router: Router) { }

  ngOnInit(): void {
  }
  privacy(){
    this.router.navigate(['/privacy']);
  }

  copyright(){
    this.router.navigate(['/copyright']);
  }

  contributors() {
    this.router.navigate(['/contributors']);
  }

  termsandcondition() {
    this.router.navigate(['/termsandcondition'])
  }
  build(){
    this.router.navigate(['/releasenotes']);
  }
}
