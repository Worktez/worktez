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
  selector: 'app-time-chart',
  templateUrl: './time-chart.component.html',
  styleUrls: ['./time-chart.component.css']
})
export class TimeChartComponent implements OnInit {

  @Input("loggedTime") loggedTime:number
  @Input("estimatedTime") estimatedTime:number
  
  loggedTimePercentage:number=0
  remainingTimePercentage:number=0

  constructor() { }

  ngOnInit(): void {
    this.loggedTimePercentage=parseFloat(((this.loggedTime*100)/this.estimatedTime).toFixed(2))
    this.remainingTimePercentage=parseFloat((100-this.loggedTimePercentage).toFixed(2))
  }
  
}
