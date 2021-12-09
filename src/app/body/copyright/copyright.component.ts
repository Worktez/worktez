import { Component, OnInit } from '@angular/core';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';

@Component({
  selector: 'app-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.css']
})
export class CopyrightComponent implements OnInit {
  componentName: string = "COPYRIGHT"

  constructor(public navbarHandler: NavbarHandlerService) { }

  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
    this.navbarHandler.addToNavbar(this.componentName);
  }

}
