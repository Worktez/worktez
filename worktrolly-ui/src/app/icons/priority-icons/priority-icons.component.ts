import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-priority-icons',
  templateUrl: './priority-icons.component.html',
  styleUrls: ['./priority-icons.component.css']
})
export class PriorityIconsComponent implements OnInit {

  @Input('Priority') Priority : string
  constructor() { }

  ngOnInit(): void {
  }

}
