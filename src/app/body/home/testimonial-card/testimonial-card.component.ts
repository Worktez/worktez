import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonial-card',
  templateUrl: './testimonial-card.component.html',
  styleUrls: ['./testimonial-card.component.css']
})
export class TestimonialCardComponent implements OnInit {
  @Input("image") image: string;
  @Input("name") name: string;
  @Input("content") content: string;

  constructor() { }

  ngOnInit(): void {
  }

}
