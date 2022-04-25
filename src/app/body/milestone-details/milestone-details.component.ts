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

import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Milestones } from 'src/app/Interface/MilestoneInterface';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { BackendService } from 'src/app/services/backend/backend.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';

@Component({
  selector: 'app-milestone-details',
  templateUrl: './milestone-details.component.html',
  styleUrls: ['./milestone-details.component.css']
})
export class MilestoneDetailsComponent implements OnInit {

  milestoneId: string = "";
  orgDomain: string = "";
  teamIds: string[] = [];
  taskData: Tasks[] = [];
  milestoneData:Milestones
  taskDataReady:boolean;
  milestoneDataReady:boolean;
  showLoader:boolean;
  totalTasks:number = 0;
  totalCompletedTasks:number =0;

  public tasksObservable: Observable<Tasks[]>;
  public milestoneObservable: Observable<Milestones[]>
  constructor(private route: ActivatedRoute,private router: Router, private functions: AngularFireFunctions, public backendService: BackendService, public navbarHandler: NavbarHandlerService) { }

  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
    this.navbarHandler.addToNavbar(this.milestoneId);
    this.milestoneId = this.route.snapshot.params['MilestoneId'];
    this.orgDomain = this.backendService.getOrganizationDomain();
    this.showLoader = true;
    this.taskDataReady = false;
    this.milestoneDataReady = false;
    this.getMilestoneDetails();
    this.getTasks();
  }

  getTasks() {
    this.showLoader = true;
    const callable = this.functions.httpsCallable("tasks/getAllTasks");

    callable({ OrgDomain: this.orgDomain, MilestoneId: this.milestoneId }).pipe(
      map(actions => {
        return actions.data as Tasks[];
      })).subscribe({
        next: (data) => {
          this.taskData = data;
          console.log(this.taskData);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.info("Fetched Tasks Successfully");
          this.taskDataReady = true;
          this.showLoader = false;
          this.getNumberData();
        }
      });
  }

  getMilestoneDetails() {
    this.showLoader = true;
    const callable = this.functions.httpsCallable('milestone/getMilestone')

    callable({ OrgDomain: this.orgDomain, MilestoneId: this.milestoneId }).pipe(
      map(actions => {
        return actions.data as Milestones;
      })).subscribe({
        next:(data)=>{
          this.milestoneData = data;
          console.log(this.milestoneData);
        },
        error:(error)=>{
          console.log(error);
        },
        complete:()=>{
          console.info("Fetched MilestoneDetails Successfully");
          this.milestoneDataReady = true;
          this.showLoader = false;
        },
      });
  }


  openTaskDetails(taskId){
    this.router.navigate(['/TaskDetails', taskId]);
  }

  getNumberData(){
    this.totalTasks= this.taskData.length;
    this.taskData.forEach(element => {
      if(element.Status == "Completed"){
        console.log(this.totalCompletedTasks);
            this.totalCompletedTasks = this.totalCompletedTasks+ 1;
      }
      console.log("comp", this.totalCompletedTasks);
    });
  }


}
