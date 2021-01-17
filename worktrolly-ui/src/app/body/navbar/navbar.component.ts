import { Component, Input, OnInit } from '@angular/core';
import { NavbarHolderService } from '../../services/navbar-holder.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  navbarList: string[]
  navbarStr: string = ""

  constructor(public navbarHolder: NavbarHolderService) { }

  ngOnInit(): void {
    this.createNavbarString();
  }

  createNavbarString(){
    this.navbarStr = this.navbarHolder.navbarStr;
  }
}