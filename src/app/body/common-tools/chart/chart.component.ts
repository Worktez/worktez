import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input("data") data: []

  constructor(private themeService: ThemeService) { }
  ngOnInit(): void { }

  myChartType: string = "AreaChart"
  chartColumns = ["Sprint Number", "StoryPoint"]
  myOptions = {
    colors: ['#16C85A'],
    is3D: true,
    curveType: 'function',
    backgroundColor: "none",
    legend: "none",
    chartArea:{ left:20, top:20, width:'100%', height:'80%' },
    hAxis: {textStyle: {color: this.themeService.fontColor}, gridlines: {color: this.themeService.chartGridlinesColor}},
    vAxis: {textStyle: {color: this.themeService.fontColor}, gridlines: {color: this.themeService.chartGridlinesColor}, minorGridlines: {count: 0}}
  };
  dynamicResizable: boolean = true
}
