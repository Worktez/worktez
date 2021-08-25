import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.css']
})
export class SelectDropdownComponent implements OnInit {

  constructor() { }
  @Input('teamMembers') teamMembers: string[];
  @Output() setteamMember = new EventEmitter<{ teamMember: string }>();
  selectedOption: string = "Team";

  ngOnInit(): void {
  }

  setSelectedOption() {
    this.setteamMember.emit({ teamMember: this.selectedOption });
  }

}
