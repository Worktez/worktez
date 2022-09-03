import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-members-access',
  templateUrl: './members-access.component.html',
  styleUrls: ['./members-access.component.css']
})
export class MembersAccessComponent implements OnInit {
  @Input('member') member 

  constructor() { }

  ngOnInit(): void {
  }
  
}
