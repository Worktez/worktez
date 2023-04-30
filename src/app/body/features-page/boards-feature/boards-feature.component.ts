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
  selector: 'app-boards-feature',
  templateUrl: './boards-feature.component.html',
  styleUrls: ['./boards-feature.component.css', '../features-page.component.css']
})
export class BoardsFeatureComponent implements OnInit {

  constructor(public router: Router, private titleService: Title, private metaTagService: Meta ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Worktez: Features - Boards");
    this.metaTagService.updateTag(
      {
        name: 'description',
        content: 'Explore the Boards features of worktez, Learn more about the different kind to boards such as board page, kanban board, task evaluation boards, and make it easy to track the team',
      });
  }

}
