import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Team } from 'src/app/Interface/TeamInterface';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @Input('team') team: Team
  @Output() addedMember = new EventEmitter<{ completed: boolean }>();

  // componentName: string = "ADD-MEMBER";
  memberEmail: string
  enableLoader: boolean = false;
  showClose: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log(this.team);
  }

  submit() {
    // this.enableLoader = true;
    console.log(this.memberEmail);
    // this.enableLoader = false;
    this.showClose = true;
  }

  added() {
    this.addedMember.emit({ completed: true });
  }
}
