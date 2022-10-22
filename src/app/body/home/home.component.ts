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
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('imageContainer', { read: ElementRef }) public imageContainer: ElementRef<any>;

  testimonials = [
    {
      Image: "https://media-exp1.licdn.com/dms/image/C5603AQGkf_jPWudDdA/profile-displayphoto-shrink_800_800/0/1629381452691?e=1670457600&v=beta&t=0XZJxw8qq_KHtr25vicQgXxvIdGTPn6yNbkAPMb2JFI",
      Name: "Prashant Pandey",
      Position: "C.E.O Global Child Prodigy",
      Content: "Worktez has revolutionised the complex DevOps operations for our project. It is helping us understand our team and individual strength."
    },
    {
      Image: "https://media-exp1.licdn.com/dms/image/C4D03AQFawTO3RRB3Yw/profile-displayphoto-shrink_800_800/0/1656944446639?e=1670457600&v=beta&t=oalQ3y1n0wL4sN6us6GZH9amLbCy8fNuvtiQbN7X_SY",
      Name: "Praveen Das",
      Position: "Senior Regional Partnerships Manager, South Asia at Wikimedia",
      Content: "Worktez is a great product designed to add value to your team and project. The milestone-based scrum innovation helps the project to be on time with better quality."
    },
    {
      Image: "https://media-exp1.licdn.com/dms/image/C5603AQHpP3ccXAJPPw/profile-displayphoto-shrink_800_800/0/1516340117179?e=1670457600&v=beta&t=OzSm_AR7vYWnP6kVQ1OKWPVFCm26h1hvmyjqq_wsycg",
      Name: "Jitendra Singh",
      Position: "Product Manager at Hewlett Packard Inc.",
      Content: "The simplified model of the scrum with an automated approach helps focus on dedicated innovation and quality."
    }
  ]

  public useEmulator = environment.useEmulators;

  constructor(public popupHandlerService: PopupHandlerService, private navbarHandler: NavbarHandlerService, public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
  }
  
  requestDemo() {
    this.popupHandlerService.requestDemoEnabled = true;
  }

  scrollLeft() {
    this.imageContainer.nativeElement.scrollTo({ left: (this.imageContainer.nativeElement.scrollLeft - 400), block: "start", inline: "nearest" });
  }

  scrollRight() {
    this.imageContainer.nativeElement.scrollTo({ left: (this.imageContainer.nativeElement.scrollLeft + 400), block: "start", inline: "nearest" });
  }
}
