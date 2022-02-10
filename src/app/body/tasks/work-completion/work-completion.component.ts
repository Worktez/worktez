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
import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-work-completion',
  templateUrl: './work-completion.component.html',
  styleUrls: ['./work-completion.component.css']
})
export class WorkCompletionComponent implements OnInit {
  @Input('workDone') workDone:number
  data=[]
  constructor() { }

  ngOnInit(): void {
   this.createPieChartData()
   
  }
  createPieChartData(){
    this.data=[
      ["Completed",this.workDone],
      ["In Progress",100-this.workDone]
    ]
  }

}
