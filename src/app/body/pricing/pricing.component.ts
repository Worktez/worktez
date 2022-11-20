import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  constructor(private metaTagService: Meta, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Pricing");
    this.metaTagService.addTags([
      {
        name: 'description',
        content: 'Basic free plan for community, Start with no cost and then pay as you go.',
      },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Vivek Kumar' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2022-11-07', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' },
    ]);
  }

}
