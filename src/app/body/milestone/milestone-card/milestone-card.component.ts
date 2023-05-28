/***********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Sanjay Krishna <sanjaykrishna1203@gmail.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/
import { Component, Input, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ActivatedRoute, Router } from '@angular/router';
import { Milestones } from 'src/app/Interface/MilestoneInterface';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

@Component({
  selector: 'app-milestone-card',
  templateUrl: './milestone-card.component.html',
  styleUrls: ['./milestone-card.component.css']
})
export class MilestoneCardComponent implements OnInit {

  @Input("milestone") milestone:Milestones
  constructor( private router: Router, private backendService: BackendService,  private functions: AngularFireFunctions,  public errorHandlerService: ErrorHandlerService) { }
  color: string;
  ngOnInit(): void {     
    this.color="#"+this.milestone.ColorCode;
    if(this.milestone.ColorCode==null || this.milestone.ColorCode==""){
      this.color="#ffffff"
    }
  }

  getMilestoneDetails(milestoneId: any) {
    this.router.navigate(['MilestoneDetails/', milestoneId]);
  }

  deleteMilestone(milestoneId: string) {
    const mId = milestoneId;
    const orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable('milestone/deleteMilestone');
    
    callable({OrganizationDomain: orgDomain, MilestoneId: mId}).subscribe({
      next: (data) => {
        this.milestone.Deleted = true;
      },
      error: (error) => {
        console.error("Error", error);
        this.errorHandlerService.showError = true;
      },
      complete: () => console.info('Successful ')
    });
  }
}
