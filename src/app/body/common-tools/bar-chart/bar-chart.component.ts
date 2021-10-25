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

  type = 'Bar';
  options = {
    width: "100%",
    height: 350,
    bar: { width: "30%" },
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
    colors: ['blue', '#FBAA1A', '#10BE65'],
    is3D: true,
    backgroundColor: "none",
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
    chartArea: { width: '70%' },
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
