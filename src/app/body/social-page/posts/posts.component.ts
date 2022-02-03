import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Observable } from 'rxjs';
import { defaultUser, Post, User} from 'src/app/Interface/UserInterface';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { ToolsService } from '../../../services/tool/tools.service';
import { map } from 'rxjs';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  //showCommentList: boolean = false
  public CommentObservable: Observable<Comment[]>
  showAddComment: boolean = false
  user : User
  enableLoader: boolean;
  todayDate: string;
  time: string;
  content: string = ""
  
  @Input('post') post : Post;
  @Output() addCommentCompleted = new EventEmitter<boolean>();

  constructor(public toolService: ToolsService, private functions: AngularFireFunctions, public authService: AuthService, private userService: UserServiceService, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  openAddComment(postId: string) {
    //this.showCommentsList = false
    // this.showAddComment = true
    console.log("hereeeeeeeeeeeeeeeeeeee")
    const uid = this.authService.getLoggedInUser();
    const date = this.toolService.date();
    const time = this.toolService.time();
    this.enableLoader = true;

    if(this.content != "" ) {

      const callable = this.functions.httpsCallable("socialPage/addPostComment");
      const res = callable({Uid: uid, Content: this.content, LastUpdatedDate: date, LastUpdatedTime: time, PostId: postId}).pipe(map(res=>{
        return res
      })).subscribe((data) => {
        this.enableLoader = false;
        this.addCommentCompleted.emit(true);
      });
    }
    console.log("done");
  }
  close() {
    //this.showCommentsList = false;
    this.showAddComment = false;
  }

  async onReact(postId: string) {
    this.enableLoader = true;
    const uid = this.authService.getLoggedInUser();
    const callable = this.functions.httpsCallable('socialPage/addReaction');
    try {
      this.todayDate = this.toolService.date();
      this.time = this.toolService.time();

      const result = await callable({PostId: postId, CreationDate: this.todayDate, CreationTime: this.time, Type: "Like", Uid: uid}).toPromise();
      } catch(error) {
        console.log("Error", error);
        this.errorHandlerService.showError = true;
      }
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

}