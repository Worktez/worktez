import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarHolderService {

  navbar: string[] = []
  navbarStr: string = ""
  currentNav: string = ""

  constructor() { }

  addToNavbar(component: string){
    var searchIndex = this.navbar.indexOf(component);

    if(searchIndex == -1) {
      this.navbar.push(component);
     
      if(this.navbarStr == "") {
        this.navbarStr = this.currentNav;
      } else {
        this.navbarStr = this.navbarStr + "/" + this.currentNav;
      }
      this.currentNav = component;
      console.log(this.navbar);
    }
 
  }
  
  removeFromNavbar(){
    this.navbar.pop();

    if(this.currentNav !== "") {
      if(this.navbarStr !== "") {
        let lastIndex = this.navbarStr.lastIndexOf("/");

        if(lastIndex == -1){
          this.currentNav = this.navbarStr;
          this.navbarStr = "";
        } else {
          this.currentNav = this.navbarStr.slice(lastIndex+1,this.navbarStr.length);
          this.navbarStr = this.navbarStr.slice(0,lastIndex);
        }
      } else {
        this.currentNav = "";
      }
     
    }

  }

}

