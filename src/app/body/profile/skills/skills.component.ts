import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  @Output() skillsDetails = new EventEmitter<{ completed: boolean }>();
  @Input('skills') skills: string[];
  @Input('sameUser') sameUser: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  editSkills() {
    this.skillsDetails.emit({ completed:true });
  }

}
