import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Tasks, TasksId } from 'src/app/Interface/TasksInterface';

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

  tasksCollection: AngularFirestoreCollectionGroup<Tasks>
  tasksData: Observable<TasksId[]>;

  constructor(private location: Location, public db: AngularFirestore) { }

  ngOnInit(): void {}

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

}
