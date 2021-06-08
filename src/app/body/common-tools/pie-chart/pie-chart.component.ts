import { Component, OnInit,Input } from '@angular/core';
import { NoEncryption } from '@material-ui/icons';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  @Input() data:[]
  constructor() { }

  ngOnInit(): void {
    
  }


 
   type = 'PieChart';
   
  
   options = {  
        pieHole:0.6, 
        pieSliceText: 'none',
        legend: 'none',
        slices: {
          0: { color: 'green' },
          1: { color: 'blue' }
        },
        chartArea:{left:0,top:0,width:'100%',height:'100%'}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
   };
   width = 70;
   height = 70;
}
