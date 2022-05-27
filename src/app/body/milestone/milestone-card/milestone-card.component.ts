import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Milestones } from 'src/app/Interface/MilestoneInterface';

@Component({
  selector: 'app-milestone-card',
  templateUrl: './milestone-card.component.html',
  styleUrls: ['./milestone-card.component.css']
})
export class MilestoneCardComponent implements OnInit {

  @Input("milestone") milestone:Milestones
  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  getMilestoneDetails(milestoneId: any) {
    this.router.navigate(['MilestoneDetails/', milestoneId]);
  }

}
