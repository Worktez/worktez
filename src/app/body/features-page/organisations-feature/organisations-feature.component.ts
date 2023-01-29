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
  selector: 'app-organisations-feature',
  templateUrl: './organisations-feature.component.html',
  styleUrls: ['./organisations-feature.component.css',  '../features-page.component.css']
})
export class OrganisationsFeatureComponent implements OnInit {

  constructor(public router: Router, private titleService: Title, private metaTagService: Meta ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Features - Organisations");
    this.metaTagService.updateTag(
      {
        name: 'description',
        content: 'Organise your team, add or remove members. create or delete teams, and manage your organisation using My organiation features of worktez',
      });
  }

}
