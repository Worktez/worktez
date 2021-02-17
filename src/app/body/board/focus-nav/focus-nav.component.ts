import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-focus-nav',
  templateUrl: './focus-nav.component.html',
  styleUrls: ['./focus-nav.component.css']
})
export class FocusNavComponent implements OnInit {

  @Input('currentSprintNumber') currentSprintNumber:number;

  @Output() currentSprint = new EventEmitter<number>();

  currentSprintName: string;
  
  constructor() { }

  ngOnInit(): void {  }

  ActiveSprint(){
    this.currentSprintNumber = 0;
    this.currentSprint.emit(this.currentSprintNumber);
  }

  showBacklog(){
    this.currentSprintNumber = -1;
    this.currentSprint.emit(this.currentSprintNumber);
  }
}
