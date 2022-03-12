import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Comment } from 'src/app/Interface/SocialInterface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input("comment") comment: Comment;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
