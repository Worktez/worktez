/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* 
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/
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
