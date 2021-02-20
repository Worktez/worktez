import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-focus-nav',
  templateUrl: './focus-nav.component.html',
  styleUrls: ['./focus-nav.component.css']
})
export class FocusNavComponent implements OnInit {

  @Input('currentSprintNumber') currentSprintNumber:number;

  @Output() currentSprint = new EventEmitter<number>();

  currentSprintName: string;
  
  constructor(public backendService: BackendService) { }

  ngOnInit(): void {  }

  ActiveSprint(){
    this.currentSprint.emit(0);
  }

  showBacklog(){
    // this.backendService.currentSprintNumber = -1;
    this.currentSprint.emit(-1);
  }
}
