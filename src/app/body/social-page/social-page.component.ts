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
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import {  Post } from 'src/app/Interface/SocialInterface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { SocialPageServiceService } from 'src/app/services/social-page-service/social-page-service.service';
import { FileUploadService } from 'src/app/services/fileUploadService/file-upload.service';

@Component({
  selector: 'app-social-page',
  templateUrl: './social-page.component.html',
  styleUrls: ['./social-page.component.css']
})

export class SocialPageComponent implements OnInit {
  componentName: string = "SOCIAL-PAGE"
  createPostEnabled: boolean = false;
  currentScrollPos: number = 300;
  trackScroll: boolean = false;
  disableLoadMore: boolean = false;
  posts: {};
  public posts1: Post[]
  showloader: boolean = false
  dataReady: boolean = false
  pageReady: boolean = false
  selectPhoto:boolean = false;

  constructor(private navbarHandler: NavbarHandlerService, private functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService, public popupHandlerService: PopupHandlerService, public userService:UserServiceService, public authService: AuthService, public startService: StartServiceService, public applicationService: ApplicationSettingsService, private toolsService: ToolsService, public socialPageService: SocialPageServiceService, public uploadService: FileUploadService) { }
 
  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
    window.addEventListener('scroll', this.scrollEvent, true);
    this.posts = this.socialPageService.socialPageDataJson;
    this.authService.getUserSettings();
    this.authService.userAppSettingObservable.subscribe((data)=>{
      this.pageReady = true;
    });
  }

  ngOnDestroy(){
    window.removeEventListener('scroll', this.scrollEvent, true);
  }

  scrollEvent = (event): void => {
    let scrollPos = event.target.scrollingElement.scrollTop;
    console.log(scrollPos);
    if(scrollPos >= this.currentScrollPos + 1000){
      this.currentScrollPos = scrollPos;
      this.showOlderPosts();
      this.trackScroll=false;
    }
    if(this.trackScroll){
      this.currentScrollPos = scrollPos;
    }
  }

  choosePhoto(){
    this.selectPhoto = true;
    this.createPost()
  }

  showOlderPosts(){
    this.trackScroll = true;
    this.socialPageService.getSocialPageData(); 
    this.disableLoadMore=true;
    const posts1 = this.socialPageService.socialPageDataJson;
    this.posts=Array.prototype.push.apply(posts1);
  }
  
  loadSocialPageData(){
    this.showloader = true;
    this.socialPageService.getSocialPageData();
    this.showloader=false
  }

  createPost() {
    this.createPostEnabled = true;
  }

  createPostCompleted ( data: { completed: boolean, post: Post } ) {
    this.selectPhoto = false;
    this.createPostEnabled = false;
    if(data.completed==true){
      this.loadSocialPageData();
    }
  }

  postReactionSwitched(data: { Uid: string, reactionAdded: boolean, reactionRemoved: boolean } ){
    if(data.Uid==this.authService.getLoggedInUser()){
      if(data.reactionAdded==true){
        this.authService.userAppSetting.UserReactionCounter+=1;
      }
      if(data.reactionRemoved==true){
        this.authService.userAppSetting.UserReactionCounter-=1;
      }
    }
  }
}

