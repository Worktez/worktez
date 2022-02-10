/***********************************************************
 * Copyright (C) 2022
 * Worktez
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/
import { Component, Input, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { BackendService } from 'src/app/services/backend/backend.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

@Component({
  selector: 'app-sprint-evaluation-graph',
  templateUrl: './sprint-evaluation-graph.component.html',
  styleUrls: ['./sprint-evaluation-graph.component.css']
})
export class SprintEvaluationGraphComponent implements OnInit {

  constructor(public backendService: BackendService, private functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService) { }

  showLoader: boolean = false;
  @Input("userEmail") userEmail: string;
  @Input("currentSprint") currentSprintNumber: number;
  @Input("teamId") teamId: string;
  @Input("teamMembers") teamMembers: string[];
  data: [];
  componentName:string = "SPRINT-EVALUATION-GRAPH";
  columnNames: string[] = ["Sprints", "Start", "Mid", "End"];
  teamMember: string;
  sprintRange1: number;
  sprintRange2: number;
  title: string = "Sprint Evaluation Graph";

  ngOnInit(): void {
    this.showLoader = true;
    this.sprintRange2 = this.currentSprintNumber;
    this.sprintRange1 = this.currentSprintNumber - 4;
    this.teamMember = 'Team';
    this.getData();
  }

  async getData() {
    let orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable('performanceChart/sprintEvaluationGraph');

      callable({OrganizationDomain: orgDomain,SprintNumberRange: {'SprintRange1': this.sprintRange1, 'SprintRange2': this.sprintRange2}, TeamId: this.teamId}).pipe(
        map(actions => {
          if (actions.data != undefined) {
            const data= actions.data.sort() as [];
            return data
          }
        })).subscribe({
          next: (data) => {
            this.data=data;
            this.showLoader = false;
          },
          error: (error) => {
            this.errorHandlerService.showError = true;
            this.showLoader = false;
            this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
            console.error(error);
          },
          complete: () => console.info('Getting Sprint Evaluation data successful')
        });
  }
  onGetRange(range) {
    this.showLoader = true;
    this.sprintRange1 = range.sprintRange1;
    this.sprintRange2 = range.sprintRange2;
    if (this.sprintRange2 > this.currentSprintNumber) {
      this.sprintRange2 = this.currentSprintNumber;
    }
    this.getData();
  }
}