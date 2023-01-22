import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-documentations',
  templateUrl: './documentations.component.html',
  styleUrls: ['./documentations.component.css']
})
export class DocumentationsComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Docs");
  }

}
