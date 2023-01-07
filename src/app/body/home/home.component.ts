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
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('imageContainer', { read: ElementRef }) public imageContainer: ElementRef<any>;

  testimonials = [
    {
      Image: "../../../../assets/testimonial_images/Testimonial1.jpeg",
      Name: "Prashant Pandey",
      Position: "C.E.O Global Child Prodigy",
      Content: "Worktez has revolutionised the complex DevOps operations for our project. It is helping us understand our team and individual strength."
    },
    {
      Image: "../../../../assets/testimonial_images/Testimonial2.jpeg",
      Name: "Praveen Das",
      Position: "Senior Regional Partnerships Manager, South Asia at Wikimedia",
      Content: "Worktez is a great product designed to add value to your team and project. The milestone-based scrum innovation helps the project to be on time with better quality."
    },
    {
      Image: "../../../../assets/testimonial_images/Testimonial3.jpeg",
      Name: "Jitendra Singh",
      Position: "Product Manager at Hewlett Packard Inc.",
      Content: "The simplified model of the scrum with an automated approach helps focus on dedicated innovation and quality."
    }
  ]

  public useEmulator = environment.useEmulators;

  constructor(private metaTagService: Meta, private titleService: Title, public popupHandlerService: PopupHandlerService, private navbarHandler: NavbarHandlerService, public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
    this.titleService.setTitle("Worktez: Simplify and organize the way teams work.");
    this.metaTagService.addTags([
      {
        name: 'description',
        content: 'Track it, from everywhere. One step to hybrid work environment. Without worrying about time, and location. Enable your team to work more on ideas, and automate the process.',
      },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Vivek Kumar' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2022-11-07', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' },
    ]);
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
