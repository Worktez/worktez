/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* Author : Abhishek Mishra <am1426620@gmail.com>
* 
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-features-page',
  templateUrl: './features-page.component.html',
  styleUrls: ['./features-page.component.css']
})
export class FeaturesPageComponent implements OnInit {

  currentSection: string;
  arrowDirection: string = "expand_less";
  featuresExpanded: boolean = true;

  constructor(public router: Router, private titleService: Title, private metaTagService: Meta, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Worktez: Features");
    this.metaTagService.updateTag(
      {
        name: 'description',
        content: 'Explore the multiple features of worktez, Learn more about the product and get more familiar with the tool',
      });
      this.metaTagService.updateTag({ name: 'author', content: 'Abhishek Mishra' });
      this.metaTagService.updateTag({ name: 'date', content: '2023-01-28', scheme: 'YYYY-MM-DD' },)

    this.currentSection = this.route.snapshot.params[ 'currentSection' ]
  }
  gettingStarted(){
    this.router.navigate(['/GettingStarted']);
  }
  changeSection(section: string){
    this.currentSection = section;
    this.router.navigate(['/Features', section]);
  }
  changeArrowDirection(){
    if(this.featuresExpanded){
      this.featuresExpanded = false;
      this.arrowDirection="expand_more"
    }
    else{
      this.featuresExpanded = true;
      this.arrowDirection = "expand_less"
    }
  }
}
