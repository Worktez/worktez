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
import { Component, OnInit, Input,Output, EventEmitter,ViewChild } from '@angular/core';
import { Patch } from 'src/app/Interface/PatchInterface';
import { PatchService } from 'src/app/services/patch/patch.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ToolsService } from 'src/app/services/tool/tools.service';
@Component({
  selector: 'app-edit-patch',
  templateUrl: './edit-patch.component.html',
  styleUrls: ['./edit-patch.component.css']
})

export class EditPatchComponent implements OnInit {
  @Input('patch') patch : string  
  @Output() editPatchCompleted = new EventEmitter<{ completed: boolean }>();
  showClose: boolean = false;  
  editPatch : Patch
  enableLoader: boolean = false;
  date:string

  constructor( private toolsService: ToolsService, public db: AngularFirestore,private patchService: PatchService,private functions: AngularFireFunctions) { }

  ngOnInit(): void { 
    this.date = this.toolsService.date(); 
    this.patchService.getPatchData(this.patch).subscribe(data => {          
      this.editPatch = data;
    });    
  }   

  editPatchDone() {    
    this.editPatchCompleted.emit({ completed: true });
  }
  
  async submit(){
    const callable = this.functions.httpsCallable('patch/editPatch');
    this.enableLoader = true;
    try{
      const result = await callable({Id: this.patch,Name:this.editPatch.Name, Description:this.editPatch.Description, UpdatedOn:this.date}).toPromise();

      this.enableLoader = false;
      this.showClose = true;
    }
    catch(error){
      console.log("Error: "+error);
    }
  }
}
