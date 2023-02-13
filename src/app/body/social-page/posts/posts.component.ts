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
import { Post, Comment, Reaction } from 'src/app/Interface/SocialInterface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { ToolsService } from '../../../services/tool/tools.service';
import { defaultUser, User } from 'src/app/Interface/UserInterface';
import { FileUploadService } from 'src/app/services/fileUploadService/file-upload.service';
import { SocialPageServiceService } from 'src/app/services/social-page-service/social-page-service.service';


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
  noOfStars: number = 0;
  noOfComments: number = 0;
  public reactions: Reaction[]
  
  componentName:string ="POST"
  showloader: boolean = false;
  pageReady:boolean = false;
  postStarred: boolean = false;

  @Input('post') post : Post;
  // @Input('Image') Image: string;
  images: string[];
  @Output() switchReactionCompleted = new EventEmitter<{ Uid: string, reactionAdded: boolean, reactionRemoved: boolean}>();
  constructor(public toolService: ToolsService, private functions: AngularFireFunctions, public authService: AuthService, private userService: UserServiceService, public errorHandlerService: ErrorHandlerService,  public uploadService: FileUploadService, public socialPageService: SocialPageServiceService) { }

  ngOnInit(): void {
    // console.log(this.post.PostId.slice(0));
    this.images = this.post.ImagesUrl;
    this.getReactions();
    this.getComments();
    this.getCreatorDetails();
    this.authService.userAppSettingObservable.subscribe((data)=>{
      this.pageReady = true;
    });
  }

  showCommentBox() {
    this.showCommentList = true;
    this.showAddComment = !this.showAddComment
  }

  addComment(postId: string) {
    const uid = this.authService.getLoggedInUser();
    const date = this.toolService.date();
    const time = this.toolService.time();
    this.enableLoader = true;

    if(this.content != "" ) {
      const callable = this.functions.httpsCallable("socialPage/addPostComment");
      callable({Uid: uid, Content: this.content, LastUpdatedDate: date, LastUpdatedTime: time, PostId: postId})
      .subscribe((data) => {
        this.enableLoader = false;
        const comment = {
          Uid: uid,
          LastUpdatedTime: time,
          LastUpdatedDate: date,
          Content: this.content,
          Status: "OK",
          PostId: postId,
          CommentId: "string",
        };
        this.post.Comments.push(comment);
        this.content = "";
        this.getComments();
      });
    } else {
      this.enableLoader = false;
    }
  }
  close() {
    this.showAddComment = false;
  }

  switchReaction(postId: string){
    if(this.postStarred==false){
      this.onReact(postId);
    }
    else{
      this.removeReaction(postId);
    }
  }

  onReact(postId: string) {
    this.enableLoader = true;
    const uid = this.authService.getLoggedInUser();

    const callable = this.functions.httpsCallable('socialPage/addReaction');

    this.todayDate = this.toolService.date();
    this.time = this.toolService.time();

    callable({PostId: postId, CreationDate: this.todayDate, CreationTime: this.time, Type: "Like", Uid: uid}).subscribe({
      next: (data) => {
        this.noOfStars+=1;
      },
      error: (error) => {
        console.log("Error", error);
        this.errorHandlerService.showError = true;
        console.error(error);
        this.enableLoader=false
      },
      complete: () => {
        this.postStarred=true;
        
        console.info('Successful')
        this.enableLoader=false
        this.switchReactionCompleted.emit({Uid: this.post.Uid, reactionAdded: true, reactionRemoved: false});
      }
    });
  }

  removeReaction(postId: string) {
    this.enableLoader = true;
    const uid = this.authService.getLoggedInUser();

    const callable = this.functions.httpsCallable('socialPage/removeReaction');
      callable({PostId: postId, Uid: uid}).subscribe({
        next: (data) => {
          this.noOfStars-=1;
        },
        error: (error) => {
          console.log("Error", error);
          this.errorHandlerService.showError = true;
          console.error(error);
          this.enableLoader=false
        },
        complete: () => {
          this.postStarred=false;
          console.info('Successfully removed reaction')
          this.switchReactionCompleted.emit({Uid: this.post.Uid, reactionAdded: false, reactionRemoved: true});
          this.enableLoader=false
        }
    });
  }

  getComments() {
    this.noOfComments=0;
    this.enableLoader= true;
    this.comments = this.post.Comments;
    if(this.comments == undefined){
      this.comments=[];
    }
    this.comments.forEach(element => {
      this.noOfComments += 1;
      this.userService.checkAndAddToUsersUsingUid(element.Uid);
    });
    this.userService.fetchUserDataUsingUID().subscribe(()=>{
      this.dataReady = true;
    });
    this.enableLoader=false;
  }

  getReactions() {
    this.noOfStars=0;
    this.enableLoader= true;
    this.reactions = this.post.Reactionss;
    if (this.reactions == undefined) {
      this.reactions=[];
    }
    this.reactions.forEach(element => {
      this.noOfStars+=1
      if(element.Uid==this.authService.getLoggedInUser()){
        this.postStarred=true;
      }
      this.userService.checkAndAddToUsersUsingUid(element.Uid);
    });
    this.userService.fetchUserDataUsingUID().subscribe(()=>{
      this.dataReady = true;
    });
     this.enableLoader = false;
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
  
  deletePost(postId: string) {
    const uid = this.authService.getLoggedInUser();
      const callable = this.functions.httpsCallable("socialPage/deletePost");
      this.enableLoader = true
        
      callable({Uid: uid, PostId: postId}).subscribe({
        next: (data) => {
          console.log("Successfull");
          this.enableLoader = false
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

  commentDeleted(data: {completed: boolean}){
    if(data.completed==true){
      this.noOfComments -= 1
    }
  }
}