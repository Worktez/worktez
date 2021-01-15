import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  @Input('error') error: string;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  closeError() {
    this.router.navigate(['/']);
  }

}
