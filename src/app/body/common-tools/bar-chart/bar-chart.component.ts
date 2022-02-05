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
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  @Input('title') title: string;
  @Input('data') data: [];
  @Input('columnNames') columnNames: [];
  constructor(public themeService: ThemeService) { }

  type = 'ColumnChart';
  options = {
    width: "100%",
    height: 350,
    backgroundColor: "none",
    hAxis: {
      title: 'Sprints',
      textStyle: {
        color: this.themeService.fontColor
      },
      titleTextStyle: {
        color: this.themeService.fontColor,
        fontSize: 12,
        bold: true,
        italic: false
      }
    },
    colors: ['#F3941F', '#D91D5C', '#5C60EC'],
    is3D: true,
    titleTextStyle: {
      color: this.themeService.fontColor
    },
    vAxis: {
      title: 'Story points',
      textStyle: {
        color: this.themeService.fontColor
      },
      titleTextStyle: {
        color: this.themeService.fontColor,
        fontSize: 12,
        bold: true,
        italic: false
      }
    },
    legend: {
      position: 'top',
      alignment: 'end',
      textStyle: {
        color: this.themeService.fontColor,
      },
    }
  };
  dynamicResizable: boolean = true;

  ngOnInit(): void {
  }

}
