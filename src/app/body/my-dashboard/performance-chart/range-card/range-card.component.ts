import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-range-card',
  templateUrl: './range-card.component.html',
  styleUrls: ['./range-card.component.css']
})
export class RangeCardComponent implements OnInit {

  @Output() setRange = new EventEmitter<{ sprintRange1: number, sprintRange2: number }>();
  sprintRange1: number
  sprintRange2: number

  constructor(public validationService: ValidationService) { }

  ngOnInit(): void {
  }
  async validateRange() {
    let data = [
      { label: "sprintRange1", value: this.sprintRange1 },
      { label: "sprintRange2", value: this.sprintRange2 }
    ]
    var condition = await (this.validationService.checkSprintRange(this.sprintRange1, this.sprintRange2)).then(res => {
      return res;
    });
    if (condition) {
      console.log("Inputs are valid");
      this.onSetRange();
    }
    else
      console.log("Validation error");
  }
  onSetRange() {
    this.setRange.emit({ sprintRange1: this.sprintRange1, sprintRange2: this.sprintRange2 });
    this.sprintRange1 = 0
    this.sprintRange2 = 0
  }
}
