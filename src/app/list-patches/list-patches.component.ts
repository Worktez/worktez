
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
