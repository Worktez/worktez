/***********************************************************
 * Copyright (C) 2022
 * Worktez
 *
 * Author : Twinkle Chatterjee <ctwinkle2812@gmail.com>
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
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { map } from 'rxjs';
import { Post } from 'src/app/Interface/SocialInterface';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-social-page',
  templateUrl: './social-page.component.html',
  styleUrls: ['./social-page.component.css']
})
export class SocialPageComponent implements OnInit {

  componentName: string = "SOCIAL-PAGE"
  showloader: boolean = false
  dataReady: boolean = false
  createPostEnabled: boolean = false
  public posts: Post[]

  PostId: string

  constructor(private router: Router, private navbarHandler: NavbarHandlerService, private functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService, public popupHandlerService: PopupHandlerService, public userService:UserServiceService, public authService: AuthService) { }

  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
    this.loadSocialPageData();
  }

  loadSocialPageData() {
    const callable = this.functions.httpsCallable("socialPage/getAllPosts");
    callable({}).pipe(map(res=>{
      const data = res.data as Post[];
      return data
    })).subscribe((data)=>{
      if(data) {
        this.posts = data;
        this.posts.forEach(element => {
          this.userService.checkAndAddToUsersUsingUid(element.Uid);
        });
        this.userService.fetchUserDataUsingUID().subscribe(()=>{
          this.dataReady = true;
        });
      }
      error: (error) => {
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        console.error(error);
      }
      this.showloader = false
    });
  }

  createPost() {
    this.createPostEnabled = true;
    this.loadSocialPageData();
  }

  createPostCompleted ( data: { completed: boolean } ) {
    this.createPostEnabled = false;
    this.loadSocialPageData();
  }

}