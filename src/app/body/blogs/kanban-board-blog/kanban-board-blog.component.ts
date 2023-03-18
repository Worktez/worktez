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
import { Router } from '@angular/router';

@Component({
  selector: 'app-kanban-board-blog',
  templateUrl: './kanban-board-blog.component.html',
  styleUrls: ['./kanban-board-blog.component.css']
})
export class KanbanBoardBlogComponent {
  constructor(public router: Router, private titleService: Title, private metaTagService: Meta ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Worktez: Blog - Kanban Board");
    this.metaTagService.updateTag(
      {
        name: 'description',
        content: 'Visualize Your Workflow and Improve Productivity with Kanban Board.',
      });
      this.metaTagService.updateTag({ name: 'date', content: '2023-03-17', scheme: 'YYYY-MM-DD' })
  }
  blogs(){
    this.router.navigate(['/blogs']);
  }
}
