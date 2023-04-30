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
    this.metaTagService.updateTag(
      {
        name: 'description',
        content: 'Get yourself familiar with worktez and see how it would help to boost your team\'s performance',
      });
      this.metaTagService.updateTag({ name: 'date', content: '2023-01-23', scheme: 'YYYY-MM-DD' })
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
  features(section: string){
    this.router.navigate(['/Features', section]);
  }
  blogs(){
    this.router.navigate(['/blogs']);
  }
}
