import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input("data") data: []

  constructor() { }
  ngOnInit(): void { }

  myChartType: string = "LineChart"
  chartColumns = ["Sprint Number", "StoryPoint"]
  myOptions = {
    colors: ['#5A20F0'],
    is3D: true,
    curveType: 'function'
  };
  dynamicResizable: boolean = true
}
