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
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Observable } from 'rxjs';
import { Post, Comment } from 'src/app/Interface/SocialInterface';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { ToolsService } from '../../../services/tool/tools.service';
import { map } from 'rxjs';
import { defaultUser, User } from 'src/app/Interface/UserInterface';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  showCommentList: boolean = false
  showAddComment: boolean = false
  enableLoader: boolean;
  todayDate: string;
  time: string;
  user: User;
  content: string = ""
  reactionStatus : boolean = false;
  public comments: Comment[];
  showColor : boolean = false
  dataReady: boolean = false;
  componentName:string ="POSTS"
  public posts: Post[];
  public recentPosts: Post[] = [];
  showloader: boolean = false;
  pageReady:boolean = false;

  @Input('post') post : Post;
  @Output() addCommentCompleted = new EventEmitter<boolean>();

  constructor(public toolService: ToolsService, private functions: AngularFireFunctions, public authService: AuthService, private userService: UserServiceService, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getCreatorDetails();
    this.authService.userAppSettingObservable.subscribe((data)=>{
      this.pageReady = true;
      this.loadSocialPageData();      
    });
  }

  showCommentBox(postId: string) {
    this.showCommentList = true;
    this.showAddComment = !this.showAddComment
    this.getComments(postId);
  }

  addComment(postId: string) {
    const uid = this.authService.getLoggedInUser();
    const date = this.toolService.date();
    const time = this.toolService.time();
    this.enableLoader = true;

    if(this.content != "" ) {
      const callable = this.functions.httpsCallable("socialPage/addPostComment");
      callable({Uid: uid, Content: this.content, LastUpdatedDate: date, LastUpdatedTime: time, PostId: postId}).pipe(map(res=>{
        return res
      })).subscribe((data) => {
        this.enableLoader = false;
        this.addCommentCompleted.emit(true);
        this.content = "";
        this.getComments(postId);
      });
    } else {
      this.enableLoader = false;
    }
  }
  
  close() {
    this.showAddComment = false;
  }

  onReact(postId: string) {
    this.enableLoader = true;
    const uid = this.authService.getLoggedInUser();

    const callable = this.functions.httpsCallable('socialPage/addReaction');
   
      this.todayDate = this.toolService.date();
      this.time = this.toolService.time();

      callable({PostId: postId, CreationDate: this.todayDate, CreationTime: this.time, Type: "Like", Uid: uid}).subscribe({
        next: (data) => {
        },
        error: (error) => {
          console.log("Error", error);
          this.errorHandlerService.showError = true;
          console.error(error);
        },
        complete: () => console.info('Successful')
    });
  }

  getComments(postId: string) {
      const callable = this.functions.httpsCallable("socialPage/getComments");
      callable({PostId: postId}).pipe(map(res=>{
        const data = res.data as Comment[];
        return data
      })).subscribe((data) => {
        if (data) {
          this.enableLoader= true;
          this.comments = data;
          this.comments.forEach(element => {
            this.userService.checkAndAddToUsersUsingUid(element.Uid);
          });
          this.userService.fetchUserDataUsingUID().subscribe(()=>{
            this.dataReady = true;
          });
        }
        this.enableLoader = false;
      });
  }

  getCreatorDetails() {
    if(this.post.Uid=="defaultUser"){
      this.user = defaultUser;
    }else {
      this.user = this.userService.users.filter((obj) => {
        return obj.uid == this.post.Uid
      })[0];
    }
  }

  toggleColor(){
    this.showColor = !this.showColor;
  }
  
  deletePost(postId: string) {
    const uid = this.authService.getLoggedInUser();
      const callable = this.functions.httpsCallable("socialPage/deletePost");
      this.enableLoader = true
        
      callable({Uid: uid, PostId: postId}).subscribe({
        next: (data) => {
          this.loadSocialPageData();
          console.log("Successfull");
          this.enableLoader = false
          this.post.PostStatus = -1;
        },
        
        error: (error) => {
          console.log("Error", error);
          this.errorHandlerService.showError = true;
          this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
          console.error(error);
        },
        complete: () => console.info('Successful deleted post in db')
      });
  }

  loadSocialPageData() {
    this.showloader = true;
    const callable = this.functions.httpsCallable("socialPage/getAllPosts");
    callable({}).pipe(map(res=>{
      const data = res.data as Post[];
      console.log(data);
      return data
    })).subscribe({
      next:(data)=>{
        if(data) {
          this.posts = data;
          this.posts.forEach(element => {
            this.userService.checkAndAddToUsersUsingUid(element.Uid);
          });
          this.userService.fetchUserDataUsingUID().subscribe(()=>{
            this.dataReady = true;
          });
          this.loadRecentActivity();
        }
      },
      error:(error)=>{
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        console.error(error);
      },
      complete:()=>{
        this.showloader = false;
      }
    });
  }
  
  loadRecentActivity(){
    const newarray = this.posts.filter((data)=>{
      if(this.authService.userAppSetting != undefined && data.Uid == this.authService.userAppSetting.uid) {
        return data;
      }
    });
    if(newarray.length) {
      this.recentPosts = newarray.reverse();
      this.recentPosts.splice(3)
    } else {
      console.log("User Not Found Loading empty User")
      return this.recentPosts[0]
    }
  }
}