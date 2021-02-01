import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavbarHandlerService {

  navbarList: string[] = []
  navbarString: string = ""
  currentTab: string = ""

  constructor(public router: Router) { }

  getUrl() {
    this.navbarString = this.router.url;
  }
}
