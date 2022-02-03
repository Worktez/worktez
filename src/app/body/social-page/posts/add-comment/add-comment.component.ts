import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Post, User, defaultUser } from 'src/app/Interface/UserInterface';
import { AuthService } from 'src/app/services/auth.service';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  @Output() addCommentCompleted = new EventEmitter<boolean>();

  

  enableLoader: boolean = false
  @Input('post') post : Post;
  user : User

  constructor(private userService: UserServiceService, private functions: AngularFireFunctions, public authService: AuthService, private toolService: ToolsService) { }

  ngOnInit(): void {
  }

  getUserDetails() {
    if(this.post.Uid == 'defaultUser') {
      this.user = defaultUser;
    } else {
      this.user = this.userService.users.filter((obj) => {
        return obj.uid == this.post.Uid
      })[0];
    }
  }
  // close() {
  //   this.addCommentCompleted.emit(true);
  // }

}