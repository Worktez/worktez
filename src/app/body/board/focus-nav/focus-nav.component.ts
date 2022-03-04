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
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-focus-nav',
  templateUrl: './focus-nav.component.html',
  styleUrls: ['./focus-nav.component.css']
})
export class FocusNavComponent implements OnInit {

  @Input('currentSprintNumber') currentSprintNumber:number;

  @Output() currentSprint = new EventEmitter<number>();

  currentSprintName: string;
  
  constructor(public backendService: BackendService) { }

  ngOnInit(): void {  }

  ActiveSprint(){
    this.currentSprint.emit(0);
  }

  showBacklog(){
    this.currentSprint.emit(-1);
  }
  
  showDeleted(){
    this.currentSprint.emit(-2);
  }
}
