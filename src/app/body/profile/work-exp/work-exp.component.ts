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

  dateConverter(date: string){
    const newDate = new Date(date)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[newDate.getMonth()] + " " + newDate.getFullYear()
  }
  editWork(mode: string, workId: number) {
    this.editWorkDetails.emit({ completed: true, mode: mode, workId: workId  });
  }
}
