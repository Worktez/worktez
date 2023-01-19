import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CreateReleaseData} from 'src/app/Interface/ReleaseInterface';

@Component({
  selector: 'app-release-card',
  templateUrl: './release-card.component.html',
  styleUrls: ['./release-card.component.css']
})
export class ReleaseCardComponent implements OnInit {
  @Input("release") release: CreateReleaseData

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  getReleaseDetails(releaseId: any){
    this.router.navigate(['ReleaseDetails/', releaseId]);
  }

}
