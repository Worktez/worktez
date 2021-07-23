import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-icons',
  templateUrl: './profile-icons.component.html',
  styleUrls: ['./profile-icons.component.css']
})
export class ProfileIconsComponent implements OnInit {

  @Input('profileIcon') profileIcon: string;
  constructor() { }

  ngOnInit(): void {
  }

}
