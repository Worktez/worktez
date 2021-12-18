import { Component, OnInit } from '@angular/core';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';


@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.component.html',
  styleUrls: ['./terms-and-condition.component.css']
})
export class TermsAndConditionComponent implements OnInit {
  componentName: string = "TERMS AND CONDITIONS"
  constructor(public navbarHandler: NavbarHandlerService) { }

  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
    this.navbarHandler.addToNavbar(this.componentName);
  }

}
