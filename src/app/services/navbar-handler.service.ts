import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarHandlerService {

  navbarList: string[] = []
  navbarString: string = ""
  currentTab: string = ""
  constructor() { }

  addToNavbar(componentName: string) {
    if (this.navbarList.indexOf("Board") === -1) {
      this.resetNavbar();
    }
    if (this.navbarList.length === 3) {
      this.removeFromNavbar()
    }
    let searchIndex = this.navbarList.indexOf(componentName);

    if (searchIndex == -1) {
      this.navbarList.push(componentName);

      if (this.currentTab !== "" && this.currentTab.length > 0) {
        if (this.navbarString == "") {
          this.navbarString = this.currentTab;
        } else {
          this.navbarString = this.navbarString + " / " + this.currentTab;
        }
      }

      this.currentTab = componentName;
    }
  }

  removeFromNavbar() {
    if (this.navbarList.length) {
      this.navbarList.pop();
    }

    if (this.currentTab !== "") {
      if (this.navbarString !== "") {
        let lastIndex = this.navbarString.lastIndexOf("/");

        if (lastIndex == -1) {
          this.currentTab = this.navbarString;
          this.navbarString = "";
        } else {
          this.currentTab = this.navbarString.slice(lastIndex + 1, this.navbarString.length);
          this.navbarString = this.navbarString.slice(0, lastIndex);
        }
      } else {
        this.currentTab = "";
      }
    }
  }
  resetNavbar() {
    this.navbarList = []
    this.currentTab = ""
    this.navbarString = ""
  }
}
