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
  selector: 'app-charts-feature',
  templateUrl: './charts-feature.component.html',
  styleUrls: ['./charts-feature.component.css',  '../features-page.component.css']
})
export class ChartsFeatureComponent implements OnInit {

  constructor(public router: Router, private titleService: Title, private metaTagService: Meta ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Features - Charts");
    this.metaTagService.addTags([
      {
        name: 'description',
        content: 'Learn more about different types of Charts used in worktez such as team performance chart, velocity chart, and sprint burndown chart',
      },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Abhishek Mishra' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2023-01-28', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' },
    ]);
  }

}
