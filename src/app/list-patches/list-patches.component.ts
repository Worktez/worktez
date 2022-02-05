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
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-patches',
  templateUrl: './list-patches.component.html',
  styleUrls: ['./list-patches.component.css']
})
export class ListPatchesComponent implements OnInit {
  addPatches : boolean
  items: Observable<any[]>;
  constructor(db: AngularFirestore) { 
    this.items = db.collection('Patches').valueChanges();
  }

  ngOnInit(): void {
  }
  addPatch(){
    this.addPatches = true;
  }
}
