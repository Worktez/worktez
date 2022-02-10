/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
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
