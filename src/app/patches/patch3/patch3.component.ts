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
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollectionGroup } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Tasks, TasksId } from 'src/app/Interface/TasksInterface';
import { AuthService } from 'src/app/services/auth.service';
import { PatchService } from 'src/app/services/patch/patch.service';
import { Patch } from 'src/app/Interface/PatchInterface';

@Component({
  selector: 'app-patch3',
  templateUrl: './patch3.component.html',
  styleUrls: ['./patch3.component.css']
})
export class Patch3Component implements OnInit {

  fieldName: string = "";
  fieldValue: string = "";
  PatchshowLoader: boolean = false;
  updateEnabled: boolean = false;
  FieldEntered: boolean = false;
  uid: string;
  patch: Patch;
  showLoader: boolean = false;

  tasksCollection: AngularFirestoreCollectionGroup<Tasks>
  tasksData: Observable<TasksId[]>;

  constructor(private location: Location, public db: AngularFirestore, public authService: AuthService,  public patchService: PatchService) { }

  ngOnInit(): void {
    this.PatchshowLoader = true;
    this.authService.afauth.user.subscribe(data => {
      this.authService.userAppSettingObservable.subscribe(data => {
        if (data.SelectedOrgAppKey) {
          this.uid = this.authService.userAppSetting.uid;
          this.getPatchData();
          this.PatchshowLoader = false;
        }
      });
    });
    console.log("patch running");
  }

  patch3() {
    if(this.fieldName.length===0 ||this.fieldValue.length===0){
      alert("Error:Please Enter The Values Correctly");
      this.PatchshowLoader=false;
      this.FieldEntered = true;
    }else{
      this.PatchshowLoader = true;
      this.FieldEntered = false;
    this.tasksCollection = this.db.collectionGroup<Tasks>("Tasks", ref => {
      let queryRef = ref;
      queryRef = queryRef.where(this.fieldName, '==', this.fieldValue);
      return queryRef;
    });
    this.tasksData = this.tasksCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Tasks;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    this.PatchshowLoader=false;
    }
  }
  
  UpdatePage(){
    this.updateEnabled=true;
  }
  updateFieldCompleted(data: { completed: boolean }){
    this.updateEnabled=false;
  }

  backToDashboard() {
    this.location.back()
  }

  getPatchData() {
    this.patchService.getPatchData("Patch3").subscribe(data => {
      this.patch = data;
    });
  }

}
