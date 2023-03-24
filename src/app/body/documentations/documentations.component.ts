import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documentations',
  templateUrl: './documentations.component.html',
  styleUrls: ['./documentations.component.css']
})
export class DocumentationsComponent implements OnInit {

  constructor(private titleService: Title, public router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle("Docs");
  }

  getStarted() {
    this.router.navigate(['/GettingStarted']);
  }
  features() {
    this.router.navigate(['/Features', 'boards']);
  }
  blogs(){
    this.router.navigate(['/blogs']);
  }
}
