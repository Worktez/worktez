import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { map } from 'rxjs';
import { Post, User } from 'src/app/Interface/UserInterface';
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


  constructor(private functions: AngularFireFunctions, public popupHandlerService: PopupHandlerService, public userService:UserServiceService) { }

  ngOnInit(): void {
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