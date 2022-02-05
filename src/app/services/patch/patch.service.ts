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
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Patch } from 'src/app/Interface/PatchInterface';

@Injectable({
  providedIn: 'root'
})
export class PatchService {

  constructor(private db: AngularFirestore) { }
  public patchDocument: AngularFirestoreDocument<Patch>
  public patchObservable: Observable<Patch>

  getPatchData(documentName: string) {
    const path = "Patches/" + documentName;
    this.patchDocument = this.db.doc<Patch>(path);
    this.patchObservable = this.patchDocument.snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data() as Patch;
        return { ...data };
      })
    )
    return this.patchObservable;
  }
}
