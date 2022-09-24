import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Comment } from 'src/app/Interface/SocialInterface';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { defaultUser, User } from 'src/app/Interface/UserInterface';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input("comment") comment: Comment;
  componentName: string = "COMMENTS"
  user: User;
  commentDataReady: boolean = false;
  enableLoader: boolean = false;

  constructor(public authService: AuthService, private userService: UserServiceService, private functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getCreatorDetails();
  }

  getCreatorDetails(){
    if(this.comment.Uid=="defaultUser") {
      this.user = defaultUser;
    } else {
      this.user = this.userService.users.filter((obj) => {
        return obj.uid == this.comment.Uid
      })[0];
    }
    this.commentDataReady = true;
  }

  deleteComment() {
    const uid = this.authService.getLoggedInUser();
      const callable = this.functions.httpsCallable("socialPage/deleteComment");
      this.enableLoader = true
      callable({Uid: uid, PostId: this.comment.PostId, CommentId: this.comment.CommentId}).subscribe({
        next: (data) => {
          console.log("Successfull");
          this.comment.CommentStatus = -1;
        },
        
        error: (error) => {
          console.log("Error", error);
          this.enableLoader=false;
          this.errorHandlerService.showError = true;
          this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
          console.error(error);
        },
        complete: () => {
          this.enableLoader = false;
          console.info('Successful deleted post in db')}
      });
  }

}
