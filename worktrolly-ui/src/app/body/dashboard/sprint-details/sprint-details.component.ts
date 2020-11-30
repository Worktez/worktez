import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sprint-details',
  templateUrl: './sprint-details.component.html',
  styleUrls: ['./sprint-details.component.css']
})
export class SprintDetailsComponent implements OnInit {

  @Input('currentSprintName') currentSprintName: string;
  @Input('StartDate') StartDate: string;
  @Input('EndDate') EndDate: string;
  @Input('Status') Status: string;

  @Output() changeSprint = new EventEmitter<{newSprintNumber: number}>();

  filterSprintNumber: number;

  constructor() { }

  ngOnInit(): void {
  }

  changeSprintNumber() {
    this.changeSprint.emit({newSprintNumber: this.filterSprintNumber});
  }
}
