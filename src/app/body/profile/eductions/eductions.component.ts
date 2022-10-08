import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MyEducationData } from 'src/app/Interface/UserInterface';

@Component({
  selector: 'app-eductions',
  templateUrl: './eductions.component.html',
  styleUrls: ['./eductions.component.css']
})
export class EductionsComponent implements OnInit {

  @Output() editEducationDetails = new EventEmitter<{ completed: boolean, mode: string, educationId: number }>();
  @Input('educations') educations: MyEducationData[];
  @Input('sameUser') sameUser: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  editEducation(mode: string, educationId: number) {
    this.editEducationDetails.emit({ completed: true, mode: mode, educationId: educationId  });
  }

}
