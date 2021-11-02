import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-icons',
  templateUrl: './status-icons.component.html',
  styleUrls: ['./status-icons.component.css']
})
export class StatusIconsComponent implements OnInit {

  @Input('Status') Status : string
  @Input('Border') Border: boolean
  constructor() { }

  ngOnInit(): void {
  }

}
