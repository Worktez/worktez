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
import { ThemeService } from 'src/app/services/theme/theme.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input('columnNames') chartColumns: [];
  @Input("data") data: [];
  @Input('hAxisTitle') hAxisTitle: string;
  @Input('vAxisTitle') vAxisTitle: string;
  @Input('height') height: number;

  constructor(private themeService: ThemeService) { }
  ngOnInit(): void {
    this.myOptions["hAxis"] = {
      title: this.hAxisTitle,
      textStyle: { color: this.themeService.fontColor }, 
      titleTextStyle: {
        color: this.themeService.fontColor,
        fontSize: 12,
        bold: true,
        italic: false
      },
      gridlines: {color: this.themeService.chartGridlinesColor}
    };
    this.myOptions["vAxis"] = {
      title: this.vAxisTitle,
      textStyle: {color: this.themeService.fontColor},
      titleTextStyle: {
        color: this.themeService.fontColor,
        fontSize: 12,
        bold: true,
        italic: false
      },
      gridlines: {color: this.themeService.chartGridlinesColor},
      minorGridlines: {count: 0}
    };
    if(this.height > 0) {
      this.myOptions["height"] = this.height;
    }
  }

  myChartType: string = "AreaChart"
  myOptions = {
    colors: ['#16C85A'],
    is3D: true,
    curveType: 'function',
    backgroundColor: "none",
    areaOpacity: 0.0,
    legend: "none",
    chartArea:{ left:20, top:20, width:'100%', height:'80%' }
  };
  dynamicResizable: boolean = true
}
