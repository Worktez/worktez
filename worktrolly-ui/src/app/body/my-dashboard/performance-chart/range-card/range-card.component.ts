import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-range-card',
  templateUrl: './range-card.component.html',
  styleUrls: ['./range-card.component.css']
})
export class RangeCardComponent implements OnInit {

  @Output() setRange = new EventEmitter<{ sprintRange1: number, sprintRange2: number }>();
  sprintRange1: number
  sprintRange2: number


  constructor() { }

  ngOnInit(): void {
  }
  onSetRange() {
    if (this.sprintRange1 > this.sprintRange2) {
      let temp = this.sprintRange2
      this.sprintRange2 = this.sprintRange1
      this.sprintRange1 = temp
    }
    if (this.sprintRange1 <= 0) {
      this.sprintRange1 = 1
    }
    if (this.sprintRange2 <= 1) {
      this.sprintRange2 = 2
    }
    this.setRange.emit({ sprintRange1: this.sprintRange1, sprintRange2: this.sprintRange2 });
    this.sprintRange1 = 0
    this.sprintRange2 = 0
  }
}
