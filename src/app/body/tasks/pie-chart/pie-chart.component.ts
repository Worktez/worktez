import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip,  ChartsModule } from 'ng2-charts';
import { workDone } from 'src/app/Interface/TasksInterface';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  @Input('workDone') workDone: number

  
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgb(22, 222, 120)',
        'rgb(239, 19, 19)',
      ],
      borderWidth: 1,
    }
  ];
  // public pieChartLabels: Label[] = ["Completed", "pending"];
  public pieChartData: SingleDataSet = [ ];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }

  ngOnInit(): void {
    this.pieChartData.push(this.workDone);
    this.pieChartData.push(100-this.workDone);
  }

}
