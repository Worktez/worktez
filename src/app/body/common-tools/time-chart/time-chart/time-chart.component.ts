import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-chart',
  templateUrl: './time-chart.component.html',
  styleUrls: ['./time-chart.component.css']
})
export class TimeChartComponent implements OnInit {

  @Input("data") data = []
  constructor() { }

  ngOnInit(): void {
  }
  myChartType: string='BarChart';
  chartColumns = ["Time","Log-Time","Remaining-Time"];
  myOptions={
    colors:['#0000FF','red'],
    is3D: true,
    isStacked: true,
    width:300,
    height:100,
    bar: {groupWidth: "40%"}
  };
 dynamicResizable:boolean = true;
}
