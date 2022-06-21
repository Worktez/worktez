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
import { AuthService } from 'src/app/services/auth.service';
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
      Image: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_21/2870431/190524-classic-american-cheeseburger-ew-207p.jpg",
      Name: "Vivek Kumar",
      Content: "Happy to use worktez, It made our work very quick, transparent and powered."
    },
    {
      Image: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_21/2870431/190524-classic-american-cheeseburger-ew-207p.jpg",
      Name: "XYZ",
      Content: "Happy to use worktez"
    },
    {
      Image: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_21/2870431/190524-classic-american-cheeseburger-ew-207p.jpg",
      Name: "PQR",
      Content: "Happy to use worktez"
    },
    {
      Image: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_21/2870431/190524-classic-american-cheeseburger-ew-207p.jpg",
      Name: "PQR",
      Content: "Happy to use worktez"
    },
    {
      Image: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_21/2870431/190524-classic-american-cheeseburger-ew-207p.jpg",
      Name: "PQR",
      Content: "Happy to use worktez"
    },
    {
      Image: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_21/2870431/190524-classic-american-cheeseburger-ew-207p.jpg",
      Name: "PQR",
      Content: "Happy to use worktez"
    },
    {
      Image: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_21/2870431/190524-classic-american-cheeseburger-ew-207p.jpg",
      Name: "PQR",
      Content: "Happy to use worktez"
    },
    {
      Image: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_21/2870431/190524-classic-american-cheeseburger-ew-207p.jpg",
      Name: "PQR",
      Content: "Happy to use worktez"
    },
    {
      Image: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_21/2870431/190524-classic-american-cheeseburger-ew-207p.jpg",
      Name: "PQR",
      Content: "Happy to use worktez"
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
