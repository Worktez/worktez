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
