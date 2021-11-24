import { Component, Input, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-speed-images',
  templateUrl: './speed-images.component.html',
  styleUrls: ['./speed-images.component.css']
})
export class SpeedImagesComponent implements OnInit {

  @Input('emails') emails: string[]

  constructor(public userService: UserServiceService) { }

  watcherList: string[] = [];

  ngOnInit(): void {
    if (this.emails.length) {
      this.userService.getPhotoList(this.emails);
      this.userService.photoUrlObservable.subscribe(data => {
      this.watcherList = data;
      }); 
    }
  }
}
