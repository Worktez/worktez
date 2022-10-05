import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Comment } from 'src/app/Interface/SocialInterface';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { defaultUser, User } from 'src/app/Interface/UserInterface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input("comment") comment: Comment;

  user: User;
  commentDataReady: boolean = false;

  constructor(public authService: AuthService, private userService: UserServiceService) { }

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
}
