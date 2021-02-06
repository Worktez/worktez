import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarHandlerService {

  navbarString: string = ""
  currentTab: string = ""

  constructor() { }

  addToNavbar(componentName1: string, componentName2?: string) {
    if (componentName2) {
      this.navbarString += this.currentTab + " / " + componentName1 + " / "
      this.currentTab = componentName2
    }
    else {
      this.navbarString += this.currentTab + " / "
      this.currentTab = componentName1
    }
  }

  setNavbar(componentName: string) {
    this.currentTab = componentName
    this.navbarString = ""
  }
}
