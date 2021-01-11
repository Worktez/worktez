import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input("navbarComponent") navbarComponent: string;
  @Input("navbarTask") navbarTask: string;
  @Input("navbarLog") navbarLog: string;

  constructor() { }

  ngOnInit(): void {
  }
}