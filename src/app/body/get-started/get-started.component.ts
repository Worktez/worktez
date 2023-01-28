import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent implements OnInit {
  
  currentSection: string = "boards";
  arrowDirection: string = "expand_more";
  featuresExpanded: boolean = false;

  constructor(public router: Router, private titleService: Title, private metaTagService: Meta ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Worktez: Getting Started");
    this.metaTagService.addTags([
      {
        name: 'description',
        content: 'Track it, from everywhere. One step to hybrid work environment. Without worrying about time, and location. Enable your team to work more on ideas, and automate the process.',
      },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Vivek Kumar' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: '2022-11-07', scheme: 'YYYY-MM-DD' },
      { charset: 'UTF-8' },
    ]);
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
  changeSection(section: string){
    this.router.navigate(['/Features', section]);
  }
}
