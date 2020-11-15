import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-new-sprint',
  templateUrl: './create-new-sprint.component.html',
  styleUrls: ['./create-new-sprint.component.css']
})
export class CreateNewSprintComponent implements OnInit {

  @ViewChild('form') form: NgForm;

  startDate:string
  endDate:string
  status:string
  totalDevelopment:string
  totalBusiness:string
  totalMarketing:string

  constructor() { }

  ngOnInit(): void {
  }

  async createNewSprint(){
    console.log(this.startDate);
    console.log(this.endDate);
    console.log(this.status);
    console.log(this.totalDevelopment);
    console.log(this.totalBusiness);
    console.log(this.totalMarketing);
  }

}
