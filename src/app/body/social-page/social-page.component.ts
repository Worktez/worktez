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
import { map } from 'rxjs';
import { Post, User } from 'src/app/Interface/UserInterface';
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

  showloader: boolean = false
  dataReady: boolean = false
  public posts: Post[]

  Post: string
  PostId: string


  constructor(private router: Router, private navbarHandler: NavbarHandlerService, private functions: AngularFireFunctions, public popupHandlerService: PopupHandlerService, public userService:UserServiceService) { }

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
      this.showloader = false
    });
  }

  createPost() {
    this.popupHandlerService.createPostEnabled = true;
  }

}