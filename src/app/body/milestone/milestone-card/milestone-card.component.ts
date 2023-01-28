/***********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Sanjay Krishna <sanjaykrishna1203@gmail.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Milestones } from 'src/app/Interface/MilestoneInterface';

@Component({
  selector: 'app-milestone-card',
  templateUrl: './milestone-card.component.html',
  styleUrls: ['./milestone-card.component.css']
})
export class MilestoneCardComponent implements OnInit {

  @Input("milestone") milestone:Milestones
  constructor( private router: Router) { }
  color: string;
  ngOnInit(): void {
    this.color="#"+this.milestone.ColorCode;
  }

  getMilestoneDetails(milestoneId: any) {
    this.router.navigate(['MilestoneDetails/', milestoneId]);
  }

}
