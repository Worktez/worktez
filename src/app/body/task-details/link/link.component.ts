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
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { NgForm } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @Input('taskId') taskId: string;
  @Input('orgDomain') orgDomain: string;
  @Output() addedLink = new EventEmitter<{ completed: boolean }>();
  componentName:string = "LINK"
  linkURL: string;
  linkType: string;
  enableLoader: boolean = false;
  showClose: boolean = false;

  constructor(private functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
  }

  async submit() {
    this.enableLoader = true;
    const callable = this.functions.httpsCallable('linker/setLink');
    await callable({OrgDomain: this.orgDomain, TaskID: this.taskId, LinkType: this.linkType, LinkURL: this.linkURL}).subscribe({
      next: (data) => {
        console.log("Successful ");
        this.enableLoader = false;
        this.showClose = true;
        return;
      },
      error: (error) => {
        this.enableLoader = false
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        console.log("Error", error);
        console.error(error);
      },
      complete: () => console.info('Successful ')
  });
  
  }

  close() {
    this.addedLink.emit({ completed: true });
  }

}

