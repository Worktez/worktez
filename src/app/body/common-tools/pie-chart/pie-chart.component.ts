import { Component, OnInit,Input } from '@angular/core';

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
  
type='PieChart';
options={
  backgroundColor:'none'    ,
  pieHole:0.6,
  pieSliceText:'none',
  legend:'none',
  slices:{
    0: {color: '#5559D9'},
    1: {color: '#cbc9cc'}
  },
  chatArea:{left:0,top:0,width:'100%',height:'100%'}
};
width = 100;
height = 100;

}
