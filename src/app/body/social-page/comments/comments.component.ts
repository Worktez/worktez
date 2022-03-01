import { Component, OnInit } from '@angular/core';
import { Post, User } from 'src/app/Interface/UserInterface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  
  user: User

  constructor() { }

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    
  }

}
