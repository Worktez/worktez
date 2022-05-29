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
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.css']
})
export class SelectDropdownComponent implements OnInit {

  constructor() { }
  @Input('teamMembers') teamMembers: string[];
  @Output() setTeamMember = new EventEmitter<{ teamMember: string }>();
  selectedOption: string = "Team";

  ngOnInit(): void {
    console.log(this.teamMembers);
  }

  setSelectedOption() {
    this.setTeamMember.emit({ teamMember: this.selectedOption });
  }

}
