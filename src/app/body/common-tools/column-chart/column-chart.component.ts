import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.css']
})
export class ColumnChartComponent implements OnInit {

  @Input('data') data: [];
  @Input('teamId') teamId: string = "";
  @Input('columnNames') columnNames: [];
  constructor(public themeService: ThemeService) { }
  
  title: string = "";
  type = 'ColumnChart';
   options = {
    width: "100%",
    height: 300,
    bar: { width: "30%"},
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
    colors: ['#5559D9'], 
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
    chartArea: {width: '85%'},
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
    if (this.teamId != ""){
      this.title = "TeamID: "+this.teamId;
    }
  }

}
