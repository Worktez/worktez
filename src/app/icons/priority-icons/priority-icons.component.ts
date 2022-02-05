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
  selector: 'app-priority-icons',
  templateUrl: './priority-icons.component.html',
  styleUrls: ['./priority-icons.component.css']
})
export class PriorityIconsComponent implements OnInit {

  @Input('Priority') Priority : string
  @Input('Border') Border: boolean
  constructor() { }

  ngOnInit(): void {
  }

}
