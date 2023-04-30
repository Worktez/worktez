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
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent {
  currentSection: string;
  arrowDirection: string = "expand_less";
  featuresExpanded: boolean = true;

  constructor(public router: Router, private titleService: Title, private metaTagService: Meta, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Worktez: Blogs");
    this.metaTagService.updateTag(
      {
        name: 'description',
        content: 'Explore our blog and discover insightful articles on a variety of topics',
      });
      this.metaTagService.updateTag({ name: 'author', content: 'Abhishek Mishra' });
      this.metaTagService.updateTag({ name: 'date', content: '2023-01-28', scheme: 'YYYY-MM-DD' },)
  }
  gettingStarted(){
    this.router.navigate(['/GettingStarted']);
  }
  changeSection(section: string){
    this.currentSection = section;
    this.router.navigate(['/Features', section]);
  }
  changeArrowDirection(){
    if(this.featuresExpanded){
      this.featuresExpanded = false;
      this.arrowDirection="expand_more"
    }
    else{
      this.featuresExpanded = true;
      this.arrowDirection = "expand_less"
    }
  }
  gitIntegration(){
    this.router.navigate(['/blogs/git-integration']);
  }
  agile(){
    this.router.navigate(['/blogs/agile-functionalities']);
  }
  devOps(){
    this.router.navigate(['/blogs/devops-functionalities']);
  }
  metaVerse(){
    this.router.navigate(['/blogs/metaverse']);
  }
  kanbanBoard(){
    this.router.navigate(['/blogs/kanban-board']);
  }
}
