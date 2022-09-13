import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MyExperienceData } from 'src/app/Interface/UserInterface';

@Component({
  selector: 'app-work-exp',
  templateUrl: './work-exp.component.html',
  styleUrls: ['./work-exp.component.css']
})
export class WorkEXPComponent implements OnInit {

  @Output() editWorkDetails = new EventEmitter<{ completed: boolean, mode: string, workId: number }>();
  @Input('experiences') experiences: MyExperienceData[];
  @Input('sameUser') sameUser: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  editWork(mode: string, workId: number) {
    this.editWorkDetails.emit({ completed: true, mode: mode, workId: workId  });
  }
}
