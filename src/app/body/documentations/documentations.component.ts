import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';

@Component({
  selector: 'app-documentations',
  templateUrl: './documentations.component.html',
  styleUrls: ['./documentations.component.css']
})
export class DocumentationsComponent implements OnInit {

  constructor(private titleService: Title, public router: Router, public navbarHandler: NavbarHandlerService) { }

  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
    this.titleService.setTitle("Worktez: Docs");
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
