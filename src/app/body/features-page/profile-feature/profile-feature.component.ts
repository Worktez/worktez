/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* Author : Abhishek Mishra <am1426620@gmail.com>
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
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-feature',
  templateUrl: './profile-feature.component.html',
  styleUrls: ['./profile-feature.component.css',  '../features-page.component.css']
})
export class ProfileFeatureComponent implements OnInit {

  constructor(public router: Router, private titleService: Title, private metaTagService: Meta ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Features - Profile");
    this.metaTagService.addTags([
      {
        name: 'description',
        content: 'Add or edit your details, create an impressive profile using the profile page of worktez ',
      },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Abhishek Mishra' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2023-01-28', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' },
    ]);
  }
}
